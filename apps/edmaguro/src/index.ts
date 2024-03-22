import type {
  IncomingRequestCfProperties,
  Request,
} from "@cloudflare/workers-types/experimental";
import { type APIMessage, EmbedType } from "discord-api-types/v10";

interface Environment extends Omit<Env, "_"> {
  WEBHOOK_URL: string;
}

type IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

export default {
  async fetch(request: IncomingRequest, environment?: Environment) {
    if (environment?.WEBHOOK_URL) {
      const ipAddress = request.headers.get("CF-Connecting-IP");

      const message: Partial<APIMessage> = {
        embeds: [
          {
            type: EmbedType.Rich,
            title: "edmagu.roにアクセスがありました",
            description: "Visitor's Private Geolocation Data",
            fields: [
              {
                name: "IP Address",
                value: ipAddress ?? "Not Found",
              },
              {
                name: "ASN",
                value: request.cf?.asn.toString() ?? "Not Found",
              },
              {
                name: "AS Organization",
                value: request.cf?.asOrganization ?? "Not Found",
              },
              {
                name: "Data Center",
                value: request.cf?.colo ?? "Not Found",
              },
              {
                name: "Country",
                value: request.cf?.country ?? "Not Found",
              },
              {
                name: "City",
                value: request.cf?.city ?? "Not Found",
              },
            ],
          },
        ],
      };

      await fetch(environment.WEBHOOK_URL, {
        body: JSON.stringify(message),
        method: "POST",
        headers: { "content-type": "application/json" },
      });
    }

    const destinationURL = "https://x.com/east9698";
    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);
  },
};
