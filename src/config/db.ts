import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,        
  user: 'root',
  password: 'root',
  database: 'angular_crud'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    throw err;
  }
  console.log('✅ Conectado a MySQL');
});

export default connection;
