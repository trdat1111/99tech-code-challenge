"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resource_controller_1 = require("../controller/resource.controller");
const router = express_1.default.Router();
router.post("/", resource_controller_1.create);
router.get("/", resource_controller_1.list);
router.get("/:id", resource_controller_1.getById);
router.put("/:id", resource_controller_1.update);
router.delete("/:id", resource_controller_1.remove);
exports.default = router;
