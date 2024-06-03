"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./utils/middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(middleware_1.middleware);
app.get("/user", (req, res) => {
    res.send({
        site: "IndGeek.com",
        userCount: "240,753"
    });
});
app.listen(3000);
