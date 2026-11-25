
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    UserRound,
    PawPrint,
    CalendarDays,
    ShoppingBag,
    Heart,
    Plus,
    ArrowRight,
    Clock,
    MapPin,
    LogOut,
    Package,
} from 'lucide-react';

import {
    buscarMeuPerfil,
    listarMeusPets,
    listarMeusAgendamentos,
    listarMinhasCompras,
} from '../services/api';

function MinhaConta() {
    const [perfil, setPerfil] = useState(null);
    const [pets, setPets] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [compras, setCompras] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [abaAtiva, setAbaAtiva] = useState('visao-geral');

    useEffect(() => {
        async function carregarDados() {
            try {
                const [dadosPerfil, dadosPets, dadosAgendamentos, dadosCompras] =
                    await Promise.all([
                        buscarMeuPerfil(),
                        listarMeusPets(),
                        listarMeusAgendamentos(),
                        listarMinhasCompras(),
                    ]);

                setPerfil(dadosPerfil);
                setPets(dadosPets);
                setAgendamentos(dadosAgendamentos);
                setCompras(dadosCompras);
            } catch (error) {
                setErro(error.message);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    function sair() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    const itensMenu = [
        { id: 'visao-geral', nome: 'Visão geral', icone: UserRound },
        { id: 'pets', nome: 'Meus pets', icone: PawPrint },
        { id: 'agendamentos', nome: 'Agendamentos', icone: CalendarDays },
        { id: 'pedidos', nome: 'Meus pedidos', icone: ShoppingBag },
        { id: 'favoritos', nome: 'Favoritos', icone: Heart },
    ];

    function formatarData(data) {
        if (!data) return 'Data não informada';

        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    }

    if (carregando) {
        return (
            <main className="min-h-[60vh] flex items-center justify-center">
                <p className="text-marrom-suave">Carregando sua conta...</p>
            </main>
        );
    }

    if (erro) {
        return (
            <main className="min-h-[60vh] flex flex-col items-center justify-center px-6">
                <p className="text-terracota font-semibold mb-4">{erro}</p>
                <Link to="/login" className="text-marrom-principal underline">
                    Fazer login novamente
                </Link>
            </main>
        );
    }

    return (
        <main className="bg-areia min-h-screen">

            {/* Boas-vindas */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p className="text-terracota font-semibold text-sm mb-2">
                            MINHA CONTA
                        </p>

                        <h1 className="text-3xl md:text-4xl font-bold text-marrom-escuro mb-3">
                            Olá, {perfil?.nome?.split(' ')[0]}!
                        </h1>

                        <p className="text-marrom-suave">
                            Que bom ter você por aqui. Acompanhe tudo sobre seus pets.
                        </p>
                    </div>

                    <button
                        onClick={sair}
                        className="flex items-center gap-2 text-marrom-suave hover:text-terracota transition-colors text-sm"
                    >
                        <LogOut size={17} />
                        Sair da conta
                    </button>
                </div>
            </section>

            {/* Conteúdo */}
            <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

                    {/* Menu lateral */}
                    <aside className="bg-creme rounded-2xl p-5 h-fit border border-bege">
                        <div className="pb-5 mb-4 border-b border-bege">
                            <div className="w-14 h-14 rounded-full bg-terracota-claro flex items-center justify-center mb-3">
                                <UserRound size={25} className="text-marrom-principal" />
                            </div>

                            <h2 className="font-bold text-marrom-escuro">
                                {perfil?.nome}
                            </h2>

                            <p className="text-xs text-marrom-suave mt-1">
                                {perfil?.email}
                            </p>
                        </div>

                        <nav className="space-y-2">
                            {itensMenu.map((item) => {
                                const Icone = item.icone;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setAbaAtiva(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                            abaAtiva === item.id
                                                ? 'bg-terracota-claro text-marrom-principal'
                                                : 'text-marrom-suave hover:bg-areia'
                                        }`}
                                    >
                                        <Icone size={19} />
                                        {item.nome}
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Área principal */}
                    <div className="space-y-8">

                        {abaAtiva === 'visao-geral' && (
                            <>
                                {/* Próximo agendamento */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-marrom-escuro">
                                            Próximo agendamento
                                        </h2>
                                    </div>

                                    <div className="bg-creme border border-bege rounded-2xl p-6">
                                        {agendamentos.length > 0 ? (
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <CalendarDays className="text-terracota" />
                                                    <span className="font-semibold">
                                                        {formatarData(agendamentos[0].data_hora)}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-marrom-suave">
                                                    Status: {agendamentos[0].status}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                                                <div>
                                                    <div className="w-12 h-12 rounded-full bg-terracota-claro flex items-center justify-center mb-4">
                                                        <CalendarDays className="text-terracota" />
                                                    </div>

                                                    <h3 className="font-bold text-marrom-escuro mb-2">
                                                        Você ainda não tem agendamentos
                                                    </h3>

                                                    <p className="text-sm text-marrom-suave">
                                                        Agende um serviço para seu pet e acompanhe tudo por aqui.
                                                    </p>
                                                </div>

                                                <Link
                                                    to="/#servicos"
                                                    className="inline-flex items-center justify-center gap-2 bg-terracota hover:bg-terracota-hover text-creme px-5 py-3 rounded-full text-sm font-semibold transition-colors"
                                                >
                                                    Agendar serviço
                                                    <ArrowRight size={17} />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Pets */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold text-marrom-escuro">
                                            Meus pets
                                        </h2>

                                        <button
                                            onClick={() => setAbaAtiva('pets')}
                                            className="text-sm text-terracota font-semibold flex items-center gap-1"
                                        >
                                            Ver todos
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>

                                    {pets.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {pets.map((pet) => (
                                                <div
                                                    key={pet.id}
                                                    className="bg-creme border border-bege rounded-2xl p-5"
                                                >
                                                    {pet.imagem ? (
                                                        <img
                                                            src={pet.imagem}
                                                            alt={pet.nome}
                                                            className="w-16 h-16 rounded-full object-cover mb-4"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-full bg-terracota-claro flex items-center justify-center mb-4">
                                                            <PawPrint className="text-terracota" size={25} />
                                                        </div>
                                                    )}

                                                    <h3 className="font-bold text-marrom-escuro">
                                                        {pet.nome}
                                                    </h3>

                                                    <p className="text-sm text-marrom-suave mt-1">
                                                        {pet.raca} · {pet.idade} anos
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-creme border border-bege rounded-2xl p-6 text-center">
                                            <PawPrint size={30} className="text-terracota mx-auto mb-3" />

                                            <h3 className="font-bold text-marrom-escuro mb-2">
                                                Nenhum pet cadastrado ainda
                                            </h3>

                                            <p className="text-sm text-marrom-suave">
                                                Cadastre seu primeiro companheiro para acompanhar os cuidados dele.
                                            </p>
                                        </div>
                                    )}
                                </section>

                                {/* Pedidos */}
                                <section>
                                    <h2 className="text-xl font-bold text-marrom-escuro mb-4">
                                        Pedidos recentes
                                    </h2>

                                    <div className="bg-creme border border-bege rounded-2xl p-6">
                                        {compras.length > 0 ? (
                                            <div className="space-y-4">
                                                {compras.slice(0, 3).map((compra) => (
                                                    <div
                                                        key={compra.id}
                                                        className="flex items-center justify-between gap-4 border-b border-bege pb-4 last:border-0 last:pb-0"
                                                    >
                                                        <div>
                                                            <p className="font-semibold text-marrom-escuro">
                                                                Pedido #{compra.id}
                                                            </p>

                                                            <p className="text-sm text-marrom-suave">
                                                                {formatarData(compra.data_criacao)}
                                                            </p>
                                                        </div>

                                                        <span className="font-bold text-marrom-principal">
                                                            {Number(compra.valor_total).toLocaleString('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL',
                                                            })}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <Package size={30} className="text-terracota mx-auto mb-3" />

                                                <h3 className="font-bold text-marrom-escuro mb-2">
                                                    Você ainda não fez pedidos
                                                </h3>

                                                <p className="text-sm text-marrom-suave mb-4">
                                                    Seus pedidos aparecerão aqui quando você comprar na nossa loja.
                                                </p>

                                                <Link
                                                    to="/loja"
                                                    className="inline-flex items-center gap-2 text-terracota font-semibold text-sm"
                                                >
                                                    Conhecer a loja
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </>
                        )}

                        {abaAtiva === 'pets' && (
                            <section>
                                <h2 className="text-2xl font-bold mb-5">Meus pets</h2>

                                {pets.length === 0 ? (
                                    <div className="bg-creme border border-bege rounded-2xl p-10 text-center">
                                        <PawPrint size={36} className="text-terracota mx-auto mb-4" />
                                        <h3 className="font-bold mb-2">Nenhum pet cadastrado</h3>
                                        <p className="text-sm text-marrom-suave">
                                            Seus pets cadastrados aparecerão aqui.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {pets.map((pet) => (
                                            <div key={pet.id} className="bg-creme border border-bege rounded-2xl p-6">
                                                <h3 className="font-bold">{pet.nome}</h3>
                                                <p className="text-sm text-marrom-suave">
                                                    {pet.raca} · {pet.idade} anos
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {abaAtiva === 'agendamentos' && (
                            <section>
                                <h2 className="text-2xl font-bold mb-5">Meus agendamentos</h2>

                                <div className="bg-creme border border-bege rounded-2xl p-8">
                                    {agendamentos.length === 0 ? (
                                        <p className="text-marrom-suave text-center">
                                            Você ainda não possui agendamentos.
                                        </p>
                                    ) : (
                                        agendamentos.map((agendamento) => (
                                            <div key={agendamento.id} className="border-b border-bege py-4">
                                                <p className="font-semibold">
                                                    {formatarData(agendamento.data_hora)}
                                                </p>
                                                <p className="text-sm text-marrom-suave">
                                                    Status: {agendamento.status}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        )}

                        {abaAtiva === 'pedidos' && (
                            <section>
                                <h2 className="text-2xl font-bold mb-5">Meus pedidos</h2>

                                <div className="bg-creme border border-bege rounded-2xl p-8">
                                    {compras.length === 0 ? (
                                        <p className="text-marrom-suave text-center">
                                            Você ainda não possui pedidos.
                                        </p>
                                    ) : (
                                        compras.map((compra) => (
                                            <div key={compra.id} className="border-b border-bege py-4">
                                                <p className="font-semibold">
                                                    Pedido #{compra.id}
                                                </p>
                                                <p className="text-sm text-marrom-suave">
                                                    {formatarData(compra.data_criacao)}
                                                </p>
                                                <p className="font-semibold mt-2">
                                                    {Number(compra.valor_total).toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    })}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>
                        )}

                        {abaAtiva === 'favoritos' && (
                            <section>
                                <h2 className="text-2xl font-bold mb-5">Meus favoritos</h2>

                                <div className="bg-creme border border-bege rounded-2xl p-10 text-center">
                                    <Heart size={36} className="text-terracota mx-auto mb-4" />

                                    <h3 className="font-bold mb-2">
                                        Sua lista de favoritos está vazia
                                    </h3>

                                    <p className="text-sm text-marrom-suave">
                                        Os produtos que você favoritar aparecerão aqui.
                                    </p>

                                    <Link
                                        to="/loja"
                                        className="inline-flex items-center gap-2 text-terracota font-semibold text-sm mt-5"
                                    >
                                        Explorar produtos
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </section>
        </main>
    );
}

export default MinhaConta;
