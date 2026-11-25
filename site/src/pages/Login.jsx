
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { cadastrarUsuario, loginUsuario } from '../services/api';

function Login() {
  const [modo, setModo] = useState('login');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  function trocarModo(novoModo) {
    setModo(novoModo);
    setErro('');
    setMensagem('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');
    setMensagem('');
    setCarregando(true);

    try {
      if (modo === 'cadastro') {
        const resultado = await cadastrarUsuario({
          nome,
          email,
          senha,
          telefone,
        });

        setMensagem(resultado.mensagem);
        setModo('login');
        setNome('');
        setTelefone('');
        setSenha('');
      } else {
        const resultado = await loginUsuario({ email, senha });

        setMensagem(resultado.mensagem);
        navigate('/minha-conta');
      }
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="min-h-screen bg-areia flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-5xl bg-creme rounded-[2rem] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        <section className="bg-marrom-principal text-creme p-10 md:p-12 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="bg-terracota rounded-full p-3">
              <PawPrint size={25} />
            </div>
            <span className="text-2xl font-bold">Petê</span>
          </Link>

          <div className="my-12">
            <span className="text-bege-pessego uppercase tracking-[0.2em] text-xs font-bold">
              Carinho em cada detalhe
            </span>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mt-5">
              Cuidar de quem você ama nunca foi tão fácil.
            </h1>

            <p className="text-bege-pessego leading-7 mt-6">
              Entre na sua conta para acompanhar os cuidados,
              agendamentos e tudo o que seu pet precisa.
            </p>
          </div>

          <p className="text-bege-pessego text-sm">
            Petê — cuidado e carinho para seu melhor amigo.
          </p>
        </section>

        <section className="p-8 md:p-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-marrom-suave hover:text-terracota text-sm mb-8"
          >
            <ArrowLeft size={17} />
            Voltar para a página inicial
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-marrom-escuro">
              {modo === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
            </h2>

            <p className="text-marrom-suave mt-2">
              {modo === 'login'
                ? 'Acesse sua conta para continuar.'
                : 'Preencha seus dados para começar.'}
            </p>
          </div>

          <div className="grid grid-cols-2 bg-terracota-claro rounded-xl p-1 mb-8">
            <button
              type="button"
              onClick={() => trocarModo('login')}
              className={`py-3 cursor-pointer rounded-lg font-semibold text-sm transition-colors ${modo === 'login'
                  ? 'bg-creme text-marrom-escuro shadow-sm'
                  : 'text-marrom-suave'
                }`}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => trocarModo('cadastro')}
              className={`py-3 cursor-pointer rounded-lg font-semibold text-sm transition-colors ${modo === 'cadastro'
                  ? 'bg-creme text-marrom-escuro shadow-sm'
                  : 'text-marrom-suave'
                }`}
            >
              Criar conta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {modo === 'cadastro' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-marrom-escuro mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="Digite seu nome"
                    required
                    className="w-full border border-bege rounded-xl px-4 py-3 bg-white outline-none focus:border-terracota"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-marrom-escuro mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(event) => setTelefone(event.target.value)}
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full border border-bege rounded-xl px-4 py-3 bg-white outline-none focus:border-terracota"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-marrom-escuro mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seuemail@exemplo.com"
                required
                className="w-full border border-bege rounded-xl px-4 py-3 bg-white outline-none focus:border-terracota"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-marrom-escuro mb-2">
                Senha
              </label>

              <div className="relative">
                <input
                  type={mostrarSenha ? 'text' : 'password'}
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  placeholder="Digite sua senha"
                  required
                  className="w-full border border-bege rounded-xl px-4 py-3 pr-12 bg-white outline-none focus:border-terracota"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-marrom-suave"
                >
                  {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {erro && (
              <p role="alert" className="text-red-700 text-sm bg-red-50 p-3 rounded-lg">
                {erro}
              </p>
            )}

            {mensagem && (
              <p role="status" className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">
                {mensagem}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-terracota hover:bg-terracota-hover disabled:opacity-60 text-creme font-semibold py-4 rounded-xl transition-colors"
            >
              {carregando
                ? 'Aguarde...'
                : modo === 'login'
                  ? 'Entrar na minha conta'
                  : 'Criar minha conta'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Login;