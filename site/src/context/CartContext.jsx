
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [itens, setItens] = useState(() => {
        const salvos = localStorage.getItem('pete:carrinho');
        return salvos ? JSON.parse(salvos) : [];
    });

    useEffect(() => {
        localStorage.setItem('pete:carrinho', JSON.stringify(itens));
    }, [itens]);

    function adicionarAoCarrinho(produto) {
        setItens((atuais) => {
            const existente = atuais.find(
                (item) => item.id === produto.id
            );

            if (existente) {
                return atuais.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }

            return [...atuais, { ...produto, quantidade: 1 }];
        });
    }

    function removerDoCarrinho(id) {
        setItens((atuais) =>
            atuais.filter((item) => item.id !== id)
        );
    }

   function alterarQuantidade(id, quantidade) {
    if (quantidade <= 0) {
        removerDoCarrinho(id);
        return;
    }

    setItens((atuais) =>
        atuais.map((item) =>
            item.id === id ? { ...item, quantidade } : item
        )
    );
}

    function limparCarrinho() {
        setItens([]);
    }

    const quantidadeTotal = itens.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const valorTotal = itens.reduce(
        (total, item) => total + Number(item.valor) * item.quantidade,
        0
    );

    return (
        <CartContext.Provider
            value={{
                itens,
                quantidadeTotal,
                valorTotal,
                adicionarAoCarrinho,
                removerDoCarrinho,
                alterarQuantidade,
                limparCarrinho,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCarrinho() {
    return useContext(CartContext);
}
