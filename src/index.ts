import OAuthProvider from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { GoogleHandler } from "./google-handler";
import { registerSystemTools } from "./tools/system";
import type { Props } from "./utils";

export class PersonalMCP extends McpAgent<Env, Record<string, never>, Props> {
	server = new McpServer({
		name: "sheepbutler",
		version: "0.1.0",
	});

	async init() {
		// Defense in depth: the OAuth callback already rejects other accounts.
		if (!this.props || this.props.email.toLowerCase() !== this.env.ALLOWED_GOOGLE_EMAIL.toLowerCase()) {
			throw new Error("Unauthorized");
		}

		// Each feature area registers its tools from its own module.
		registerSystemTools(this.server, this.props);
	}
}

export default new OAuthProvider({
	apiHandler: PersonalMCP.serve("/mcp"),
	apiRoute: "/mcp",
	authorizeEndpoint: "/authorize",
	clientRegistrationEndpoint: "/register",
	defaultHandler: GoogleHandler as any,
	tokenEndpoint: "/token",
});
