const express = require('express');
const clientesRouter = require('./routes/clientes');
const funcionariosRouter = require('./routes/funcionarios');
const produtosRouter = require('./routes/produtos');

const app = express();

app.use(express.json());

app.use('/clientes', clientesRouter);
app.use('/funcionarios', funcionariosRouter);
app.use('/produtos', produtosRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    api: 'NexusStore API',
    versao: '1.0.0',
    endpoints: {
      clientes: ['GET /clientes', 'GET /clientes/:id', 'POST /clientes', 'PUT /clientes/:id', 'DELETE /clientes/:id'],
      funcionarios: ['GET /funcionarios', 'GET /funcionarios/:id', 'POST /funcionarios', 'PUT /funcionarios/:id', 'DELETE /funcionarios/:id'],
      produtos: ['GET /produtos', 'GET /produtos/:id', 'POST /produtos', 'PUT /produtos/:id', 'DELETE /produtos/:id'],
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 NexusStore API rodando em http://localhost:${PORT}`);
});