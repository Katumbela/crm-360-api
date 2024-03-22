"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/login", controllers_1.login);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
