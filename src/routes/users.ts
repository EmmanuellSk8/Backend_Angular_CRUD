// const express = require('express');
// const db = require('../db');
// const router = express.Router();
// import { User } from '../interface/user.interface';

// router.get('/', (req: any, res: any) => {
//   db.query('SELECT * FROM users', (err: Error, results: User[]) => {
//     if (err) return res.status(500).json(err);
//     res.json(results);
//   });
// });

// router.get('/:id', (req: any, res: any) => {
//   db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err: any, results: any) => {
//     if (err) return res.status(500).json(err);
//     res.json(results[0]);
//   });
// });

// // Crear
// router.post('/', (req: any, res: any) => {
//   const { name, email, last_name, tel }: User = req.body;
//   db.query('INSERT INTO users (name, email, last_name, tel) VALUES (?, ?)', [name, email, last_name, tel], (err: Error, result: any) => {
//     if (err) return res.status(500).json(err);
//     res.json({ id: result.insertId, name, email, last_name, tel });
//   });
// });

// // Actualizar
// router.put('/:id', (req: any, res: any) => {
//   const { name, email, last_name, tel }: User = req.body;
//   db.query('UPDATE users SET name = ?, email = ?, last_name = ?, tel = ? WHERE id = ?', [name, email, req.params.id], (err: Error) => {
//     if (err) return res.status(500).json(err);
//     res.json({ id: req.params.id, name, email, last_name, tel });
//   });
// });

// // Eliminar
// router.delete('/:id', (req: any, res: any) => {
//   db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err:Error) => {
//     if (err) return res.status(500).json(err);
//     res.sendStatus(204);
//   });
// });

// module.exports = router;

import express, { Request, Response } from 'express';
import db from '../config/db';
import { QueryError, RowDataPacket, ResultSetHeader } from 'mysql2';
import { User } from '../interface/user.interface';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', (_req: Request, res: Response) => {
  db.query(
    'SELECT * FROM users',
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// Obtener un usuario por ID
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

// Crear un nuevo usuario
router.post('/', (req: Request, res: Response) => {
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

// Actualizar un usuario
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

// Eliminar un usuario
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
