import { Request, Response } from "express";
import { db } from "../db";
import { resourceTable } from "../model/resource.model";
import { eq } from "drizzle-orm";

export const create = async (req: Request, res: Response) => {
    try {
        const result = await db.insert(resourceTable).values(req.body);
        res.status(201).json({ message: "Resource created successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error creating resource" });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const resources = await db.select().from(resourceTable);
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving resources" });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const [resource] = await db
            .select()
            .from(resourceTable)
            .where(eq(resourceTable.id, Number(req.params.id)));
        resource ? res.json(resource) : res.status(404).json({ error: "Resource not found" });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving resource" });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        await db
            .update(resourceTable)
            .set(req.body)
            .where(eq(resourceTable.id, Number(req.params.id)));
        res.json({ message: "Resource updated successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error updating resource" });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await db.delete(resourceTable).where(eq(resourceTable.id, Number(req.params.id)));
        res.json({ message: "Resource deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Error deleting resource" });
    }
};
