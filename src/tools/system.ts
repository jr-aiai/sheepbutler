import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Props } from "../utils";

// Connectivity check: confirms the connector is reachable and authenticated.
export function registerSystemTools(server: McpServer, props: Props) {
	server.registerTool(
		"ping",
		{
			description: "Check that the personal MCP server is reachable. Returns the server time and the logged-in user.",
			inputSchema: {},
		},
		async () => ({
			content: [
				{
					type: "text",
					text: `pong (${new Date().toISOString()}) — logged in as ${props.email}`,
				},
			],
		}),
	);
}
