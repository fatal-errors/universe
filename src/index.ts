const destinationURL = "https://twitter.com/east9698";
const statusCode = 301;

export default {
  fetch() {
    return Response.redirect(destinationURL, statusCode);
  },
};
