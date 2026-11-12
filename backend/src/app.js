
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const autenticar = require('./middlewares/authMiddleware');
const petRoutes = require('./routes/petRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const disponibilidadeRoutes = require('./routes/disponibilidadeRoutes');
const bloqueioRoutes = require('./routes/bloqueioRoutes');
const campanhaMarketingRoutes = require('./routes/campanhaMarketingRoutes');
const caixaRoutes = require('./routes/caixaRoutes');
const compraRoutes = require('./routes/compraRoutes');
const logWhatsAppRoutes = require('./routes/logWhatsAppRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/pets', petRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/servicos', servicoRoutes);
app.use('/disponibilidades', disponibilidadeRoutes);
app.use('/bloqueios', bloqueioRoutes);
app.use('/campanhas-marketing', campanhaMarketingRoutes);
app.use('/caixas', caixaRoutes);
app.use('/compras', compraRoutes);
app.use('/logs-whatsapp', logWhatsAppRoutes);

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API da Pet Shop funcionando!'
    });
});

app.get('/teste-banco', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                current_database() AS banco,
                current_schema() AS schema,
                to_regclass('public.usuario') AS tabela_usuario
        `);

        res.json({
            mensagem: 'Teste de conexão realizado!',
            banco: resultado.rows[0].banco,
            schema: resultado.rows[0].schema,
            tabela: resultado.rows[0].tabela_usuario
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: 'Não foi possível conectar ao banco de dados.'
        });
    }
});

app.get('/perfil', autenticar, (req, res) => {
    res.json({
        mensagem: 'Autenticação realizada com sucesso!',
        usuario: req.usuario
    });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
