export default {
  async fetch() {
    const destinationURL = "https://x.com/east9698";
    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);
  },
};
