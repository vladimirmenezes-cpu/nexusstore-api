const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

const router = Router();
const CAMPOS = ['nome', 'email', 'telefone', 'cpf'];

router.get('/', (req, res) => {
  res.status(200).json(db.clientes);
});

router.get('/:id', (req, res) => {
  const cliente = db.clientes.find((c) => c.id === req.params.id);
  if (!cliente) {
    return res.status(404).json({ erro: `Cliente com id "${req.params.id}" não encontrado.` });
  }
  res.status(200).json(cliente);
});

router.post('/', (req, res) => {
  const { nome, email, telefone, cpf } = req.body;
  if (!nome || !email || !telefone || !cpf) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.', camposNecessarios: CAMPOS });
  }
  const novoCliente = { id: uuidv4(), nome, email, telefone, cpf };
  db.clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

router.put('/:id', (req, res) => {
  const index = db.clientes.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: `Cliente com id "${req.params.id}" não encontrado.` });
  }
  const { nome, email, telefone, cpf } = req.body;
  if (!nome || !email || !telefone || !cpf) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.', camposNecessarios: CAMPOS });
  }
  db.clientes[index] = { id: req.params.id, nome, email, telefone, cpf };
  res.status(200).json(db.clientes[index]);
});

router.delete('/:id', (req, res) => {
  const index = db.clientes.findIndex((c) => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: `Cliente com id "${req.params.id}" não encontrado.` });
  }
  const [removido] = db.clientes.splice(index, 1);
  res.status(200).json({ mensagem: 'Cliente removido com sucesso.', cliente: removido });
});

module.exports = router;