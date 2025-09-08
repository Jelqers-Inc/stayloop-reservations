const express = require('express');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/reservations', (req, res) => {
  res.json([{ msg: 'Hola desde reservas' }]);
});

app.listen(PORT, () => {
  console.log(`Reservation service running on port ${PORT}`);
});