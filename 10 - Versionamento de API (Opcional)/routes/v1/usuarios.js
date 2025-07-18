const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ versao: 'v1', usuarios: ['Gabriel', 'Alex'] });
});

module.exports = router; 