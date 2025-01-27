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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

export function CustomCodeDashboard() {
  const { sessionToken } = useAuth();
  const hasInitialized = useRef(false);
  const [currentSite, setCurrentSite] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [mainTab, setMainTab] = useState<"register" | "manage">("register");
  const [applicationTab, setApplicationTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    async function initializeData() {
      if (!currentSite?.id || !sessionToken) return;

      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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

  const handleRegisterCode = async (code: string, isHosted: boolean) => {
    try {
      await registerScript(code, isHosted);
      await fetchScripts(currentSite?.id || "", sessionToken || "");
    } catch (error) {
      console.error("Error registering code:", error);
      // Handle error (show notification, etc.)
    }
  };

  const handleMainTabChange = (
    _event: React.SyntheticEvent,
    newValue: "register" | "manage"
  ) => {
    setMainTab(newValue);
  };

  const handleApplicationTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setApplicationTab(newValue);
  };

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
