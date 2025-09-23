"use client";
import "./style.css";
import React, { useEffect, useState } from "react";

const WORDS = [
  "Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard",
  "Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree",
  "Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate",
  "Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash",
  "Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy",
  "Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat",
  "Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth",
  "Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape",
  "Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra", "Alakazam",
  "Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool",
  "Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke", "Slowbro",
  "Magnemite","Magneton","Farfetchd","Doduo","Dodrio","Seel","Dewgong","Grimer",
  "Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee", "Hypno",
  "Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone",
  "Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn", "Rhydon",
  "Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu",
  "Starmie","MrMime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros", "Magikarp",
  "Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon",
  "Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno",
  "Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"
];

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
}

export default function HangmanPage() {
  const maxWrong = 6;
  const [word, setWord] = useState(() => pickWord());
  const [guessed, setGuessed] = useState([]); // letras chutadas
  const [wrong, setWrong] = useState(0); // Número de erros
  const [status, setStatus] = useState("playing"); // Playing | won | lost
  const [input, setInput] = useState("");

  const letters = word.split("");
  const display = letters.map((l) => (guessed.includes(l) ? l : "_"));
  const correctLetters = guessed.filter((l) => letters.includes(l));
  const wrongLetters = guessed.filter((l) => !letters.includes(l));

  useEffect(() => {
    // verifica vitória ou derrota sempre que guessed/wrong mudam
    if (letters.length && letters.every((l) => guessed.includes(l))) {
      setStatus("won");
    } 
    else if (wrong >= maxWrong) {
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
    if (status !== "playing"){
      return;
    }
    letter = String(letter).toUpperCase();

    if (!/^[A-Z]$/.test(letter)) {
      return; // só letras A-Z
    }

    if (guessed.includes(letter)) {
      return; // já chutou
    }

    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);

    const newWrong = newGuessed.filter((l) => !letters.includes(l)).length;
    setWrong(newWrong);

    // checagem imediata (useEffect também cobre)
    if (letters.every((l) => newGuessed.includes(l))) {
      setStatus("won");
    }
    else if (newWrong >= maxWrong) {
      setStatus("lost");
    }
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
          <div className="titulo">
            <h2>JOGO DA FORCA</h2>
          </div>
          <p className="hint">Dica: Pokemons da Primeira Geração.</p>

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
                Parabéns, você acertou! O Pokémon era <strong>{word}</strong>
              </p>
            )}
            {status === "lost" && (
              <p className="lose">
                Fim de jogo! O Pokémon era <strong>{word}</strong>
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
            <div className="tentativa_Anterior">
              <h3>Tentativas Anteriores</h3>
            </div>
            <div className="list">
              <div className="corretas">
                <strong>Corretas:</strong> {correctLetters.join(", ") || "—"}
              </div>
              <div className="erradas">
                <strong>Erradas:</strong> {wrongLetters.join(", ") || "—"}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="regras">
              <h3>Regras!</h3>
            </div>
            <ol>
              <li>
                Você perde se errar <strong>{maxWrong}</strong> vezes.
              </li>
              <li>Digite uma letra por vez ou use o teclado acima.</li>
              <li>Reinicie para começar com uma palavra aleatória.</li>
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}
