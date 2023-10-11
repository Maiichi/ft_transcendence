import React, { useEffect, useRef } from "react";

const CanvasGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Create Matter.js engine, render, and world here
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default CanvasGame;
