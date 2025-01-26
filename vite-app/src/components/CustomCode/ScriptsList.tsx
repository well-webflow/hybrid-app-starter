import { CustomCode } from "../../types/types";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

interface ScriptsListProps {
  scripts: CustomCode[];
  selectedScript: CustomCode | null;
  onScriptSelect: (script: CustomCode) => void;
}

export function ScriptsList({
  scripts,
  selectedScript,
  onScriptSelect,
}: ScriptsListProps) {
  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Registered Scripts
      </Typography>
      <List>
        {scripts?.map((script) => (
          <ListItemButton
            key={script.id}
            selected={selectedScript?.id === script.id}
            onClick={() => onScriptSelect(script)}
            sx={{
              borderRadius: 1,
              mb: 1,
            }}
          >
            <ListItemText
              primary={script.displayName || "Unnamed Script"}
              secondary={`Version: ${script.version} • Created: ${new Date(
                script.createdOn
              ).toLocaleString()}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
