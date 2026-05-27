const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

const router = Router();
const CAMPOS = ['nome', 'telefone', 'email', 'cargo', 'setor'];

router.get('/', (req, res) => {
  res.status(200).json(db.funcionarios);
});

router.get('/:id', (req, res) => {
  const funcionario = db.funcionarios.find((f) => f.id === req.params.id);
  if (!funcionario) {
    return res.status(404).json({ erro: `Funcionário com id "${req.params.id}" não encontrado.` });
  }
  res.status(200).json(funcionario);
});

router.post('/', (req, res) => {
  const { nome, telefone, email, cargo, setor } = req.body;
  if (!nome || !telefone || !email || !cargo || !setor) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.', camposNecessarios: CAMPOS });
  }
  const novoFuncionario = { id: uuidv4(), nome, telefone, email, cargo, setor };
  db.funcionarios.push(novoFuncionario);
  res.status(201).json(novoFuncionario);
});

router.put('/:id', (req, res) => {
  const index = db.funcionarios.findIndex((f) => f.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: `Funcionário com id "${req.params.id}" não encontrado.` });
  }
  const { nome, telefone, email, cargo, setor } = req.body;
  if (!nome || !telefone || !email || !cargo || !setor) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.', camposNecessarios: CAMPOS });
  }
  db.funcionarios[index] = { id: req.params.id, nome, telefone, email, cargo, setor };
  res.status(200).json(db.funcionarios[index]);
});

router.delete('/:id', (req, res) => {
  const index = db.funcionarios.findIndex((f) => f.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: `Funcionário com id "${req.params.id}" não encontrado.` });
  }
  const [removido] = db.funcionarios.splice(index, 1);
  res.status(200).json({ mensagem: 'Funcionário removido com sucesso.', funcionario: removido });
});

module.exports = router;