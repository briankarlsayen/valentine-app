import { useEffect, useState } from "react";

const WORD = "REACT";
const MAX_ROWS = 6;
const WORD_LENGTH = 5;

type KeyStatus = "correct" | "present" | "absent" | "";

const KEYS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["ENTER", ..."ZXCVBNM".split(""), "⌫"],
];

export default function WordleApp() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [keyStatus, setKeyStatus] = useState<Record<string, KeyStatus>>({});
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.key === "Enter") handleInput("ENTER");
      else if (e.key === "Backspace") handleInput("⌫");
      else if (/^[a-zA-Z]$/.test(e.key)) handleInput(e.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, guesses, gameOver]);

  const handleInput = (key: string) => {
    if (gameOver) return;

    if (key === "ENTER") {
      if (current.length !== WORD_LENGTH) return;
      const next = [...guesses, current];
      setGuesses(next);
      updateKeyStatus(current);

      if (current === WORD || next.length === MAX_ROWS) setGameOver(true);
      setCurrent("");
      return;
    }

    if (key === "⌫") {
      setCurrent((prev) => prev.slice(0, -1));
      return;
    }

    if (current.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrent((prev) => prev + key);
    }
  };

  const updateKeyStatus = (guess: string) => {
    const status: Record<string, KeyStatus> = { ...keyStatus };

    for (let i = 0; i < guess.length; i++) {
      const l = guess[i];
      if (WORD[i] === l) status[l] = "correct";
      else if (WORD.includes(l) && status[l] !== "correct")
        status[l] = "present";
      else if (!status[l]) status[l] = "absent";
    }

    setKeyStatus(status);
  };

  const message = "WILL YOU  BE MY?".split("");
  const valentine = "VALENTINE?";

  return (
    <div className={`wordle-container ${confirm ? "image-bg" : ""}`}>
      {gaveUp ? (
        <div className="wordle-app">
          <h1>Wordle</h1>

          <div className="board">
            {Array.from({ length: 3 }).map((_, row) => (
              <div key={row} className="row">
                {Array.from({ length: 5 }).map((_, col) => {
                  const index = row * 5 + col;
                  const letter = message[index] || "";

                  return (
                    <div key={col} className="tile correct">
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="board">
            {Array.from({ length: 1 }).map((_, row) => (
              <div key={row} className="row">
                {Array.from({ length: 10 }).map((_, col) => {
                  const index = row * 10 + col;
                  const letter = valentine[index] || "";

                  return (
                    <div key={col} className="tile correct">
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="val-buttons">
            <button className="yes" onClick={() => setConfirm(true)}>
              YES 💖
            </button>
            <button className="no">NO 💔</button>
          </div>

          {confirm && (
            <div>
              <p>It was a pleasure having you as a Valentine date.</p>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="wordle-app">
            <h1>Wordle</h1>

            <div className="board">
              {Array.from({ length: MAX_ROWS }).map((_, row) => {
                const word =
                  guesses[row] || (row === guesses.length ? current : "");

                return (
                  <div key={row} className="row">
                    {Array.from({ length: WORD_LENGTH }).map((_, col) => {
                      const letter = word[col] || "";
                      let className = "tile";

                      if (guesses[row]) {
                        if (letter === WORD[col]) className += " correct";
                        else if (WORD.includes(letter)) className += " present";
                        else className += " absent";
                      }

                      return (
                        <div key={col} className={className}>
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {!gameOver && (
              <div className="keyboard">
                {KEYS.map((row, i) => (
                  <div key={i} className="key-row">
                    {row.map((k) => (
                      <button
                        key={k}
                        className={`key ${keyStatus[k] || ""}`}
                        onClick={() => handleInput(k)}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {gameOver && (
              <div className="game-over">
                <p>
                  {guesses.includes(WORD)
                    ? "🎉 You Win!"
                    : `😞 You Lost — Word was ${WORD}`}
                </p>

                <div className="game-buttons">
                  <button onClick={() => window.location.reload()}>
                    Play Again
                  </button>
                  <button className="giveup" onClick={() => setGaveUp(true)}>
                    Give Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
