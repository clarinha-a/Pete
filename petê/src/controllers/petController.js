import prisma from '../prisma.js';

// 1. CREATE - Cadastrar Pet vinculado a um Cliente
export async function criarPet(req, res) {
  try {
    const { nome, raca, idade, clienteId } = req.body;

    const novoPet = await prisma.pet.create({
      data: {
        nome: nome,
        raca: raca,
        idade: idade ? Number(idade) : null
      }
    });

    return res.status(201).json(novoPet);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao criar pet. Verifique se o clienteId existe." });
  }
}

// 2. READ - Listar Todos os Pets com os dados do Cliente
export async function listarPets(req, res) {
  try {
    const pets = await prisma.pet.findMany({
      include: {
        cliente: true // Traz os dados do Cliente associado no mesmo JSON
      }
    });

    return res.status(200).json(pets);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao listar pets." });
  }
}

// 3. READ - Buscar Pet por ID
export async function buscarPetPorId(req, res) {
  try {
    const { id } = req.params;

    const pet = await prisma.pet.findUnique({
      where: { id: Number(id) },
      include: { cliente: true }
    });

    if (!pet) {
      return res.status(404).json({ erro: "Pet não encontrado." });
    }

    return res.status(200).json(pet);
  } catch (erro) {
    return res.status(500).json({ erro: "Erro ao buscar o pet." });
  }
}

// 4. UPDATE - Atualizar dados do Pet
export async function atualizarPet(req, res) {
  try {
    const { id } = req.params;
    const { nome, raca, idade } = req.body;

    const petAtualizado = await prisma.pet.update({
      where: { id: Number(id) },
      data: {
        nome: nome,
        raca: raca,
        idade: idade ? Number(idade) : null
      }
    });

    return res.status(200).json(petAtualizado);
  } catch (erro) {
    return res.status(404).json({ erro: "Registro não encontrado para atualização." });
  }
}

// 5. DELETE - Remover Pet
export async function apagarPet(req, res) {
  try {
    const { id } = req.params;

    await prisma.pet.delete({
      where: { id: Number(id) }
    });

    return res.status(204).send(); // Status 204: Sucesso sem corpo
  } catch (erro) {
    return res.status(404).json({ erro: "Registro não encontrado para exclusão." });
  }
}