import { type APIMessage, EmbedType } from "discord-api-types/v10";

interface Environment extends Env {
  WEBHOOK_URL: string;
}

export default {
  async fetch(
    request: Request<unknown, IncomingRequestCfProperties>,
    environment: Environment
  ) {
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
              value: `${ipAddress ?? "Not Found"}`,
            },
            {
              name: "ASN",
              value: `${request.cf?.asn ?? "Not Found"}`,
            },
            {
              name: "AS Organization",
              value: `${request.cf?.asOrganization ?? "Not Found"}`,
            },
            {
              name: "Data Center",
              value: `${request.cf?.colo ?? "Not Found"}`,
            },
            {
              name: "Country",
              value: `${request.cf?.country ?? "Not Found"}`,
            },
            {
              name: "City",
              value: `${request.cf?.city ?? "Not Found"}`,
            },
          ],
        },
      ],
    };

    await fetch(environment.WEBHOOK_URL, {
      body: JSON.stringify(message),
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
    });

    const destinationURL = "https://twitter.com/east9698";
    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);
  },
};
