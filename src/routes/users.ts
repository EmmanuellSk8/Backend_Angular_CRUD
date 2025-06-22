import express, { Request, Response } from 'express';
import db from '../config/db';
import { QueryError, RowDataPacket, ResultSetHeader } from 'mysql2';
import { User } from '../interface/user.interface';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  db.query(
    'SELECT * FROM users',
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

router.get('/:id', (req: Request, res: Response) => {
  db.query(
    'SELECT * FROM users WHERE id = ?',
    [req.params.id],
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
});

router.post('/create', (req: Request, res: Response) => {
  const { name, email, last_name, tel }: User = req.body;

  db.query(
    'INSERT INTO users (name, email, last_name, tel) VALUES (?, ?, ?, ?)',
    [name, email, last_name, tel],
    (err: QueryError | null, result: ResultSetHeader) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, name, email, last_name, tel });
    }
  );
});

router.put('/:id', (req: Request, res: Response) => {
  const { name, email, last_name, tel }: User = req.body;

  db.query(
    'UPDATE users SET name = ?, email = ?, last_name = ?, tel = ? WHERE id = ?',
    [name, email, last_name, tel, req.params.id],
    (err: QueryError | null, _result: ResultSetHeader) => {
      if (err) return res.status(500).json(err);
      res.json({ id: req.params.id, name, email, last_name, tel });
    }
  );
});

router.delete('/:id', (req: Request, res: Response) => {
  db.query(
    'DELETE FROM users WHERE id = ?',
    [req.params.id],
    (err: QueryError | null, _result: ResultSetHeader) => {
      if (err) return res.status(500).json(err);
      res.sendStatus(204);
    }
  );
});

export default router;
