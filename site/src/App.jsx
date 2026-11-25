
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom';

import { useEffect, useState } from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Login from './pages/Login';
import BookingModal from './components/BookingModal';
import { CartProvider } from './context/CartContext';
import Loja from './pages/Loja';
import MinhaConta from './pages/MinhaConta';
import Footer from './components/Footer';

function Layout() {
    const location = useLocation();
    const [agendamentoAberto, setAgendamentoAberto] = useState(false);

    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            const id = location.hash.substring(1);

            requestAnimationFrame(() => {
                const elemento = document.getElementById(id);

                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            });
        }
    }, [location.pathname, location.hash]);

    return (
        <>
            {location.pathname !== '/login' && (
                <Header
                    onAbrirAgendamento={() => setAgendamentoAberto(true)}
                />
            )}

            <Routes>
                <Route
                    path="/"
                    element={<Home onAbrirAgendamento={() => setAgendamentoAberto(true)} />}
                />

                <Route path="/loja" element={<Loja />} />
                <Route path="/login" element={<Login />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/minha-conta" element={<MinhaConta />} />
            </Routes>

            <Footer />

            <BookingModal
                aberto={agendamentoAberto}
                onFechar={() => setAgendamentoAberto(false)}
            />
        </>
    );
}

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
