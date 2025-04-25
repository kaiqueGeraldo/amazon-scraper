const express = require('express');
const cors = require('cors');
const scrapeRoutes = require('./routes/scrapeRoutes');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use('/api', scrapeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
