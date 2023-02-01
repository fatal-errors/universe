import { type APIMessage, EmbedType } from "discord-api-types/v10";

interface Environment extends Env {
  WEBHOOK_URL: string;
}

export default {
  async fetch(req: Request, env: Environment) {
    const ipAddress = req.headers.get("CF-Connecting-IP");

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
              value: `${req.cf?.asn ?? "Not Found"}`,
            },
            {
              name: "AS Organization",
              value: `${req.cf?.asOrganization ?? "Not Found"}`,
            },
            {
              name: "Data Center",
              value: `${req.cf?.colo ?? "Not Found"}`,
            },
            {
              name: "Country",
              value: `${req.cf?.country ?? "Not Found"}`,
            },
            {
              name: "City",
              value: `${req.cf?.city ?? "Not Found"}`,
            },
          ],
        },
      ],
    };

    await fetch(env.WEBHOOK_URL, {
      body: JSON.stringify(message),
      method: "POST",
      headers: { "content-type": "application/json;charset=UTF-8" },
    });

    const destinationURL = "https://twitter.com/east9698";
    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);
  },
};
