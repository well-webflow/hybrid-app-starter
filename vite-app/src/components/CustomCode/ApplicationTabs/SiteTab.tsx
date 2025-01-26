import { Box, Button, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import { CustomCode } from "../../../types/types";
import { useAuth } from "../../../hooks/useAuth";
import { useApplicationStatus } from "../../../hooks/useCustomCode/useApplicationStatus";
import { useEffect } from "react";

interface SiteTabProps {
  currentSite?: {
    id: string;
    name: string;
  } | null;
  selectedScript: CustomCode | null;
  onApplyCode: (
    targetType: "site",
    targetId: string,
    location: "header" | "footer",
    sessionToken: string
  ) => Promise<void>;
}

export function SiteTab({
  currentSite,
  selectedScript,
  onApplyCode,
}: Omit<SiteTabProps, "applicationStatus">) {
  const { sessionToken } = useAuth();
  const {
    applicationStatus,
    isLoading: isStatusLoading,
    fetchStatus,
  } = useApplicationStatus(sessionToken);

  // Fetch status when script or site changes
  useEffect(() => {
    if (!selectedScript || !currentSite?.id) return;
    fetchStatus(currentSite.id, []);
  }, [selectedScript, currentSite?.id, fetchStatus]);

  if (!currentSite || isStatusLoading) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Loading site information...
        </Typography>
      </Box>
    );
  }

  const handleApplyCode = async (location: "header" | "footer") => {
    if (!selectedScript || !currentSite) return;

    try {
      await onApplyCode("site", currentSite.id, location, sessionToken);
      // Refresh status after applying
      await fetchStatus(currentSite.id, []);
    } catch (error) {
      console.error("Error applying code to site:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Apply to Site: {currentSite.name}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        {selectedScript &&
          applicationStatus[currentSite.id]?.[selectedScript?.id] && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon sx={{ color: green[500] }} />
              <Typography variant="body2" color="text.secondary">
                Applied • Version:{" "}
                {applicationStatus[currentSite.id][selectedScript.id].version}
              </Typography>
            </Box>
          )}
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleApplyCode("header")}
          disabled={!selectedScript}
        >
          Apply to Header
        </Button>
        <Button
          variant="contained"
          onClick={() => handleApplyCode("footer")}
          disabled={!selectedScript}
        >
          Apply to Footer
        </Button>
      </Box>
    </Box>
  );
}
