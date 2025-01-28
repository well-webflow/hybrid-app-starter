import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import { CustomCode } from "../../../types/types";
import { useAuth } from "../../../hooks/useAuth";
import { useApplicationStatus } from "../../../hooks/useCustomCode/useApplicationStatus";

interface PagesTabProps {
  selectedScript: CustomCode | null;
  onApplyCode: (
    targetType: "page",
    pageIds: string[],
    location: "header" | "footer"
  ) => Promise<void>;
}

interface ApplicationStatus {
  [pageId: string]: {
    isApplied: boolean;
    location?: "header" | "footer";
  };
}

export function PagesTab({
  selectedScript,
  onApplyCode,
}: Omit<PagesTabProps, "applicationStatus">) {
  const { sessionToken } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the current site ID
  const [currentSite, setCurrentSite] = useState<{ id: string } | null>(null);

  // Get site info first
  useEffect(() => {
    async function getSiteInfo() {
      try {
        const siteInfo = await webflow.getSiteInfo();
        setCurrentSite({ id: siteInfo.siteId });
      } catch (error) {
        console.error("Error getting site info:", error);
      }
    }
    getSiteInfo();
  }, []);

  const {
    applicationStatus,
    isLoading: isStatusLoading,
    fetchStatus,
  } = useApplicationStatus(sessionToken, selectedScript?.id);

  // Fetch pages and status
  useEffect(() => {
    const fetchPagesAndStatus = async () => {
      if (!currentSite?.id) return;

      setIsLoading(true);
      try {
        const pagesData = await webflow.getAllPagesAndFolders();
        const formattedPages = await Promise.all(
          pagesData.map(async (page) => ({
            id: page.id,
            name: await page.getName(),
            url: page.url || page.slug || "",
          }))
        );
        setPages(formattedPages);

        // Only fetch status if we have a selected script
        if (selectedScript && formattedPages.length > 0) {
          await fetchStatus(
            currentSite.id, // Use the actual site ID
            formattedPages.map((p) => p.id)
          );
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPagesAndStatus();
  }, [currentSite?.id, selectedScript?.id]);

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedPages.length === filteredPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(filteredPages.map((page) => page.id));
    }
  };

  const handleTogglePage = (pageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageId)
        ? prev.filter((id) => id !== pageId)
        : [...prev, pageId]
    );
  };

  const handleApplyCode = async (location: "header" | "footer") => {
    if (!selectedScript || selectedPages.length === 0) return;

    try {
      await onApplyCode("page", selectedPages, location);
      // Refresh status after applying
      await fetchStatus(
        "",
        pages.map((p) => p.id)
      );
    } catch (error) {
      console.error("Error applying code to pages:", error);
    }
  };

  if (isLoading || isStatusLoading) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <CircularProgress size={20} sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Loading pages...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Apply to Pages
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button size="small" onClick={handleSelectAll} sx={{ mb: 2 }}>
          {selectedPages.length === filteredPages.length
            ? "Deselect All"
            : "Select All"}
        </Button>
      </Box>

      <Paper
        variant="outlined"
        sx={{ mb: 2, maxHeight: 400, overflow: "auto" }}
      >
        <List dense>
          {filteredPages.map((page) => (
            <ListItem
              key={page.id}
              secondaryAction={
                selectedScript &&
                applicationStatus[page.id]?.isApplied && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleIcon sx={{ color: green[500], fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      Applied
                    </Typography>
                  </Box>
                )
              }
            >
              <Checkbox
                edge="start"
                checked={selectedPages.includes(page.id)}
                onChange={() => handleTogglePage(page.id)}
              />
              <ListItemText
                primary={page.name}
                secondary={page.url}
                sx={{ mr: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleApplyCode("header")}
          disabled={!selectedScript || selectedPages.length === 0}
        >
          Apply to Header
        </Button>
        <Button
          variant="contained"
          onClick={() => handleApplyCode("footer")}
          disabled={!selectedScript || selectedPages.length === 0}
        >
          Apply to Footer
        </Button>
      </Box>
    </Box>
  );
}
