import React, { useEffect, useRef } from "react";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from "matter-js";
import styled from "styled-components";

export const PingPongGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.log("!canvas");
      // Handle the case where canvasRef.current is null
      return;
    }

    // Create Matter.js engine
    const engine = Engine.create();

    // Create the renderer with a valid HTML element
    const render = Render.create({
      canvas: canvas, // Use the HTML canvas element
      engine: engine,
    });
    var boxA = Bodies.rectangle(0, 0, 80, 80);
    var boxB = Bodies.rectangle(400, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });
    Composite.add(engine.world, [boxA, boxB, ground, mouseConstraint]);
    // Composite.add(engine.world, mouseConstraint);
    // ... Rest of your code for creating game elements and physics

    // Start the Matter.js engine and render loop
    canvas.addEventListener("mousemove", (event) => {
      console.log(event);
      // Get the mouse position relative to the canvas
      const canvasRect = canvas.getBoundingClientRect();
      console.log(canvasRect);
      // Calculate the mouse position relative to the canvas
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;

      // Update the position of boxA based on the mouse position
      Body.setPosition(boxA, { x: mouseX, y: mouseY });
    });
    Render.run(render);
    var runner = Runner.create();

    // run the engine
    // Runner.run(runner, engine);

    return () => {
      // Cleanup if needed
      //   Render.stop(render);
      //   Render.run(render);
    };
  }, []);

  return <Canvas ref={canvasRef}></Canvas>;
};

const Canvas = styled.canvas`
  width: 100%;
`;
