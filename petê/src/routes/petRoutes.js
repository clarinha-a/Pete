import express from 'express';
import {
  criarPet,
  listarPets,
  buscarPetPorId,
  atualizarPet,
  apagarPet
} from '../controllers/petController.js';

const router = express.Router();

// Mapeamento das 5 rotas do CRUD de Pets
router.post('/pets', criarPet);
router.get('/pets', listarPets);
router.get('/pets/:id', buscarPetPorId);
router.put('/pets/:id', atualizarPet);
router.delete('/pets/:id', apagarPet);

export default router;