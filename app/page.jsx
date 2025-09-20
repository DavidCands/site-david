import Image from 'next/image'

export default function Home() {
  return (
    <section className="hero">
      <div className="card">
        <div className="left">
          <Image
            src="/minha-foto.jpg"
            alt="Minha foto"
            width={220}
            height={220}
            className="avatar"
          />
        </div>

        <div className="right">
          <h1>David Cândido de Souza</h1>
          <p className="bio">
            Sou um estudante do curso de Ciência da Computação da Universidade Católica,
            gosto de programar e estou sempre em busca de aprender algo novo. Gosto de
            transformar ideias em projetos práticos e explorar diferentes áreas da computação.
          </p>
          <div className="skills">
            <span>Linguagens: </span>
            <span>JavaScript, </span>
            <span>React, </span>
            <span>Next.js, </span>
            <span>CSS, </span>
            <span>Java e </span>
            <span>Python</span>
          </div>
          <a className="cta" href="/hangman">
            Ir para o Jogo da Forca →
          </a>
        </div>
      </div>

      <section className="projects">
        <h2>Projetos</h2>
        <div className="project-grid">
          <article className="project">
            <h3>Projeto: Sistema de Clínica (Java)</h3>
            <p>
              Gerenciamento de consultas e usuários, com lógica para descontos e
              agendamentos.
            </p>
          </article>
          <article className="project">
            <h3>Projeto: Pedidos para Restaurante (JS)</h3>
            <p>
              Aplicação frontend para controle de pedidos com remoção de quantidades
              e descontos.
            </p>
          </article>
        </div>
      </section>
    </section>
  )
}
