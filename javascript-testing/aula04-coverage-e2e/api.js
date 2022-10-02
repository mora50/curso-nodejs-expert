const http = require("http");
const routes = {
  "/contact:get": (req, res) => {
    res.write("contact page");

    return res.end();
  },

  default: (req, res) => {
    res.write("hello world");

    return res.end();
  },
  "/login:post": async (req, res) => {
    for await (const data of req) {
      const user = JSON.parse(data);

      if (user.username !== "cesar" && user.password !== "12345") {
        res.writeHead(401);
        res.write("Login failed!");

        return res.end();
      }
    }

    res.write("Login approved");

    return res.end();
  },
};

const handler = (req, res) => {
  const { url, method } = req;

  const routeKey = `${url}:${method.toLowerCase()}`;

  const chosen = routes[routeKey] || routes.default;

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  return chosen(req, res);
};

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("Server running at 3000 port"));

module.exports = app;
