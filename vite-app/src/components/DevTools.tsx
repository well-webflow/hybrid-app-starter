import { Box, Button, Typography, Paper } from "@mui/material";
import { useDevTools } from "../hooks/useDevTools";

interface DevToolsProps {
  logout: () => void;
  setHasClickedFetch: (value: boolean) => void;
}

export function DevTools({ logout, setHasClickedFetch }: DevToolsProps) {
  const { clearSession, logStorage } = useDevTools({
    logout,
    setHasClickedFetch,
  });

  const handleClearClick = () => {
    clearSession();
    window.location.reload(); // Force a complete refresh after clearing
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Development Tools
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" color="error" onClick={handleClearClick}>
          Clear Session
        </Button>

        <Button variant="outlined" onClick={logStorage}>
          Log Storage
        </Button>
      </Box>
    </Paper>
  );
}
