const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    // Validação simples de campos obrigatórios
    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha nome, email e senha.' });
    }

    try {
        // Verificar se o email já está cadastrado
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { email: email }
        });

        if (usuarioExistente) {
            return res.status(400).json({ erro: 'Email já cadastrado.' });
        }

        // Criptografar a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Criar o usuário
        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash
            }
        });

        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
}

module.exports = {
    cadastrarUsuario
};
