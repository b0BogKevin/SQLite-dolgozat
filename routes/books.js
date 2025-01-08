import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const books = await dbQuery("SELECT * FROM books;");
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const books = await dbQuery("SELECT * FROM books WHERE id = ?;",[req.params.id]);
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await dbQuery("INSERT INTO books (title,author,description,year) VALUES(?,?,?,?);",[req.body.title,req.body.author,req.body.description,req.body.year]);
        res.status(200).json({ id: result.lastID, ...req.body });
    } catch (err) {
        next(err);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        await dbRun("DELETE FROM books WHERE id = ?;", [req.params.id]);
        res.sendStatus(200)
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    
    try {
        const [book] = await dbQuery("SELECT * FROM books WHERE id = ?;", [req.params.id]);
        if (!book) return res.status(404).json({ message: "Not found" });

        await dbRun("UPDATE books SET title = ?,author = ?, description = ?,year=? WHERE id = ?;", 
            [req.body.title ||book.tile,req.body.author ||book.author, req.body.description||book.description, req.body.year||book.year, req.params.id]);
        res.sendStatus(200)

    } catch (err) {
        next(err);
    }
});

export default router