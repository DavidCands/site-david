import './globals.css'

export const metadata = {
  title: 'Meu Portfólio',
  description: 'Portfólio simples com jogo da Forca em Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="site-header">
          <nav className="nav">
            <a href="/" className="logo">Meu Portfólio</a>
            <div className="nav-links">
              <a href="/">Página Inicial</a>
              <a href="/hangman">Jogo da Forca</a>
            </div>
          </nav>
        </header>

        <main className="container">
          {children}
        </main>

        <footer className="site-footer">
          © {new Date().getFullYear()} David Cândido
        </footer>
      </body>
    </html>
  )
}
