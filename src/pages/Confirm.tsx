import { useRef, useState } from "react";

function Confirm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [count, setCount] = useState(1);
  const [size, setSize] = useState({ width: 80, height: 40 });
  const [isMax, setMax] = useState(false);
  const [success, setSuccess] = useState(false);
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

  return (
    <div style={{ backgroundColor: "white", color: "black" }}>
      <p>Do you want to be my valentine?</p>

      <div
        ref={containerRef}
        style={{
          color: "black",
          padding: ".5rem",
          width: "1200px",
          height: "800px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {success ? (
          <h1>Success!</h1>
        ) : (
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              justifyContent: "center",
              height: "100%",
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
              onClick={() => setSuccess(true)}
            >
              Yes
            </button>
            {!isMax && (
              <button
                onClick={handleNoClick}
                style={{ height: "fit-content", backgroundColor: "red" }}
              >
                {nopeText[count] ?? "No"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Confirm;
