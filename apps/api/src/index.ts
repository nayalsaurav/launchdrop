import express from "express";
import helmet from "helmet";
import healthRoute from "./routes/health";
import projectRoute from "./routes/project";
import deployRoute from "./routes/deploy";
import { errorMiddleware } from "./middlewares/error.middleware";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import morgan from "morgan";

const PORT = process.env.PORT || 3005;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true, 
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());
app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});
app.use("/api/health", healthRoute);
app.use("/api/project", projectRoute);
app.use("/api/deploy", deployRoute);

app.get("/", (_req, res) => {
  return res.json({
    message: "hi from the api backend",
  });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
