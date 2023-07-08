import { useState, useRef } from "react";
import "./App.css";

interface ChildProps {
  id: string;
}

const videoSpacer = ({ id }: ChildProps) => {
  const [ewCursor, setEwCursor] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).setPointerCapture(event.pointerId);
    setIsResizing(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).releasePointerCapture(event.pointerId);
    setIsResizing(false);
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const border = 10;

    if (videoRef.current && isResizing) {
      videoRef.current.style.width = `${event.clientX - rect.left}px`;
    } else {
      setEwCursor(event.clientX > rect.right - border);
    }
  };

  const classNames = `video-spacer ${ewCursor ? "cursor-ew" : ""}`;
  console.log("render" + id);
  return (
    <div
      ref={videoRef}
      className={classNames}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {id}
    </div>
  );
};

export default videoSpacer;
