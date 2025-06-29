const express = require('express');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(express.json());

// Rotas de usuário
app.use('/api', usuarioRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('WebTaskLock Backend funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
