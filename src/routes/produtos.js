const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../database');

const router = Router();
const CAMPOS = ['nome', 'lote', 'quantidade', 'preco'];

router.get('/', (req, res) => {
  res.status(200).json(db.produtos);
});

router.get('/:id', (req, res) => {
  const produto = db.produtos.find((p) => p.id === req.params.id);
  if (!produto) {
    return res.status(404).json({ erro: `Produto com id "${req.params.id}" não encontrado.` });
  }
  res.status(200).json(produto);
});

router.post('/', (req, res) => {
  const { nome, lote, quantidade, preco } = req.body;
  if (!nome || !lote || quantidade === undefined || preco === undefined) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.', camposNecessarios: CAMPOS });
  }
  if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 0) {
    return res.status(400).json({ erro: 'O campo "quantidade" deve ser um número inteiro não negativo.' });
  }
  if (isNaN(Number(preco)) || Number(preco) < 0) {
    return res.status(400).json({ erro: 'O campo "preco" deve ser um número decimal não negativo.' });
  }
  const novoProduto = {
    id: uuidv4(),
    nome,
    lote: String(lote),
    quantidade: parseInt(quantidade),
    preco: parseFloat(Number(preco).toFixed(2)),
  };
  db.produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

router.put('/:id', (req, res) => {
  const index = db.produtos.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: `Produto com id "${req.params.id}" não encontrado.` });
  }
  const { nome, lote, quantidade, preco } = req.body;
  if (!nome || !lote || quantidade === undefined || preco === undefined) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.', camposNecessarios: CAMPOS });
  }
  if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 0) {
    return res.status(400).json({ erro: 'O campo "quantidade" deve ser um número inteiro não negativo.' });
  }
  if (isNaN(Number(preco)) || Number(preco) < 0) {
    return res.status(400).json({ erro: 'O campo "preco" deve ser um número decimal não negativo.' });
  }
  db.produtos[index] = {
    id: req.params.id,
    nome,
    lote: String(lote),
    quantidade: parseInt(quantidade),
    preco: parseFloat(Number(preco).toFixed(2)),
  };
  res.status(200).json(db.produtos[index]);
});

router.delete('/:id', (req, res) => {
  const index = db.produtos.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: `Produto com id "${req.params.id}" não encontrado.` });
  }
  const [removido] = db.produtos.splice(index, 1);
  res.status(200).json({ mensagem: 'Produto removido com sucesso.', produto: removido });
});

module.exports = router;