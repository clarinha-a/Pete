import { useEffect, useState } from 'react';

import {
    ArrowRight,
    Heart,
    CalendarDays,
    ShieldCheck,
    Truck,
    Plus,
    Minus,
    Sparkles,
    Scissors,
} from 'lucide-react';

import {
    listarProdutosMaisVendidos,
    listarServicos,
} from '../services/api';
import { useCarrinho } from '../context/CartContext';

function Home({ onAbrirAgendamento }) {
    const {
        itens,
        adicionarAoCarrinho,
        alterarQuantidade,
        removerDoCarrinho,
    } = useCarrinho();

    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const dados = await listarProdutosMaisVendidos();
                setProdutos(dados);
            } catch (erro) {
                setErro('Não foi possível carregar os produtos.');
                console.error(erro);
            } finally {
                setCarregando(false);
            }
        }

        carregarProdutos();
    }, []);
    useEffect(() => {
        async function carregarServicos() {
            try {
                const dados = await listarServicos();
                setServicos(dados);
            } catch (erro) {
                console.error('Erro ao carregar serviços:', erro);
            }
        }

        carregarServicos();
    }, []);
    return (
        <main>

            {/* Hero */}
            <section
                id="inicio"
                className="bg-areia min-h-[620px] lg:min-h-[680px] overflow-hidden"
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 lg:py-20">

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14">

                        {/* Conteúdo textual */}
                        <div className="relative z-10">

                            <span className="text-terracota uppercase tracking-[0.2em] text-xs font-bold">
                                Carinho em cada detalhe
                            </span>

                            <h1 className="text-marrom-escuro text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mt-6">
                                Seu pet feliz.
                                <br />

                                <span className="text-terracota">
                                    Você tranquilo.
                                </span>
                            </h1>

                            <p className="text-marrom-suave text-base md:text-lg leading-8 max-w-xl mt-6">
                                Tudo o que seu melhor amigo precisa em um só lugar:
                                cuidados, produtos e muito afeto.
                            </p>

                            {/* Botões */}
                            <div className="flex flex-wrap gap-4 mt-8">

                                <button
                                    type="button"
                                    onClick={onAbrirAgendamento}
                                    className="inline-flex items-center gap-3 bg-terracota hover:bg-terracota-hover text-creme px-6 py-4 rounded-full font-semibold text-sm shadow-lg shadow-terracota/20 transition-all hover:-translate-y-1"
                                >
                                    Agendar agora
                                    <ArrowRight size={18} />
                                </button>

                                <a
                                    href="#loja"
                                    className="inline-flex items-center bg-creme hover:bg-terracota-claro text-marrom-escuro border border-bege px-6 py-4 rounded-full font-semibold text-sm transition-colors"
                                >
                                    Explorar a loja
                                </a>

                            </div>

                            {/* Avaliações */}
                            <div className="flex items-center gap-6 mt-10">

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-marrom-escuro text-xl font-bold">
                                            4,9
                                        </span>

                                        <span className="text-dourado text-sm tracking-wide">
                                            ★★★★★
                                        </span>
                                    </div>

                                    <p className="text-marrom-suave text-xs mt-1">
                                        +1.200 avaliações
                                    </p>
                                </div>

                                <div className="h-10 w-px bg-bege" />

                                <div>
                                    <span className="text-marrom-escuro text-xl font-bold">
                                        8 anos
                                    </span>

                                    <p className="text-marrom-suave text-xs mt-1">
                                        cuidando com amor
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Imagem */}
                        <div className="relative flex items-center justify-center min-h-[350px] md:min-h-[480px]">

                            {/* Círculo decorativo */}
                            <div className="absolute w-[80%] aspect-square bg-bege-pessego rounded-full translate-x-5 translate-y-5" />

                            {/* Imagem principal */}
                            <div className="relative w-[80%] aspect-square rounded-full overflow-hidden shadow-2xl">

                                <img
                                    src="https://images.unsplash.com/photo- собак"
                                    alt="Cachorro recebendo carinho"
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            {/* Card cuidado */}
                            <div className="absolute top-12 right-0 md:-right-2 bg-creme rounded-2xl shadow-xl p-4 flex items-center gap-3">

                                <div className="bg-terracota-claro text-terracota p-3 rounded-xl">
                                    <Heart size={22} />
                                </div>

                                <div>
                                    <p className="text-marrom-escuro text-sm font-bold">
                                        Cuidado de verdade
                                    </p>

                                    <p className="text-marrom-suave text-xs mt-1">
                                        Profissionais apaixonados
                                    </p>
                                </div>

                            </div>

                            {/* Card horário */}
                            <div className="absolute bottom-8 left-0 md:-left-2 bg-creme rounded-2xl shadow-xl p-4 flex items-center gap-3">

                                <div className="bg-terracota-claro text-terracota p-3 rounded-xl">
                                    <CalendarDays size={22} />
                                </div>

                                <div>
                                    <p className="text-marrom-escuro text-sm font-bold">
                                        Próximo horário
                                    </p>

                                    <p className="text-marrom-suave text-xs mt-1">
                                        Consulte disponibilidade
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Benefícios */}
            <section className="bg-creme border-t border-bege">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-7">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Benefício 1 */}
                        <div className="flex items-center gap-4">
                            <CalendarDays className="text-terracota shrink-0" size={23} />

                            <div>
                                <h3 className="text-marrom-escuro font-semibold text-sm">
                                    Agendamento online
                                </h3>

                                <p className="text-marrom-suave text-xs mt-1">
                                    Escolha dia e horário
                                </p>
                            </div>
                        </div>

                        {/* Benefício 2 */}
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="text-terracota shrink-0" size={23} />

                            <div>
                                <h3 className="text-marrom-escuro font-semibold text-sm">
                                    Pagamento seguro
                                </h3>

                                <p className="text-marrom-suave text-xs mt-1">
                                    PIX, cartão ou boleto
                                </p>
                            </div>
                        </div>

                        {/* Benefício 3 */}
                        <div className="flex items-center gap-4">
                            <Truck className="text-terracota shrink-0" size={23} />

                            <div>
                                <h3 className="text-marrom-escuro font-semibold text-sm">
                                    Entrega rápida
                                </h3>

                                <p className="text-marrom-suave text-xs mt-1">
                                    Ou retire na loja
                                </p>
                            </div>
                        </div>

                        {/* Benefício 4 */}
                        <div className="flex items-center gap-4">
                            <Heart className="text-terracota shrink-0" size={23} />

                            <div>
                                <h3 className="text-marrom-escuro font-semibold text-sm">
                                    Atendimento humano
                                </h3>

                                <p className="text-marrom-suave text-xs mt-1">
                                    Feito por quem ama pets
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>


            {/* Serviços */}
            <section id="servicos" className="bg-areia py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-10">

                    <div className="mb-10">
                        <span className="text-terracota uppercase tracking-[0.2em] text-xs font-bold">
                            Nossos serviços
                        </span>

                        <h2 className="text-marrom-escuro text-3xl md:text-4xl font-bold mt-3">
                            Um dia de cuidado e diversão
                        </h2>

                        <p className="text-marrom-suave mt-3">
                            Escolha o cuidado ideal e deixe o resto com a nossa equipe.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {servicos.map((servico, index) => {
                            const fundos = [
                                'bg-[#DCE1CF]',
                                'bg-[#EAD3BD]',
                                'bg-[#E3D8CA]',
                            ];

                            const icones = [
                                <Sparkles size={19} />,
                                <Scissors size={19} />,
                                <Heart size={19} />,
                            ];

                            const descricoes = [
                                'Higiene, secagem e perfume',
                                'Cuidado para cada tipo de pelo',
                                'Pele saudável e pelo macio',
                            ];

                            return (
                                <article
                                    key={servico.id}
                                    className={`${fundos[index % 3]} min-h-[237px] rounded-[22px] p-6 flex flex-col justify-between`}
                                >
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <div className="w-11 h-11 bg-[#FFFDF8] rounded-xl flex items-center justify-center text-marrom-principal shadow-sm">
                                                {icones[index % 3]}
                                            </div>

                                            <span className="text-[#746156]/30 text-4xl font-bold">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <h3 className="text-marrom-escuro font-bold text-lg mt-6">
                                            {servico.nome}
                                        </h3>

                                        <p className="text-marrom-suave text-xs mt-2">
                                            {descricoes[index % 3]}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-marrom-escuro text-xs font-semibold">
                                            A partir de {Number(servico.valor).toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={onAbrirAgendamento}
                                            className="w-9 h-9 rounded-full bg-marrom-principal text-creme flex items-center justify-center hover:bg-terracota transition-colors"
                                            aria-label={`Agendar ${servico.nome}`}
                                        >
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}

                    </div>
                </div>
            </section>


{/* Favoritos dos pets */}
<section id="loja" className="bg-[#6B4938] py-20">
    <div className="max-w-7xl mx-auto px-6 md:px-10">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

            <div>
                <span className="text-terracota uppercase tracking-[0.2em] text-xs font-bold">
                    Pet shop online
                </span>

                <h2 className="text-creme text-3xl md:text-4xl font-bold mt-3">
                    Favoritos dos pets
                </h2>

                <p className="text-[#E3D8CA] mt-4">
                    Uma seleção especial para deixar a rotina mais gostosa.
                </p>
            </div>

            <a
                href="/loja"
                className="inline-flex items-center justify-center gap-3 border border-white/30 hover:bg-white/10 text-creme px-6 py-4 rounded-full font-semibold text-sm transition-colors"
            >
                Ver todos os produtos
                <ArrowRight size={18} />
            </a>

        </div>

        {carregando ? (
            <p className="text-center text-creme">
                Carregando produtos...
            </p>
        ) : erro ? (
            <p className="text-center text-red-200">{erro}</p>
        ) : produtos.length === 0 ? (
            <p className="text-center text-creme">
                Nenhum produto disponível.
            </p>
        ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {produtos.slice(0, 3).map((produto, index) => {

                    const itemNoCarrinho = itens.find(
                        (item) => item.id === produto.id
                    );

                    const quantidade = itemNoCarrinho
                        ? itemNoCarrinho.quantidade
                        : 0;

                    const fundos = [
                        'bg-[#DCE1CF]',
                        'bg-[#EAD3BD]',
                        'bg-[#E3D8CA]',
                    ];

                    const etiquetas = ['FOOD', 'FUN', 'CARE'];

                    return (
                        <article
                            key={produto.id}
                            className="bg-[#FFFDF8] rounded-[22px] overflow-hidden"
                        >

                            {/* Imagem do produto */}
                            <div className={`${fundos[index]} h-48 relative flex items-center justify-center`}>

                                {produto.imagem ? (
                                    <img
                                        src={produto.imagem}
                                        alt={produto.nome}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-28 h-28 rounded-full border border-[#746156]/50 flex items-center justify-center">
                                        <span className="text-[#746156]/70 text-xl font-bold tracking-widest">
                                            {etiquetas[index]}
                                        </span>
                                    </div>
                                )}

                                {index === 0 && (
                                    <span className="absolute top-3 left-3 bg-[#BD674B] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        Mais vendido
                                    </span>
                                )}

                                <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#746156]">
                                    <Heart size={17} />
                                </span>

                            </div>

                            {/* Informações */}
                            <div className="p-5">

                                <p className="text-terracota text-[10px] uppercase tracking-widest font-semibold">
                                    {produto.categoria || 'Produto'}
                                </p>

                                <h3 className="text-marrom-escuro font-bold text-lg mt-2">
                                    {produto.nome}
                                </h3>

                                <div className="flex items-center justify-between mt-3">

                                    <div className="flex items-center gap-1">
                                        <span className="text-dourado text-sm">
                                            ★★★★★
                                        </span>

                                        <span className="text-marrom-suave text-xs">
                                            {Number(produto.avaliacao || 0).toFixed(1)}
                                        </span>
                                    </div>

                                </div>

                                <div className="flex items-center justify-between mt-4">

                                    <span className="text-marrom-escuro text-lg font-bold">
                                        {Number(produto.valor).toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => adicionarAoCarrinho(produto)}
                                        className="w-10 h-10 rounded-full bg-terracota hover:bg-terracota-hover text-creme flex items-center justify-center transition-colors"
                                        aria-label="Adicionar ao carrinho"
                                    >
                                        <Plus size={20} />
                                    </button>

                                </div>

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-bege">

                                    <span className="text-marrom-suave text-xs">
                                        No carrinho: {quantidade}
                                    </span>

                                    <button
                                        type="button"
                                        disabled={quantidade === 0}
                                        onClick={() => {
                                            if (quantidade > 1) {
                                                alterarQuantidade(produto.id, quantidade - 1);
                                            } else {
                                                removerDoCarrinho(produto.id);
                                            }
                                        }}
                                        className="text-marrom-suave hover:text-terracota disabled:opacity-30 text-xs font-semibold"
                                    >
                                        Remover unidade
                                    </button>

                                </div>

                            </div>
                        </article>
                    );
                })}

            </div>
        )}

    </div>
</section>


        </main>
    );
}

export default Home;