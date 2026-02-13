import { useEffect, useRef, useState } from "react";

const WORD = "VALE*";
const MAX_ROWS = 6;
const WORD_LENGTH = 5;

type KeyStatus = "correct" | "present" | "absent" | "";

const KEYS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["ENTER", ..."ZXCVBNM".split(""), "⌫"],
];

export default function WordleApp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [keyStatus, setKeyStatus] = useState<Record<string, KeyStatus>>({});
  const [confirm, setConfirm] = useState(false);
  const [size, setSize] = useState({ width: 80, height: 40 });
  const [isMax, setMax] = useState(false);
  const [count, setCount] = useState(1);

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

  const handleNoClick = () => {
    if (!containerRef.current || !buttonRef.current) return;
    const container = containerRef.current.getBoundingClientRect();

    if (count > 9) {
      setSize({ width: container.width, height: container.height });
      return setMax(true);
    }
    setCount(count + 1);

    const newWidth = Math.min(size.width * 1.2, container.width);
    const newHeight = Math.min(size.height * 1.2, container.height);

    setSize({ width: newWidth, height: newHeight });
  };

  const nopeText = [
    "",
    "No",
    "Are you really sure?",
    "Like… REALLY sure?",
    "This is your final answer?",
    "No take-backs after this 👀",
    "You might want to think again",
    "Bold choice. Very bold.",
    "Last chance to chicken out 🐔",
    "Are you prepared for the consequences?",
    "Past you would question this",
  ];

  const message = "WILL YOU  BE MY?".split("");
  const valentine = "VALENTNE";

  return (
    <div className="wordle-container">
      {gaveUp ? (
        <div className={`wordle-app ${confirm ? "image-bg" : ""}`}>
          <h1 style={{ fontSize: "1.5rem" }}>Wordle</h1>
          <div>
            <div className="board">
              {Array.from({ length: 3 }).map((_, row) => (
                <div key={row} className="row">
                  {Array.from({ length: 5 }).map((_, col) => {
                    const index = row * 5 + col;
                    const letter = message[index] || "";

                    return (
                      <div
                        key={col}
                        className="tile-valentine correct animate-tile"
                      >
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
                  {Array.from({ length: 8 }).map((_, col) => {
                    const index = row * 8 + col;
                    const letter = valentine[index] || "";

                    return (
                      <div
                        key={col}
                        className="tile-valentine correct animate-tile"
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {confirm ? (
            <div>
              <p>It was a pleasure having you as a Valentine date.</p>
            </div>
          ) : (
            <div
              ref={containerRef}
              style={{
                display: "flex",
                gap: ".5rem",
                justifyContent: "center",
                height: "200px",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <button
                ref={buttonRef}
                style={{
                  width: size.width,
                  height: size.height,
                  transition: "width 0.3s ease, height 0.3s ease",
                  cursor: "pointer",
                  backgroundColor: "green",
                }}
                onClick={() => setConfirm(true)}
              >
                Yes
              </button>
              {!isMax && (
                <button
                  onClick={handleNoClick}
                  style={{
                    height: "fit-content",
                    backgroundColor: "red",
                    padding: ".5rem",
                    width: count > 1 ? "auto" : "80px",
                  }}
                >
                  {nopeText[count] ?? "No"}
                </button>
              )}
            </div>
            // <div
            //   ref={containerRef}
            //   className="val-buttons"
            //   style={{
            //     display: "flex",
            //     gap: ".5rem",
            //     justifyContent: "center",
            //     height: "100%",
            //   }}
            // >
            //   <button className="yes" onClick={() => setConfirm(true)}>
            //     YES
            //   </button>
            //   <button
            //     onClick={handleNoClick}
            //     style={{ height: "fit-content", backgroundColor: "red" }}
            //   >
            //     {nopeText[count] ?? "No"}
            //   </button>
            // </div>
          )}
        </div>
      ) : (
        <>
          <div className="wordle-app">
            <h1 style={{ fontSize: "1.5rem" }}>Wordle</h1>

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

            {gameOver && (
              <div className="game-over">
                <p>{guesses.includes(WORD) ? "🎉 You Win!" : `😞 You Lost`}</p>

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
