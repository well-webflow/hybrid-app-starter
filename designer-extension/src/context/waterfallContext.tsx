import React, { createContext, useContext, useEffect, useState } from "react";
import { defaultWaterfallSettings } from "../lib/waterfallSettings.tsx";
import { throwErrorIfWaterfallNotSelected } from "../lib/notices";
import { getBaseAttr, getBreakpointAttr } from "../lib/attributes";
import { WaterfallCategory, WaterfallSetting } from "../types/waterfall-types";

type LoadedWaterfall = {
  name: string | null;
  el: AnyElement | null;
};

// Define the shape of the context state
interface AppState {
  waterfalls: string[];
  waterfallSettings: WaterfallCategory[] | null;
  setWaterfallSettings: (value: WaterfallCategory[]) => void;
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
  createWaterfall: () => void;
  loadWaterfall: () => void;
  loadedWaterfall: LoadedWaterfall | null;
  unloadWaterfall: () => void;
  updateWaterfall: (propAttrName: string, newValue: string, breakpoint?: string) => void;
  saveWaterfall: () => void;
  elementSelected: AnyElement | null;
  waterfallSelected: string | null;
}

// Create the context with an initial value of undefined
const WaterfallContext = createContext<AppState | undefined>(undefined);

interface WaterfallProviderProps {
  children: React.ReactNode;
}
// Create the context provider
export const WaterfallProvider = ({ children }: WaterfallProviderProps) => {
  const [waterfalls, setWaterfalls] = useState<string[]>([]);
  const [waterfallSettings, setWaterfallSettings] = useState<WaterfallCategory[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [elementSelected, setElementSelected] = useState<AnyElement | null>(null);
  const [waterfallSelected, setWaterfallSelected] = useState<string | null>(null);
  const [loadedWaterfall, setLoadedWaterfall] = useState<LoadedWaterfall | null>(null);

  // Called to check if an element has been selected
  const selectedElementCallback = async (element: AnyElement | null) => {
    setElementSelected(element);

    if (!element?.customAttributes) return;

    const waterfallName = await element.getCustomAttribute("waterfall");
    if (waterfallName) {
      if (!waterfallSelected) {
        console.log("Waterfall Selected. Loading.");
        setWaterfallSelected(waterfallName);
      }
    } else {
      setWaterfallSelected(null);
    }
  };

  useEffect(() => {
    // Subscribe to the selected element event
    const unsubscribeSelectedElement = webflow.subscribe("selectedelement", selectedElementCallback);

    return () => unsubscribeSelectedElement();
  });

  async function getWaterfalls() {
    const els = await webflow.getAllElements();
    const waterfalls: string[] = [""];
    await Promise.all(
      els.map(async (el) => {
        if (!el.customAttributes) return;
        const wtf = await el.getCustomAttribute("waterfall");
        if (wtf) waterfalls.push(wtf);
      })
    );
    setWaterfalls(waterfalls);
    console.log(waterfalls);
  }

  //--- CREATE WATERFALL ---
  // Create a new waterfall object with all of the default props
  async function createWaterfall() {
    const el = await webflow.getSelectedElement();
    if (el?.children) {
      const waterfallDiv = await el?.prepend(webflow.elementPresets.DivBlock);
      // Set all of the props from the default
      defaultWaterfallSettings.forEach((group) => {
        group.items?.forEach((prop) => {
          waterfallDiv.setCustomAttribute(prop.attr, prop.value?.toString());
        });
        group.groups?.forEach((group) => {
          group.items?.forEach((prop) => {
            waterfallDiv.setCustomAttribute(prop.attr, prop.value?.toString());
          });
        });
      });
      webflow.setSelectedElement(waterfallDiv);
      loadWaterfall();
    }
    await getWaterfalls();
  }

  //--- LOAD WATERFALL ---
  async function loadWaterfall() {
    const el = await webflow.getSelectedElement();
    if (el?.customAttributes) {
      await throwErrorIfWaterfallNotSelected(el);

      const waterfallName = await el.getCustomAttribute("waterfall");

      setLoadedWaterfall({ name: waterfallName, el });
      // Get the custom attributes from the current waterfall element
      const customAttributes = await el.getAllCustomAttributes();
      // Create a deep copy of the default waterfall props to update
      const updatedProps: WaterfallCategory[] = JSON.parse(JSON.stringify(defaultWaterfallSettings));

      // Iterate through all custom attributes and map them to updatedProps
      customAttributes?.forEach((attr) => {
        updatedProps.forEach((category) => {
          // Takes an attribute and breaks apart the breakpoint from the baseAttr
          const { baseAttr, breakpoint } = getBaseAttr(attr.name);
          // Searches for a WaterfallSetting with attribute matching baseAttr
          let item = findWaterfallSetting(category, baseAttr);

          if (item) {
            if (breakpoint) {
              // ✅ Directly assign value in the breakpoints object
              if (item.breakpoints && breakpoint in item.breakpoints) {
                item.breakpoints[breakpoint as keyof typeof item.breakpoints] = attr.value;
              }
            } else {
              // ✅ Update base value if no breakpoint prefix
              item.value = attr.value;
            }
          }
        });
      });

      setWaterfallSettings(updatedProps); // Update state with transformed data
    }
    await getWaterfalls();
  }

  function findWaterfallSetting(category: WaterfallCategory, baseAttr: string): WaterfallSetting | undefined {
    // Search in top-level items if they exist
    if (category.items) {
      const foundInItems = category.items.find((item) => item.attr === baseAttr);
      if (foundInItems) return foundInItems;
    }

    // Search in groups if they exist
    if (category.groups) {
      for (const group of category.groups) {
        const foundInGroup = group.items.find((item) => item.attr === baseAttr);
        if (foundInGroup) return foundInGroup;
      }
    }

    // Return undefined if no match is found
    return undefined;
  }

  async function unloadWaterfall() {
    setWaterfallSelected(null);
    setWaterfallSettings(null);
    setSelectedCategory(null);
    setLoadedWaterfall(null);
  }

  /**
   * Update the Waterfall Settings
   * @param waterfallSettings The settings to update from
   * @param propAttrName The attribute to update
   * @param newValue The new attribute value
   * @param breakpoint Which breakpoint to apply this to, if applicable
   * @returns null
   */
  function updateWaterfall(propAttrName: string, newValue: string, breakpoint?: string) {
    if (!waterfallSettings) return;

    console.log("updating ", propAttrName, "to ", newValue);

    const updatedData: WaterfallCategory[] = waterfallSettings.map((category) => {
      return {
        ...category,
        items: category.items?.map((item) => {
          if (item.attr === propAttrName) {
            if (breakpoint && item.breakpoints) {
              return {
                ...item,
                breakpoints: {
                  ...item.breakpoints,
                  [breakpoint]: newValue,
                },
              };
            }
            return { ...item, value: newValue };
          }
          return item;
        }),
        groups: category.groups?.map((group) => {
          return {
            ...group,
            items: group.items.map((item) => {
              if (item.attr === propAttrName) {
                if (breakpoint && item.breakpoints) {
                  return {
                    ...item,
                    breakpoints: {
                      ...item.breakpoints,
                      [breakpoint]: newValue,
                    },
                  };
                }
                return { ...item, value: newValue };
              }
              return item;
            }),
          };
        }),
      };
    });

    setWaterfallSettings(updatedData);
    return updatedData;
  }

  /**
   * Save the Waterfall's Settings into the Element's Attributes
   * @returns null
   */
  async function saveWaterfall() {
    // Get the selected Waterfall's attributes and name
    const el = loadedWaterfall?.el || null;
    await throwErrorIfWaterfallNotSelected(el);
    if (!el?.customAttributes) return;
    const name = await el.getCustomAttribute("waterfall");

    // Update name if it changed
    setLoadedWaterfall({ name, el });

    // Look through all items and items inside of groups
    await Promise.all(
      (waterfallSettings ?? []).flatMap((category) =>
        [...(category.items ?? []), ...(category.groups?.flatMap((group) => group.items) ?? [])].map(async (setting) => {
          // If the setting has no value or if it is equal to the default in SwiperJS, remove it
          if (!setting.value || setting.value === setting.swiperDefault) {
            await el.removeCustomAttribute(setting.attr);
          }
          // Otherwise, add an attribute with the value
          else {
            await el.setCustomAttribute(setting.attr, setting.value?.toString());
          }
          // Check if breakpoints exist for the item
          if (setting.breakpoints) {
            await Promise.all(
              Object.entries(setting.breakpoints).map(async ([breakpoint, value]) => {
                const attr = getBreakpointAttr(setting.attr, breakpoint);
                if (!value) {
                  await el.removeCustomAttribute(attr);
                } else {
                  await el.setCustomAttribute(attr, value.toString());
                }
              })
            );
          }
        })
      )
    );

    webflow.notify({
      type: "Success",
      message: `Updated Waterfall '${name}' Successfully!`,
    });

    await getWaterfalls();
  }

  return (
    <WaterfallContext.Provider
      value={{
        waterfalls,
        waterfallSettings,
        setWaterfallSettings,
        selectedCategory,
        setSelectedCategory,
        elementSelected,
        waterfallSelected,
        loadedWaterfall,
        createWaterfall,
        loadWaterfall,
        unloadWaterfall,
        updateWaterfall,
        saveWaterfall,
      }}
    >
      {children}
    </WaterfallContext.Provider>
  );
};

export const useWaterfallContext = (): AppState => {
  const context = useContext(WaterfallContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
