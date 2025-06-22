const express = require('express');
const cors = require('cors');
import usersRoutes from './routes/users';


const app = express();
app.use(cors(
  {origin: 'http://localhost:4200'},
));
app.use(express.json());

app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});