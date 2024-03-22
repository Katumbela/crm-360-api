"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const controllers_1 = require("./controllers");
const signup_controller_1 = require("./controllers/signup.controller");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
route.post("/login", controllers_1.login);
route.post("/signup", signup_controller_1.signUp);
route.get('/', (req, res) => {
    res.json({ message: 'Wow! My first project in TypeScript!!!' });
});
app.use(route);
const PORT = 3035;
app.listen(PORT, () => `Server running on port ${PORT}`);
