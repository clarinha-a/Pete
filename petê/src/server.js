import express from 'express';
import petRoutes from './routes/petRoutes.js';

const app = express();
const PORTA = 3000;

app.use(express.json());

// Rota de teste da Semana 1
app.get('/status', (req, res) => {
  return res.json({ status: "API Online - Projeto Petê com PostgreSQL" });
});

// Registro das rotas da Semana 2
app.use(petRoutes);

app.listen(PORTA, () => {
  console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`);
});