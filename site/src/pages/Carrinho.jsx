
import { Link } from 'react-router-dom';
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ArrowRight,
    ShoppingCart,
} from 'lucide-react';

import { useCarrinho } from '../context/CartContext';

function Carrinho() {
    const {
        itens,
        quantidadeTotal,
        valorTotal,
        removerDoCarrinho,
        alterarQuantidade,
    } = useCarrinho();

    function formatarPreco(valor) {
        return Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    return (
        <main className="min-h-screen bg-areia py-12 px-6">

            <div className="max-w-7xl mx-auto">

                {/* Cabeçalho */}
                <div className="mb-10">
                    <span className="text-terracota uppercase tracking-[0.2em] text-xs font-bold">
                        Sua seleção especial
                    </span>

                    <h1 className="text-marrom-escuro text-3xl md:text-4xl font-bold mt-3">
                        Minha sacola
                    </h1>

                    <p className="text-marrom-suave mt-3">
                        Confira seus produtos antes de continuar.
                    </p>
                </div>

                {itens.length === 0 ? (

                    /* Sacola vazia */
                    <div className="bg-creme rounded-3xl border border-bege p-12 text-center shadow-sm">

                        <div className="w-20 h-20 bg-terracota-claro rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={36} className="text-terracota" />
                        </div>

                        <h2 className="text-marrom-escuro text-2xl font-bold">
                            Sua sacola está vazia
                        </h2>

                        <p className="text-marrom-suave mt-3">
                            Ainda não encontramos nenhum produto por aqui.
                        </p>

                        <Link
                            to="/#loja"
                            className="inline-flex items-center gap-2 mt-7 bg-terracota hover:bg-terracota-hover text-creme px-7 py-3 rounded-full font-semibold transition-colors"
                        >
                            Explorar produtos
                            <ArrowRight size={18} />
                        </Link>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Lista de produtos */}
                        <section className="lg:col-span-2">

                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-marrom-escuro font-bold text-xl">
                                    Seus produtos
                                </h2>

                                <span className="text-marrom-suave text-sm">
                                    {quantidadeTotal} {quantidadeTotal === 1 ? 'unidade' : 'unidades'}
                                </span>
                            </div>

                            <div className="space-y-5">

                                {itens.map((item) => (

                                    <article
                                        key={item.id}
                                        className="bg-creme rounded-2xl border border-bege p-5 shadow-sm flex flex-col sm:flex-row gap-5"
                                    >

                                        {/* Imagem */}
                                        <div className="w-full sm:w-36 h-36 bg-terracota-claro rounded-xl overflow-hidden flex items-center justify-center shrink-0">

                                            {item.imagem ? (
                                                <img
                                                    src={item.imagem}
                                                    alt={item.nome}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ShoppingBag size={36} className="text-terracota" />
                                            )}

                                        </div>

                                        {/* Informações */}
                                        <div className="flex-1 flex flex-col justify-between">

                                            <div>
                                                <span className="text-terracota text-xs font-bold uppercase tracking-wider">
                                                    {item.categoria || 'Produto'}
                                                </span>

                                                <h3 className="text-marrom-escuro font-bold text-lg mt-2">
                                                    {item.nome}
                                                </h3>

                                                <p className="text-marrom-suave text-sm mt-2">
                                                    Preço unitário: {formatarPreco(item.valor)}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                                                {/* Quantidade */}
                                                <div className="flex items-center gap-3 bg-areia rounded-full p-1">

                                                    <button
                                                        onClick={() => {
                                                            if (item.quantidade > 1) {
                                                                alterarQuantidade(item.id, item.quantidade - 1);
                                                            }
                                                        }}
                                                        disabled={item.quantidade <= 1}
                                                        className="w-8 h-8 rounded-full bg-creme text-marrom-escuro flex items-center justify-center hover:bg-terracota-claro disabled:opacity-40 transition-colors"
                                                        aria-label="Diminuir quantidade"
                                                    >
                                                        <Minus size={15} />
                                                    </button>

                                                    <span className="text-marrom-escuro font-bold min-w-5 text-center">
                                                        {item.quantidade}
                                                    </span>

                                                    <button
                                                        onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                                                        className="w-8 h-8 rounded-full bg-creme text-marrom-escuro flex items-center justify-center hover:bg-terracota-claro transition-colors"
                                                        aria-label="Aumentar quantidade"
                                                    >
                                                        <Plus size={15} />
                                                    </button>

                                                </div>

                                                {/* Subtotal e remoção */}
                                                <div className="flex items-center gap-5">

                                                    <span className="text-marrom-escuro font-bold">
                                                        {formatarPreco(Number(item.valor) * item.quantidade)}
                                                    </span>

                                                    <button
                                                        onClick={() => removerDoCarrinho(item.id)}
                                                        className="text-marrom-suave hover:text-red-600 transition-colors"
                                                        aria-label={`Remover ${item.nome}`}
                                                    >
                                                        <Trash2 size={19} />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>

                            <Link
                                to="/#loja"
                                className="inline-flex items-center gap-2 text-terracota hover:text-terracota-hover font-semibold text-sm mt-7"
                            >
                                <ArrowRight size={17} className="rotate-180" />
                                Continuar comprando
                            </Link>

                        </section>

                        {/* Resumo */}
                        <aside className="bg-creme rounded-2xl border border-bege p-7 shadow-sm h-fit lg:sticky lg:top-32">

                            <div className="flex items-center gap-3 mb-7">
                                <ShoppingCart size={22} className="text-terracota" />

                                <h2 className="text-marrom-escuro font-bold text-xl">
                                    Resumo do pedido
                                </h2>
                            </div>

                            <div className="flex justify-between text-marrom-suave text-sm mb-4">
                                <span>Produtos</span>
                                <span>{quantidadeTotal} unidades</span>
                            </div>

                            <div className="flex justify-between text-marrom-suave text-sm mb-5">
                                <span>Subtotal</span>
                                <span>{formatarPreco(valorTotal)}</span>
                            </div>

                            <div className="border-t border-bege pt-5">

                                <div className="flex items-center justify-between">
                                    <span className="text-marrom-escuro font-bold">
                                        Total
                                    </span>

                                    <span className="text-terracota font-bold text-2xl">
                                        {formatarPreco(valorTotal)}
                                    </span>
                                </div>

                                <p className="text-marrom-suave text-xs mt-2">
                                    Frete e demais custos serão calculados na finalização.
                                </p>

                            </div>

                            <button
                                disabled
                                className="w-full mt-7 bg-terracota text-creme py-4 rounded-full font-bold text-sm opacity-70 cursor-not-allowed"
                            >
                                Finalizar compra em breve
                            </button>

                            <p className="text-center text-marrom-suave text-xs mt-4">
                                Obrigado por escolher o Petê!
                            </p>

                        </aside>

                    </div>

                )}

            </div>

        </main>
    );
}

export default Carrinho;

