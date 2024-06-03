import express, { Request, Response} from "express";
import { middleware } from "./utils/middleware";

const app = express();

app.use(express.json());
app.use(middleware);

app.get("/analytics", (req: Request, res: Response) => {
    res.send({
        site: "IndGeek.com",
        userCount: "240,753"
    });
});


app.listen(8080);