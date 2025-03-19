"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.list = exports.create = void 0;
const db_1 = require("../db");
const resource_model_1 = require("../model/resource.model");
const drizzle_orm_1 = require("drizzle-orm");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.insert(resource_model_1.resourceTable).values(req.body);
        res.status(201).json({ message: "Resource created successfully" });
    }
    catch (error) {
        res.status(400).json({ error: "Error creating resource" });
    }
});
exports.create = create;
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield db_1.db.select().from(resource_model_1.resourceTable);
        res.json(resources);
    }
    catch (error) {
        res.status(500).json({ error: "Error retrieving resources" });
    }
});
exports.list = list;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [resource] = yield db_1.db
            .select()
            .from(resource_model_1.resourceTable)
            .where((0, drizzle_orm_1.eq)(resource_model_1.resourceTable.id, Number(req.params.id)));
        resource ? res.json(resource) : res.status(404).json({ error: "Resource not found" });
    }
    catch (error) {
        res.status(500).json({ error: "Error retrieving resource" });
    }
});
exports.getById = getById;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db
            .update(resource_model_1.resourceTable)
            .set(req.body)
            .where((0, drizzle_orm_1.eq)(resource_model_1.resourceTable.id, Number(req.params.id)));
        res.json({ message: "Resource updated successfully" });
    }
    catch (error) {
        res.status(400).json({ error: "Error updating resource" });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.delete(resource_model_1.resourceTable).where((0, drizzle_orm_1.eq)(resource_model_1.resourceTable.id, Number(req.params.id)));
        res.json({ message: "Resource deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ error: "Error deleting resource" });
    }
});
exports.remove = remove;
