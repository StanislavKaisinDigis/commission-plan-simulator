import express, { Request, Response } from "express";
const cors = require("cors");
import { router } from "./routes";

export const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("this is homepage");
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running at port number ${port}`);
});
