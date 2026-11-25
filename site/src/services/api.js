
const API_URL = 'http://localhost:3333';

export async function cadastrarUsuario(dados) {
  const resposta = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  const dadosResposta = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dadosResposta.mensagem || 'Erro ao cadastrar usuário.');
  }

  return dadosResposta;
}

export async function loginUsuario(dados) {
  const resposta = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  });

  const dadosResposta = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dadosResposta.mensagem || 'Erro ao realizar login.');
  }

  localStorage.setItem('token', dadosResposta.token);

  return dadosResposta;
}


export async function listarProdutos() {
  const resposta = await fetch(`${API_URL}/produtos`);

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao carregar produtos.');
  }

  return dados;
}

export async function listarServicos() {
  const resposta = await fetch(`${API_URL}/servicos`);

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao carregar serviços.');
  }

  return dados;
}

// Listar produtos mais vendidos
export async function listarProdutosMaisVendidos() {
    const resposta = await fetch(`${API_URL}/produtos/mais-vendidos`);
    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || 'Erro ao carregar os produtos mais vendidos.');
    }

    return dados;
}


// Realizar requisições que precisam de autenticação
async function requisicaoAutenticada(endpoint) {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Você precisa fazer login novamente.');
  }

  const resposta = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao buscar informações.');
  }

  return dados;
}

// Buscar dados do usuário conectado
export async function buscarMeuPerfil() {
  return requisicaoAutenticada('/usuarios/me');
}

// Listar pets do usuário conectado
export async function listarMeusPets() {
  return requisicaoAutenticada('/pets');
}

// Listar agendamentos do usuário conectado
export async function listarMeusAgendamentos() {
  return requisicaoAutenticada('/agendamentos');
}

// Listar compras do usuário conectado
export async function listarMinhasCompras() {
  return requisicaoAutenticada('/compras');
}
