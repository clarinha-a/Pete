import {
  PawPrint,
  UserRound,
  ShoppingBag,
} from 'lucide-react'

function Header() {
  return (
    <header className="">

      {/* Barra de promoções */}
      <div className="bg-marrom-principal text-creme text-center h-10 flex items-center justify-center gap-16">
        <span className="font-semibold text-[16px]">
          Frete grátis para compras acima de R$ 149
        </span>

        <span className="mx-32 text-bege-pessego text-[16px]">•</span>

        <span className="font-semibold text-[16px]">
          Primeira consulta com 15% OFF
        </span>
      </div>

      {/* Navegação */}
      <div className="bg-areia mt-7">
        <div className=" px-6 py-5">

          <div className="flex items-center justify-around">

            {/* Logo */}
            <a
              href="#inicio"
              className="flex items-center gap-3"
            >
              <div className="bg-terracota text-creme w-11 h-11 rounded-full flex items-center justify-center">
                <PawPrint size={21} />
              </div>

              <span className="text-marrom-principal text-2xl font-bold">
                Petê
              </span>
            </a>

            {/* Menu */}
            <nav className="hidden md:flex items-center gap-8 text-marrom-escuro font-medium text-sm">

              <a
                href="#servicos"
                className="hover:text-terracota transition-colors"
              >
                Serviços
              </a>

              <a
                href="#loja"
                className="hover:text-terracota transition-colors"
              >
                Loja
              </a>

              <a
                href="#cuidados"
                className="hover:text-terracota transition-colors"
              >
                Cuidados
              </a>

              <a
                href="#contato"
                className="hover:text-terracota transition-colors"
              >
                Contato
              </a>

            </nav>

            {/* Ações */}
            <div className=" gap-5">

              {/* Usuário */}
              <button
                aria-label="Minha conta"
                className="text-marrom-escuro hover:text-terracota transition-colors"
              >
                <UserRound size={21} />
              </button>

              {/* Sacola */}
              <button
                aria-label="Sacola"
                className="relative text-marrom-escuro hover:text-terracota transition-colors"
              >
                <ShoppingBag size={21} />

                <span className="absolute -top-2 -right-2 bg-terracota text-creme text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Agendamento */}
              <a
                href="#agendamento"
                className="hidden sm:inline-flex bg-terracota hover:bg-terracota-hover text-creme px-10 py-4 rounded-full font-semibold text-sm shadow-lg shadow-terracota/20 transition-all hover:-translate-y-0.5"
              >
                Agendar serviço
              </a>

            </div>

          </div>
        </div>
      </div>

    </header>
  )
}

export default Header