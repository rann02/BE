import express from "express";
const app = express();
const port = 3001;
import router from "./routes";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Hai, app listening on port ${port}`);
});
