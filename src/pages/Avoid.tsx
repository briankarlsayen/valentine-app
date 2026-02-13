import { useEffect, useRef, useState } from "react";
import sb2 from "../assets/sb2.gif";
import sb3 from "../assets/sb3.gif";
interface Position {
  x: number;
  y: number;
}

function Avoid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const [noPos, setNoPos] = useState<Position>({ x: 620, y: 474 });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      const container = containerRef.current;
      const noButton = noButtonRef.current;
      if (!container || !noButton) return;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = noButton.getBoundingClientRect();

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const distance = Math.hypot(
        mouseX - buttonCenterX,
        mouseY - buttonCenterY,
      );

      const triggerDistance = 150;

      if (distance < triggerDistance) {
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        setNoPos({ x: newX, y: newY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="page">
      {success ? (
        <div className="container">
          <p>Yey!</p>
          <img
            src={sb3}
            style={{ width: "400px", height: "30 0px", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div ref={containerRef} className="container">
          <img
            src={sb2}
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
          {/* <img
            src={iconImg}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          /> */}
          {/* <h1>Logo</h1> */}
          <div className="question">Will you be my valentine?</div>

          <div style={{ width: "25%", display: "flex" }}>
            <button className="yes-btn" onClick={() => setSuccess(true)}>
              Yes 😊
            </button>
          </div>

          <button
            ref={noButtonRef}
            className="no-btn"
            style={{ left: noPos.x, top: noPos.y }}
          >
            No 😅
          </button>
        </div>
      )}
    </div>
  );
}

export default Avoid;
