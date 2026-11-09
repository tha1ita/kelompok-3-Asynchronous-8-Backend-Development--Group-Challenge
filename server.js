require('dotenv').config();
const express = require('express');
const cors = require('cors');
const suratRoutes = require('./src/routes/suratRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/surat', suratRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server jalan di http://localhost:' + process.env.PORT);
});