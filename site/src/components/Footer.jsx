import { PawPrint, MapPin, Phone, Clock } from 'lucide-react';
function Footer() {
return (
    <footer className="bg-marrom-principal text-creme">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="bg-terracota w-11 h-11 rounded-full flex items-center justify-center">
                            <PawPrint size={22} />
                        </div>
                        <span className="text-2xl font-bold">Petê</span>
                    </div>

                    <p className="text-creme/75 text-sm leading-relaxed max-w-xs">
                        Cuidado, carinho e atenção para quem faz parte da sua família.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-5">Entre em contato</h3>

                    <div className="space-y-4 text-sm text-creme/80">
                        <p className="flex items-center gap-3">
                            <Phone size={17} />
                            Entre em contato conosco
                        </p>
                        <p className="flex items-center gap-3">
                            <MapPin size={17} />
                            Nossa loja
                        </p>
                        <p className="flex items-center gap-3">
                            <Clock size={17} />
                            Consulte nossos horários
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-5">Conte com a Petê</h3>

                    <p className="text-creme/75 text-sm leading-relaxed mb-5">
                        Estamos aqui para cuidar do seu pet com todo carinho.
                    </p>

                    <a
                        href="/#contato"
                        className="inline-flex bg-terracota hover:bg-terracota-hover text-creme px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                    >
                        Agende um serviço
                    </a>
                </div>

            </div>

            <div className="border-t border-creme/20 mt-12 pt-6 text-center">
                <p className="text-creme/60 text-xs">
                    © {new Date().getFullYear()} Petê. Todos os direitos reservados.
                </p>
            </div>
        </div>
    </footer>
);
}

export default Footer;
