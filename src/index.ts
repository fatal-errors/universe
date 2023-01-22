const destinationURL = "https://twitter.com/east9698";
const statusCode = 301;

export default {
  fetch(): Response {
    return Response.redirect(destinationURL, statusCode);
  },
};
