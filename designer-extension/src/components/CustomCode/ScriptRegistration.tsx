import { useState } from "react";
import {
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Paper,
} from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface ScriptRegistrationProps {
  onRegister: (code: string, isHosted: boolean) => Promise<void>;
  isRegistering: boolean;
}

export function ScriptRegistration({
  onRegister,
  isRegistering,
}: ScriptRegistrationProps) {
  const [codeInput, setCodeInput] = useState<string>("");
  const [isHosted, setIsHosted] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!codeInput.trim()) return;
    await onRegister(codeInput, isHosted);
    setCodeInput("");
  };

  return (
    <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Register a new script to your Webflow Site
      </Typography>
      <CodeEditor
        value={codeInput}
        language="js"
        placeholder={
          isHosted
            ? "Enter the URL to your JavaScript file (e.g., https://example.com/script.js)"
            : "console.log('Hello, World!');"
        }
        onChange={(e) => setCodeInput(e.target.value)}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          marginBottom: 16,
          borderRadius: 4,
        }}
      />
      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={isHosted}
          exclusive
          onChange={(e, value) => setIsHosted(value)}
          size="small"
        >
          <ToggleButton value={false}>Inline JavaScript</ToggleButton>
          <ToggleButton value={true}>Hosted Script URL</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!codeInput.trim() || isRegistering}
      >
        {isRegistering ? "Registering..." : "Register Code"}
      </Button>
    </Paper>
  );
}
