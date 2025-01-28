import { useEffect, useState, useRef, useCallback } from "react";
import { Box, Tab, Tabs, Paper } from "@mui/material";
import {
  useScriptRegistration,
  useScriptSelection,
  useApplicationStatus,
} from "../../hooks/useCustomCode";
import { ScriptRegistration, ScriptsList, SiteTab, PagesTab } from "./";
import { useAuth } from "../../hooks/useAuth";
import { CustomCode } from "../../types/types";

/**
 * Props interface for the TabPanel component
 * @property {React.ReactNode} children - Content to be displayed in the tab panel
 * @property {number} index - Index of the tab panel
 * @property {number} value - Currently selected tab value
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * TabPanel component for managing content visibility based on selected tab
 * @param props - TabPanel properties
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

/**
 * CustomCodeDashboard is the main component for managing custom code scripts in a Webflow site.
 * It provides functionality to:
 * - Register new scripts (hosted or inline)
 * - View and select from existing scripts
 * - Apply scripts to either the entire site or specific pages
 * - Manage script locations (header/footer)
 *
 * The dashboard is organized into two main sections:
 * 1. Register Script: For adding new custom code
 * 2. Manage Scripts: For applying and managing existing scripts
 *
 * @example
 * ```tsx
 * // Basic usage in a React application
 * function App() {
 *   return (
 *     <CustomCodeDashboard />
 *   );
 * }
 * ```
 */
export function CustomCodeDashboard() {
  const { sessionToken } = useAuth();
  const hasInitialized = useRef(false);
  // Track current site information
  const [currentSite, setCurrentSite] = useState<{
    id: string;
    name: string;
  } | null>(null);
  // Navigation state
  const [mainTab, setMainTab] = useState<"register" | "manage">("register");
  const [applicationTab, setApplicationTab] = useState(0);

  // Hook integrations for script management
  const {
    selectedScript,
    registeredScripts,
    fetchScripts,
    selectScript,
    applyScript,
  } = useScriptSelection();
  const { fetchStatus } = useApplicationStatus(
    sessionToken,
    selectedScript?.id
  );

  const { registerScript, isRegistering } = useScriptRegistration(
    sessionToken || "",
    currentSite?.id || ""
  );

  /**
   * Initialize site information on component mount
   * Fetches site ID and name from Webflow API
   */
  useEffect(() => {
    async function getSiteInfo() {
      try {
        const siteInfo = await webflow.getSiteInfo();
        console.log("Got site info:", siteInfo);
        setCurrentSite({ id: siteInfo.siteId, name: siteInfo.siteName });
      } catch (error) {
        console.error("Error getting site info:", error);
      }
    }
    getSiteInfo();
  }, []);

  /**
   * Handles data initialization and updates when dependencies change
   * - Fetches registered scripts on first load
   * - Updates script application status when managing scripts
   */
  useEffect(() => {
    async function initializeData() {
      if (!currentSite?.id || !sessionToken) return;

      try {
        if (!hasInitialized.current) {
          await fetchScripts(currentSite.id, sessionToken);
          hasInitialized.current = true;
        }

        if (mainTab === "manage" && selectedScript) {
          await fetchStatus(currentSite.id);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    }

    initializeData();
  }, [
    currentSite?.id,
    sessionToken,
    mainTab,
    selectedScript,
    fetchScripts,
    registerScript,
    applyScript,
    fetchStatus,
  ]);

  /**
   * Handles the registration of new custom code
   * @param code - The custom code to register
   * @param isHosted - Whether the code is hosted externally
   */
  const handleRegisterCode = async (code: string, isHosted: boolean) => {
    try {
      await registerScript(code, isHosted);
      await fetchScripts(currentSite?.id || "", sessionToken || "");
    } catch (error) {
      console.error("Error registering code:", error);
      // Handle error (show notification, etc.)
    }
  };

  /**
   * Handles navigation between main dashboard tabs
   * @param _event - React synthetic event
   * @param newValue - New tab value to switch to
   */
  const handleMainTabChange = (
    _event: React.SyntheticEvent,
    newValue: "register" | "manage"
  ) => {
    setMainTab(newValue);
  };

  /**
   * Handles navigation between application tabs (Site/Pages)
   * @param _event - React synthetic event
   * @param newValue - New tab index to switch to
   */
  const handleApplicationTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setApplicationTab(newValue);
  };

  /**
   * Updates the currently selected script
   * @param script - The script to select for management
   */
  const handleScriptSelect = useCallback(
    (script: CustomCode) => {
      selectScript(script);
    },
    [selectScript]
  );

  return (
    <Box sx={{ width: "100%", pb: "100px" }}>
      <Tabs value={mainTab} onChange={handleMainTabChange}>
        <Tab value="register" label="Register Script" />
        <Tab value="manage" label="Manage Scripts" />
      </Tabs>

      {mainTab === "register" && (
        <ScriptRegistration
          onRegister={handleRegisterCode}
          isRegistering={isRegistering}
        />
      )}

      {mainTab === "manage" && registeredScripts.length > 0 && (
        <>
          <Paper elevation={0} sx={{ mb: 2 }}>
            <ScriptsList
              scripts={registeredScripts}
              selectedScript={selectedScript}
              onScriptSelect={handleScriptSelect}
            />
          </Paper>

          <Paper elevation={0}>
            <Tabs
              value={applicationTab}
              onChange={handleApplicationTabChange}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Apply to Site" />
              <Tab label="Apply to Pages" />
            </Tabs>

            <TabPanel value={applicationTab} index={0}>
              <SiteTab
                currentSite={currentSite}
                selectedScript={selectedScript}
                onApplyCode={applyScript}
              />
            </TabPanel>

            <TabPanel value={applicationTab} index={1}>
              <PagesTab
                selectedScript={selectedScript}
                onApplyCode={(targetType, pageIds, location) =>
                  applyScript(targetType, pageIds, location, sessionToken || "")
                }
              />
            </TabPanel>
          </Paper>
        </>
      )}
    </Box>
  );
}
