
import { useEffect, useState } from 'react';
import { X, CalendarDays, Clock, UserRound, PawPrint } from 'lucide-react';
import { listarServicos } from '../services/api';
import './BookingModal.css';

function BookingModal({ aberto, onFechar }) {
    const [servicos, setServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [profissional, setProfissional] = useState('Sem preferência');
    const [erro, setErro] = useState('');

    const horarios = [
        '09:00', '10:00', '11:00',
        '13:00', '14:00', '15:00',
        '16:00', '17:00',
    ];

    useEffect(() => {
        if (!aberto) return;

        async function carregarServicos() {
            try {
                const dados = await listarServicos();
                setServicos(dados);
            } catch (erro) {
                setErro(erro.message);
            }
        }

        carregarServicos();
    }, [aberto]);

    useEffect(() => {
        if (!aberto) return;

        function fecharComEsc(evento) {
            if (evento.key === 'Escape') {
                onFechar();
            }
        }

        document.addEventListener('keydown', fecharComEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', fecharComEsc);
            document.body.style.overflow = '';
        };
    }, [aberto, onFechar]);

    if (!aberto) return null;

    function continuar() {
        if (!servicoSelecionado || !data || !horario) {
            setErro('Selecione um serviço, uma data e um horário.');
            return;
        }

        setErro(
            'Suas escolhas foram selecionadas! A confirmação do agendamento será conectada ao sistema na próxima etapa.'
        );
    }

    return (
        <div className="booking-overlay" onClick={onFechar}>
            <section
                className="booking-modal"
                onClick={(evento) => evento.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="booking-title"
            >
                <button
                    type="button"
                    className="booking-close"
                    onClick={onFechar}
                    aria-label="Fechar agendamento"
                >
                    <X size={22} />
                </button>

                <div className="booking-header">
                    <div className="booking-icon">
                        <PawPrint size={25} />
                    </div>

                    <p className="booking-eyebrow">Cuidado especial para seu pet</p>
                    <h2 id="booking-title">Agende um horário</h2>
                    <p>Escolha o serviço e encontre o melhor momento para vocês.</p>
                </div>

                <div className="booking-content">
                    <div className="booking-section">
                        <h3>1. Escolha o serviço</h3>

                        {servicos.length === 0 && !erro && (
                            <p className="booking-muted">Carregando serviços...</p>
                        )}

                        <div className="booking-services">
                            {servicos.map((servico) => (
                                <button
                                    type="button"
                                    key={servico.id}
                                    className={`booking-service ${
                                        servicoSelecionado?.id === servico.id
                                            ? 'selecionado'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setServicoSelecionado(servico);
                                        setErro('');
                                    }}
                                >
                                    <span>{servico.nome}</span>
                                    <strong>
                                        {Number(servico.valor).toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </strong>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="booking-section">
                        <h3>
                            <CalendarDays size={18} />
                            2. Escolha a data
                        </h3>

                        <input
                            type="date"
                            className="booking-input"
                            min={new Date().toLocaleDateString('en-CA')}
                            value={data}
                            onChange={(evento) => {
                                setData(evento.target.value);
                                setErro('');
                            }}
                        />
                    </div>

                    <div className="booking-section">
                        <h3>
                            <Clock size={18} />
                            3. Escolha o horário desejado
                        </h3>

                        <div className="booking-times">
                            {horarios.map((hora) => (
                                <button
                                    type="button"
                                    key={hora}
                                    className={`booking-time ${
                                        horario === hora ? 'selecionado' : ''
                                    }`}
                                    onClick={() => {
                                        setHorario(hora);
                                        setErro('');
                                    }}
                                >
                                    {hora}
                                </button>
                            ))}
                        </div>
                        <p className="booking-muted">
                            Os horários são opções iniciais e ainda não representam disponibilidade confirmada.
                        </p>
                    </div>

                    <div className="booking-section">
                        <h3>
                            <UserRound size={18} />
                            4. Preferência de profissional
                        </h3>

                        <select
                            className="booking-input"
                            value={profissional}
                            onChange={(evento) => setProfissional(evento.target.value)}
                        >
                            <option>Sem preferência</option>
                        </select>
                    </div>

                    {erro && <p className="booking-error">{erro}</p>}

                    <button
                        type="button"
                        className="booking-submit"
                        onClick={continuar}
                    >
                        Continuar
                    </button>
                </div>
            </section>
        </div>
    );
}

export default BookingModal;
