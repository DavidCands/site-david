export default function Home() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#1f1f1fff"
    }}>
      <img 
        src="/minha-foto.jpg" 
        alt="Minha foto" 
        style={{ borderRadius: "50%", width: "200px", marginBottom: "20px" }} 
      />
      <h1>David Cândido de Souza</h1>
      <p style={{ maxWidth: "400px", textAlign: "center" }}>
        Sou um estudante do curso de Ciência da Computação da Universidade Católica, gosto de programar e estou sempre em busca de aprender algo novo.  
        Gosto de transformar ideias em projetos práticos e explorar diferentes áreas da computação.
      </p>
    </main>
  )
}
