import express, { Express } from "express";
import routes from "./src/init/routes";
import theApp from "./src/init/theApp";

const app: Express = express();

app.get("/test", async (req, res) => {
  try {
    // Optional: check MongoDB connection
    // readyState meanings:
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

    res.status(200).json({
      message: "✅ Server is running fine!",
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Something went wrong", error });
  }
});

app.disable("x-powered-by"); // hides 'X-Powered-By: Express' header
app.set("trust proxy", "loopback"); //Forward user/client ip to log it on backend

app.use((req, res, next) => {
  // @ts-ignore
  if (req?.useragent && req?.useragent?.isBot) {
    return res.status(403).send("Bots not allowed");
  }
  next();
});

theApp(app);
routes(app);

// scheduleAllCronJobs();

app.listen(8080, "0.0.0.0", () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${8080}`);
});
export default app;
