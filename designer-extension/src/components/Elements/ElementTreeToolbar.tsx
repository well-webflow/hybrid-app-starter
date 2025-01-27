import { Box, Button, ButtonGroup, TextField } from "@mui/material";
import {
  SaveAlt as SaveIcon,
  ContentCopy as CopyIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

interface ElementTreeToolbarProps {
  onSave?: () => void;
  onCopy?: () => void;
  onSearch?: (term: string) => void;
}

export function ElementTreeToolbar({
  onSave,
  onCopy,
  onSearch,
}: ElementTreeToolbarProps) {
  return (
    <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
      <ButtonGroup variant="contained">
        <Button startIcon={<SaveIcon />} onClick={onSave}>
          Save Structure
        </Button>
        <Button startIcon={<CopyIcon />} onClick={onCopy}>
          Copy to Clipboard
        </Button>
      </ButtonGroup>

      <TextField
        size="small"
        placeholder="Search elements..."
        onChange={(e) => onSearch?.(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon color="action" />,
        }}
      />
    </Box>
  );
}
