import express from "express";
import { create, list, getById, update, remove } from "../controller/resource.controller";

const router = express.Router();

router.post("/", create);
router.get("/", list);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
