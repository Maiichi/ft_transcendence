import React, { useEffect, useRef, useState } from "react";
import {
  Bodies,
  Composite,
  Engine,
  Render,
  Runner,
  Events,
  Body,
  Vector,
} from "matter-js";
import styled from "styled-components";

export const PingPongGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(1);
  const startGame = () => {
    console.log("start game");
    setGameStarted(true);
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWidth = 800;
  const canvasHeight = 600;
  const wallThickness = 20;
  const plankWidth = 20;
  const plankHeight = 100;

  const leftWall = Bodies.rectangle(
    wallThickness / 2,
    canvasHeight / 2,
    wallThickness,
    canvasHeight,
    { isStatic: true, label: "leftWall" }
  );
  const rightWall = Bodies.rectangle(
    canvasWidth - wallThickness / 2,
    canvasHeight / 2,
    wallThickness,
    canvasHeight,
    { isStatic: true, label: "rightWall" }
  );
  const dividerWall = Bodies.rectangle(
    canvasWidth / 2,
    canvasHeight / 2,
    10,
    canvasHeight,
    { isStatic: true, label: "dividerWall" }
  );
  const topWall = Bodies.rectangle(
    canvasWidth / 2,
    wallThickness / 2,
    canvasWidth,
    wallThickness,
    { isStatic: true, label: "topWall" }
  );
  const bottomWall = Bodies.rectangle(
    canvasWidth / 2,
    canvasHeight - wallThickness / 2,
    canvasWidth,
    wallThickness,
    { isStatic: true, label: "bottomWall" }
  );
  const plankA = Bodies.rectangle(
    canvasWidth - plankWidth / 2,
    canvasHeight / 2,
    plankWidth,
    plankHeight,
    { isStatic: true, label: "plankA" }
  );
  const plankB = Bodies.rectangle(
    plankWidth / 2,
    canvasHeight / 2,
    plankWidth,
    plankHeight,
    { isStatic: true, label: "plankB" }
  );

  const ballRadius = 10;

  const ball = Bodies.circle(canvasWidth / 2, canvasHeight / 2, ballRadius, {
    restitution: 1,
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    inertia: 0,
    label: "ball",
  });

  const ballStartPosition = { x: canvasWidth / 2, y: canvasHeight / 2 };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.log("!canvas");
      // Handle the case where canvasRef.current is null
      return;
    }

    const engine = Engine.create();
    Composite.add(engine.world, [leftWall, rightWall, topWall, bottomWall]);
    Composite.add(engine.world, [plankA, plankB]);
    Composite.add(engine.world, ball);

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        background: "transparent",
      },
    });

    var runner = Runner.create();
    if (gameStarted) Runner.run(runner, engine);

    // const ctx = canvas.getContext("2d");
    // if (!ctx) {
    //   console.log("!canvas");
    //   // Handle the case where canvasRef.current is null
    //   return;
    // }
    // ... Other code

    // Render the scores

    const renderScores = () => {
      const ctx = render.context;
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText(`Player A: ${scoreA}`, 20, 40);
      ctx.fillText(`Player B: ${scoreB}`, canvasWidth - 160, 40);
    };
    const renderDivider = () => {
      const ctx = render.context;
      ctx.save(); // Save the current context state
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]); // Set a dotted pattern: 5px on, 5px off
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, 0);
      ctx.lineTo(canvasWidth / 2, canvasHeight);
      ctx.stroke();
      ctx.restore();
    };

    Events.on(render, "afterRender", () => {
      renderScores();
      renderDivider();
    });

    // Keyboard event listeners
    const movePlankSpeed = 5;
    const keys: any = {};
    document.addEventListener("keydown", (event) => {
      keys[event.key] = true;
    });
    document.addEventListener("keyup", (event) => {
      keys[event.key] = false;
    });

    // Add event listener for the spacebar to start the game
    document.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        startGame();
      }
    });

    // Update plank positions based on keyboard input
    Events.on(engine, "beforeUpdate", () => {
      if (keys["ArrowUp"] && plankA.position.y > plankHeight / 2) {
        Body.translate(plankA, Vector.create(0, -movePlankSpeed));
      }
      if (
        keys["ArrowDown"] &&
        plankA.position.y < canvasHeight - plankHeight / 2
      ) {
        Body.translate(plankA, Vector.create(0, movePlankSpeed));
      }
      if (keys["w"] && plankB.position.y > plankHeight / 2) {
        Body.translate(plankB, Vector.create(0, -movePlankSpeed));
      }
      if (keys["s"] && plankB.position.y < canvasHeight - plankHeight / 2) {
        Body.translate(plankB, Vector.create(0, movePlankSpeed));
      }
    });

    // Handle goal scoring and ball reset
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      for (const pair of pairs) {
        if (pair.bodyA === ball && pair.bodyB === leftWall && gameStarted) {
          // Player B scores a goal, reset ball
          setScoreB(scoreB + 1);
          Body.setPosition(ball, ballStartPosition);
        } else if (
          pair.bodyA === ball &&
          pair.bodyB === rightWall &&
          gameStarted
        ) {
          // Player A scores a goal, reset ball
          setScoreA(scoreA + 1);
          Body.setPosition(ball, ballStartPosition);
        }
      }
    });

    Render.run(render);

    return () => {
      Render.stop(render);
    };
  }, [gameStarted, scoreA, scoreB]);

  return <Canvas ref={canvasRef}></Canvas>;
};

const Canvas = styled.canvas`
  width: 90%;
  height: 400px;
`;

export default PingPongGame;
