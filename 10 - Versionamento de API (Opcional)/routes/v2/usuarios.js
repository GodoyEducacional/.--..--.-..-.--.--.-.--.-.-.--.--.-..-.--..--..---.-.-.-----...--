const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ versao: 'v2', usuarios: ['Gabriel', 'Alex', 'Leticia'] });
});

module.exports = router; 