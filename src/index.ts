import express, { Request, Response} from "express";
// import { middleware } from "./utils/middleware";
import { requestMiddleware } from "./utils/requestTracker";
import client from "prom-client"

const app = express();

app.use(express.json());
app.use(requestMiddleware);

app.get("/analytics", (req: Request, res: Response) => {
    res.send({
        site: "IndGeek.com",
        userCount: "240,753"
    });
});

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})


app.listen(8080);