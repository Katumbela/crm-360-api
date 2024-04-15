"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const controllers_1 = require("./controllers");
const signup_controller_1 = require("./controllers/signup.controller");
const cors_1 = __importDefault(require("cors")); // Importe o módulo 'cors'
const get_user_by_id_1 = require("./independentServices/get-user-by-id");
require("dotenv/config");
const monitoring_brand_controller_1 = require("./controllers/monitoring.brand.controller");
const monitoring_brand_ddg_controller_1 = require("./controllers/monitoring.brand.ddg.controller");
const monitoring_yt_controller_1 = require("./controllers/monitoring.yt.controller");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*", // Permitir solicitações de todas as origens, você pode restringir isso para as origens específicas que deseja permitir
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos na solicitação
}));
route.post("/login", controllers_1.login);
route.post("/signup", signup_controller_1.signUpUser);
route.get("/monitoring", monitoring_brand_controller_1.MonitorBrandMentions);
route.get("/yt", monitoring_yt_controller_1.getYoutubeVideos);
route.get("/google", monitoring_brand_ddg_controller_1.getGMentions);
route.get("/user/:id", get_user_by_id_1.GetUserById);
route.get("/", (req, res) => {
    res.json({
        message: "Welcome to the CRM API, Its already alive !!! \n Signup in the main platform to get Started",
    });
});
app.use(route);
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)); // Corrija a função de callback do método listen
