
import {
    PawPrint,
    UserRound,
    ShoppingBag,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CartContext';
import { useEffect, useState } from 'react';

function Header({ onAbrirAgendamento }) {
    const { quantidadeTotal } = useCarrinho();
    const estaLogado = Boolean(localStorage.getItem('token'));
    const [promocaoAtual, setPromocaoAtual] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setPromocaoAtual((atual) => (atual + 1) % 2);
        }, 3500);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <header className="sticky top-0 z-50">

            {/* Barra de promoções */}

            <div
                className="bg-marrom-principal text-creme h-10 flex items-center justify-center text-center px-4"
                aria-live="polite"
            >
                <p
                    key={promocaoAtual}
                    className="font-semibold text-sm md:text-base animacao-promocao"
                >
                    {promocaoAtual === 0
                        ? 'Frete grátis para compras acima de R$ 149'
                        : 'Primeira consulta com 15% OFF'}
                </p>
            </div>


            {/* Navegação */}
            <div className="bg-areia">
                <div className="px-6 py-5">

                    <div className="flex items-center justify-around">

                        {/* Logo */}
                        <a href="/#inicio" className="flex items-center gap-3">
                            <div className="bg-terracota text-creme w-11 h-11 rounded-full flex items-center justify-center">
                                <PawPrint size={21} />
                            </div>

                            <span className="text-marrom-principal text-2xl font-bold">
                                Petê
                            </span>
                        </a>

                        {/* Menu */}
                        <nav className="hidden md:flex items-center gap-8 text-marrom-escuro font-medium text-sm">

                            <a href="/#servicos" className="hover:text-terracota transition-colors">
                                Serviços
                            </a>

                            <Link to="/loja" className="hover:text-terracota transition-colors">
                                Loja
                            </Link>
                            <a href="/#cuidados" className="hover:text-terracota transition-colors">
                                Cuidados
                            </a>

                            <a href="/#contato" className="hover:text-terracota transition-colors">
                                Contato
                            </a>

                        </nav>

                        {/* Ações */}
                        <div className="flex items-center gap-5">

                            {/* Usuário */}
                            <Link
                                to={estaLogado ? "/minha-conta" : "/login"}
                                aria-label="Minha conta"
                                className="text-marrom-escuro hover:text-terracota transition-colors cursor-pointer"
                            >
                                <UserRound size={21} />
                            </Link>

                            {/* Sacola */}
                            <Link
                                to="/carrinho"
                                aria-label="Sacola"
                                className="relative text-marrom-escuro hover:text-terracota transition-colors cursor-pointer"
                            >
                                <ShoppingBag size={21} />

                                {quantidadeTotal > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-terracota text-creme text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                                        {quantidadeTotal}
                                    </span>
                                )}
                            </Link>

                            {/* Agendamento */}
                            <button
                                type="button"
                                onClick={onAbrirAgendamento}
                                className="hidden sm:inline-flex bg-terracota hover:bg-terracota-hover text-creme px-6 py-3 rounded-full font-semibold text-sm shadow-lg shadow-terracota/20 transition-all hover:-translate-y-0.5"
                            >
                                Agendar serviço
                            </button>

                        </div>

                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;
