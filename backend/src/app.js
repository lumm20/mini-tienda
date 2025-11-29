import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import e from "express";
import helmet from "helmet";
import cors from "cors";
const app = e();

app.use(helmet());
app.use(cors());
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

app.use('/api',router);

app.use(errorHandler);

export default app;