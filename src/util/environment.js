export default process.env.NODE_ENV === "development"
  ? "${environment}"
  : process.env.NODE_ENV === "production" &&
    "https://code-snippet-server.herokuapp.com/";
