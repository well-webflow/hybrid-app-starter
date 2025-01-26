import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import { useElementMapper } from "../../hooks/useElementMapper";
import { ElementMapping } from "../../types/element-mapping";
import { ElementTreeViewer } from "./ElementTreeViewer";
import { ElementTreeToolbar } from "./ElementTreeToolbar";

export function ElementsDashboard() {
  const [elementTree, setElementTree] = useState<ElementMapping | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mapElement } = useElementMapper();
  const currentElementId = useRef<string | null>(null);
  const isMappingInProgress = useRef(false);

  const handleElementMapping = useCallback(
    async (element: AnyElement | null) => {
      if (!element) {
        return null;
      }
      return mapElement(element);
    },
    [mapElement]
  );

  const updateElementTree = useCallback(
    async (element: AnyElement | null) => {
      if (
        isMappingInProgress.current ||
        element?.id === currentElementId.current
      ) {
        return;
      }

      try {
        isMappingInProgress.current = true;
        setIsLoading(true);

        if (!element) {
          currentElementId.current = null;
          setElementTree(null);
          return;
        }

        currentElementId.current = element.id;
        const mappedTree = await handleElementMapping(element);
        setElementTree(mappedTree);
      } finally {
        isMappingInProgress.current = false;
        setIsLoading(false);
      }
    },
    [handleElementMapping]
  );

  useEffect(() => {
    webflow.getSelectedElement().then(updateElementTree);
    return webflow.subscribe("selectedelement", updateElementTree);
  }, []);

  const recreateElement = useCallback(
    async (structure: ElementMapping, parentElement?: AnyElement) => {
      try {
        let elementPreset: ElementPreset<AnyElement>;

        // Get the correct element preset
        switch (structure.type) {
          case "Block":
            elementPreset = webflow.elementPresets.DOM;
            break;
          case "HtmlEmbed":
            elementPreset = webflow.elementPresets.HtmlEmbed;
            break;
          case "Image":
            elementPreset = webflow.elementPresets.Image;
            break;
          case "Link":
            elementPreset = webflow.elementPresets.LinkBlock;
            break;
          case "String":
            elementPreset = webflow.elementPresets.TextBlock;
            break;
          default:
            elementPreset = webflow.elementPresets.DOM;
        }

        // Create the element by appending the preset
        let newElement: AnyElement;
        if (parentElement?.children) {
          newElement = await parentElement.append(elementPreset);
        } else {
          newElement = await webflow.addToCanvas(elementPreset);
        }

        // Set specific tag for DOM elements
        if (structure.type === "Block" && "setTag" in newElement) {
          await newElement.setTag("div");
        }

        // Apply styles if they exist
        if (structure.styles?.length && "styles" in newElement) {
          const stylePromises = structure.styles.map(async (styleName) => {
            return (
              webflow.getStyleByName(styleName) ||
              webflow.createStyle(styleName)
            );
          });
          const styles = await Promise.all(stylePromises);
          await newElement.setStyles(styles);
        }

        // Set custom attributes if supported
        if (structure.attributes && "customAttributes" in newElement) {
          for (const [name, value] of Object.entries(structure.attributes)) {
            await newElement.setCustomAttribute(name, value.toString());
          }
        }

        // Recursively create children if supported
        if (structure.children?.length && "children" in newElement) {
          for (const child of structure.children) {
            await recreateElement(child, newElement);
          }
        }

        return newElement;
      } catch (error) {
        console.error("Error recreating element:", error);
        throw error;
      }
    },
    []
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Elements & Styles Dashboard
      </Typography>

      <ElementTreeToolbar
        onSave={() => {
          const json = JSON.stringify(elementTree, null, 2);
        }}
        onCopy={() => {
          const json = JSON.stringify(elementTree, null, 2);
          navigator.clipboard.writeText(json);
        }}
      />

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : elementTree ? (
        <ElementTreeViewer tree={elementTree} />
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="text.secondary">
            Select an element to view its details
          </Typography>
        </Box>
      )}
    </Box>
  );
}
