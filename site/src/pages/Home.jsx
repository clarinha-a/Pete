import {
    ArrowRight,
    Heart,
    CalendarDays,
    ShieldCheck,
    Truck,
} from 'lucide-react'

function Home() {
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

                                <a
                                    href="#agendamento"
                                    className="inline-flex items-center gap-3 bg-terracota hover:bg-terracota-hover text-creme px-6 py-4 rounded-full font-semibold text-sm shadow-lg shadow-terracota/20 transition-all hover:-translate-y-1"
                                >
                                    Agendar agora

                                    <ArrowRight size={18} />
                                </a>

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

        </main>
    )
}

export default Home