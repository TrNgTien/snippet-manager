export default process.env.NODE_ENV === "production"
  ? "https://code-snippet-server.herokuapp.com"
  : "http://localhost:5000";
