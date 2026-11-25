
import { useEffect, useState } from 'react';
import { ShoppingBag, Plus, Minus, Search } from 'lucide-react';
import { listarProdutos } from '../services/api';
import { useCarrinho } from '../context/CartContext';

function Loja() {
    const { itens, adicionarAoCarrinho, alterarQuantidade } = useCarrinho();

    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [busca, setBusca] = useState('');
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const dados = await listarProdutos();
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

    const categorias = [
        'Todos',
        ...new Set(produtos.map((produto) => produto.categoria))
    ];

    const produtosFiltrados = produtos.filter((produto) => {
        const correspondeBusca = produto.nome
            .toLowerCase()
            .includes(busca.toLowerCase());

        const correspondeCategoria =
            categoriaSelecionada === 'Todos' ||
            produto.categoria === categoriaSelecionada;

        return correspondeBusca && correspondeCategoria;
    });

    function quantidadeNoCarrinho(id) {
        const item = itens.find((item) => item.id === id);
        return item ? item.quantidade : 0;
    }

    function formatarPreco(valor) {
        return Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    return (
        <main className="min-h-screen bg-areia">

            {/* Cabeçalho da loja */}
            <section className="bg-terracota-claro py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-terracota uppercase tracking-[0.2em] text-xs font-bold">
                        Tudo para seu melhor amigo
                    </span>

                    <h1 className="text-marrom-escuro text-4xl md:text-5xl font-bold mt-4">
                        Nossa loja
                    </h1>

                    <p className="text-marrom-suave mt-4 max-w-xl mx-auto">
                        Encontre produtos selecionados para cuidar,
                        alimentar e divertir seu pet.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-12">

                {/* Busca */}
                <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between mb-8">

                    <div>
                        <h2 className="text-marrom-escuro text-2xl font-bold">
                            Nossos produtos
                        </h2>

                        <p className="text-marrom-suave text-sm mt-1">
                            {produtosFiltrados.length} produtos encontrados
                        </p>
                    </div>

                    <div className="relative w-full md:max-w-sm">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-marrom-suave"
                        />

                        <input
                            type="text"
                            placeholder="Buscar produto..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="w-full bg-creme border border-bege rounded-full py-3 pl-11 pr-5 text-marrom-escuro outline-none focus:border-terracota"
                        />
                    </div>
                </div>

                {/* Categorias */}
                <div className="flex flex-wrap gap-3 mb-10">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            onClick={() => setCategoriaSelecionada(categoria)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                                categoriaSelecionada === categoria
                                    ? 'bg-marrom-principal text-creme'
                                    : 'bg-creme border border-bege text-marrom-suave hover:bg-terracota-claro'
                            }`}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>

                {/* Estados da página */}
                {carregando ? (
                    <p className="text-center text-marrom-suave py-16">
                        Carregando produtos...
                    </p>
                ) : erro ? (
                    <p className="text-center text-red-700 py-16">
                        {erro}
                    </p>
                ) : produtosFiltrados.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingBag
                            size={42}
                            className="text-terracota mx-auto mb-4"
                        />

                        <h3 className="text-marrom-escuro font-bold text-xl">
                            Nenhum produto encontrado
                        </h3>

                        <p className="text-marrom-suave mt-2">
                            Tente buscar por outro nome ou categoria.
                        </p>
                    </div>
                ) : (

                    /* Produtos */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {produtosFiltrados.map((produto) => {
                            const quantidade = quantidadeNoCarrinho(produto.id);

                            return (
                                <article
                                    key={produto.id}
                                    className="bg-creme rounded-2xl border border-bege overflow-hidden group"
                                >
                                    <div className="h-56 bg-terracota-claro flex items-center justify-center overflow-hidden">
                                        {produto.imagem ? (
                                            <img
                                                src={produto.imagem}
                                                alt={produto.nome}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <ShoppingBag
                                                size={48}
                                                className="text-terracota"
                                            />
                                        )}
                                    </div>

                                    <div className="p-5">

                                        <span className="text-terracota text-xs font-bold uppercase tracking-wider">
                                            {produto.categoria}
                                        </span>

                                        <h3 className="text-marrom-escuro font-bold text-lg mt-2 min-h-14">
                                            {produto.nome}
                                        </h3>

                                        <div className="flex items-center gap-1 mt-2">
                                            <span className="text-dourado">
                                                ★
                                            </span>

                                            <span className="text-marrom-suave text-sm">
                                                {produto.avaliacao || 'Sem avaliação'}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 mt-5">

                                            <span className="text-marrom-escuro font-bold text-lg">
                                                {formatarPreco(produto.valor)}
                                            </span>

                                            {quantidade === 0 ? (
                                                <button
                                                    onClick={() => adicionarAoCarrinho(produto)}
                                                    disabled={Number(produto.estoque) <= 0}
                                                    className="w-10 h-10 rounded-full bg-terracota text-creme flex items-center justify-center hover:bg-terracota-hover transition-colors disabled:opacity-40"
                                                    aria-label={`Adicionar ${produto.nome} ao carrinho`}
                                                >
                                                    <Plus size={19} />
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2 bg-areia rounded-full p-1">

                                                    <button
                                                        onClick={() => alterarQuantidade(produto.id, quantidade - 1)}
                                                        className="w-8 h-8 rounded-full bg-creme text-marrom-escuro flex items-center justify-center"
                                                        aria-label="Diminuir quantidade"
                                                    >
                                                        <Minus size={15} />
                                                    </button>

                                                    <span className="text-marrom-escuro font-bold min-w-4 text-center">
                                                        {quantidade}
                                                    </span>

                                                    <button
                                                        onClick={() => adicionarAoCarrinho(produto)}
                                                        disabled={quantidade >= Number(produto.estoque)}
                                                        className="w-8 h-8 rounded-full bg-creme text-marrom-escuro flex items-center justify-center disabled:opacity-40"
                                                        aria-label="Aumentar quantidade"
                                                    >
                                                        <Plus size={15} />
                                                    </button>

                                                </div>
                                            )}

                                        </div>

                                        {Number(produto.estoque) <= 0 && (
                                            <p className="text-red-700 text-xs mt-3">
                                                Produto indisponível
                                            </p>
                                        )}

                                    </div>
                                </article>
                            );
                        })}

                    </div>
                )}

            </section>
        </main>
    );
}

export default Loja;
