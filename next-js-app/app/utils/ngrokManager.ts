import ngrok from "@ngrok/ngrok";
import chalk from "chalk";

function drawBox(content: string): string {
  const lines = content.split("\n");
  const width = Math.max(...lines.map((line) => stripAnsi(line).length));

  const top = `╭${"─".repeat(width + 2)}╮`;
  const bottom = `╰${"─".repeat(width + 2)}╯`;

  const paddedLines = lines.map((line) => {
    const visibleLength = stripAnsi(line).length;
    const padding = " ".repeat(width - visibleLength);
    return `│ ${line}${padding} │`;
  });

  return [
    "",
    chalk.blue(top),
    ...paddedLines.map((line) => chalk.blue(line)),
    chalk.blue(bottom),
    "",
  ].join("\n");
}

// Helper function to strip ANSI color codes when calculating string length
function stripAnsi(string: string): string {
  return string.replace(/\u001b\[[0-9]{1,2}m/g, "");
}

export async function startNgrok(port: number): Promise<string> {
  console.log(chalk.yellow("⚡ Starting ngrok tunnel..."));

  try {
    const listener = await ngrok.connect({
      addr: port,
      authtoken: process.env.NGROK_AUTH_TOKEN,
    });

    const url = listener.url();
    if (!url) throw new Error("Failed to get ngrok URL");

    console.log(chalk.green("✓ Ngrok tunnel started successfully"));
    return url;
  } catch (error) {
    console.error(chalk.red("✗ Ngrok failed to start:"), error);
    throw error;
  }
}

export async function setupDevEnvironment(): Promise<string> {
  try {
    const PORT = parseInt(process.env.PORT || "3000");
    const ngrokUrl = await startNgrok(PORT);

    const message = [
      chalk.bold("Development Environment"),
      "",
      `${chalk.bold("Local URL:  ")}${chalk.cyan(`http://localhost:${PORT}`)}`,
      `${chalk.bold("Ngrok URL:  ")}${chalk.cyan(ngrokUrl)}`,
      `${chalk.bold("Callback:   ")}${chalk.cyan(`${ngrokUrl}/api/callback`)}`,
      "",
      `${chalk.yellow("⚠")} ${chalk.bold(
        "Update your Webflow callback URL to:"
      )}`,
      chalk.cyan(`${ngrokUrl}/api/callback`),
    ].join("\n");

    console.log(drawBox(message));
    return ngrokUrl;
  } catch (error) {
    console.error(
      chalk.red("Error setting up development environment:"),
      error
    );
    throw error;
  }
}
