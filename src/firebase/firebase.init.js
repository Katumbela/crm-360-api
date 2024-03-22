"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.storage = exports.firestore = void 0;
const app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/auth"); // Importe os módulos necessários: firestore, storage, auth, etc.
require("firebase/compat/storage");
require("firebase/compat/firestore");
const firebase_config_1 = __importDefault(require("./firebase.config"));
// Inicialize o Firebase com suas configurações
app_1.default.initializeApp(firebase_config_1.default);
exports.firestore = app_1.default.firestore();
exports.storage = app_1.default.storage();
exports.auth = app_1.default.auth();
exports.default = app_1.default;
