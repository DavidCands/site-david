"use client";

import React, { useEffect, useState } from "react";

const WORDS = [
  "REACT","JAVASCRIPT","NEXTJS","PROGRAMA","COMPILADOR","ALGORITMO",
  "ESTRUTURA","DADOS","FUNCAO","OBJETO","VARIAVEL","COMPONENTE",
  "DEBUG","VSCODE","GITHUB","DESAFIO","TESTE","FRAMEWORK","NPM","NODE",
  "SERVIDOR","CLIENTE","RESPONSIVO","ASSINCRONO","HOOKS","ESTILO","CSS",
  "HTML","PORTFOLIO","CURRICULO"
];

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

export default function HangmanPage() {
  const maxWrong = 6;
  const [word, setWord] = useState(() => pickWord());
  const [guessed, setGuessed] = useState([]); // letras chutadas
  const [wrong, setWrong] = useState(0); // número de erros
  const [status, setStatus] = useState("playing"); // playing | won | lost
  const [input, setInput] = useState("");

  const letters = word.split("");
  const display = letters.map((l) => (guessed.includes(l) ? l : "_"));
  const correctLetters = guessed.filter((l) => letters.includes(l));
  const wrongLetters = guessed.filter((l) => !letters.includes(l));

  useEffect(() => {
    // verifica vitória ou derrota sempre que guessed/wrong mudam
    if (letters.length && letters.every((l) => guessed.includes(l))) {
      setStatus("won");
    } else if (wrong >= maxWrong) {
      setStatus("lost");
    }
  }, [guessed, wrong, letters]);

  function restart() {
    setWord(pickWord());
    setGuessed([]);
    setWrong(0);
    setInput("");
    setStatus("playing");
  }

  function handleGuess(letter) {
    if (status !== "playing") return;
    letter = String(letter).toUpperCase();
    if (!/^[A-Z]$/.test(letter)) return; // só letras A-Z
    if (guessed.includes(letter)) return; // já chutou

    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);

    const newWrong = newGuessed.filter((l) => !letters.includes(l)).length;
    setWrong(newWrong);

    // checagem imediata (useEffect também cobre)
    if (letters.every((l) => newGuessed.includes(l))) setStatus("won");
    else if (newWrong >= maxWrong) setStatus("lost");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;
    handleGuess(input[0]);
    setInput("");
  }

  return (
    <section className="hangman-wrap">
      <div className="game">
        <div className="left">
          <h2>Jogo da Forca</h2>
          <p className="hint">Dica: palavras relacionadas à programação</p>

          <div className="gallows">
            <svg viewBox="0 0 120 140" className="gallow-svg" role="img" aria-label="Forca">
              {/* base e estrutura */}
              <line x1="10" y1="130" x2="110" y2="130" strokeWidth="3" stroke="#cbd5e1" />
              <line x1="30" y1="130" x2="30" y2="10" strokeWidth="3" stroke="#cbd5e1" />
              <line x1="30" y1="10" x2="80" y2="10" strokeWidth="3" stroke="#cbd5e1" />
              <line x1="80" y1="10" x2="80" y2="25" strokeWidth="3" stroke="#cbd5e1" />

              {/* partes do boneco aparecem conforme `wrong` */}
              {wrong > 0 && <circle cx="80" cy="35" r="10" strokeWidth="2" stroke="#cbd5e1" fill="none" />}
              {wrong > 1 && <line x1="80" y1="45" x2="80" y2="75" strokeWidth="2" stroke="#cbd5e1" />}
              {/* left arm */}
              {wrong > 2 && <line x1="80" y1="55" x2="65" y2="65" strokeWidth="2" stroke="#cbd5e1" />}
              {/* right arm */}
              {wrong > 3 && <line x1="80" y1="55" x2="95" y2="65" strokeWidth="2" stroke="#cbd5e1" />}
              {/* left leg */}
              {wrong > 4 && <line x1="80" y1="75" x2="70" y2="95" strokeWidth="2" stroke="#cbd5e1" />}
              {/* right leg */}
              {wrong > 5 && <line x1="80" y1="75" x2="92" y2="95" strokeWidth="2" stroke="#cbd5e1" />}
            </svg>
          </div>

          <div className="word-display" aria-live="polite">
            {display.map((c, i) => (
              <span key={i} className={`char ${c === "_" ? "hidden" : "shown"}`}>
                {c}
              </span>
            ))}
          </div>

          <div className="status">
            {status === "playing" && (
              <p>
                Tentativas restantes: <strong>{maxWrong - wrong}</strong>
              </p>
            )}
            {status === "won" && (
              <p className="win">
                Parabéns — você acertou! A palavra era <strong>{word}</strong>
              </p>
            )}
            {status === "lost" && (
              <p className="lose">
                Fim de jogo — a palavra era <strong>{word}</strong>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="guess-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z]/g, ""))}
              maxLength={1}
              placeholder="Digite uma letra"
              disabled={status !== "playing"}
            />
            <button type="submit" disabled={status !== "playing"}>
              Chutar
            </button>
            <button type="button" onClick={restart}>
              Reiniciar
            </button>
          </form>

          <div className="keyboard">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
              <button
                key={l}
                onClick={() => handleGuess(l)}
                disabled={guessed.includes(l) || status !== "playing"}
                className={guessed.includes(l) ? (letters.includes(l) ? "correct" : "wrong") : ""}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <aside className="right">
          <div className="panel">
            <h3>Tentativas Anteriores</h3>
            <div className="list">
              <div>
                <strong>Corretas:</strong> {correctLetters.join(", ") || "—"}
              </div>
              <div>
                <strong>Erradas:</strong> {wrongLetters.join(", ") || "—"}
              </div>
            </div>
          </div>

          <div className="panel">
            <h3>Regras</h3>
            <ol>
              <li>
                Você tem até <strong>{maxWrong}</strong> erros.
              </li>
              <li>Digite uma letra por vez ou use o teclado abaixo.</li>
              <li>Reinicie para começar com palavra aleatória.</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
