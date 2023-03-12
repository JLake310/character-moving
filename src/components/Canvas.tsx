import React from "react";
import { Wrapper } from "./Canvas.style";
import useCanvas from "@hooks/useCanvas";
import mapBackground from "@public/images/map_background.jpeg";

const WIDTH = 1000;
const HEIGHT = 700;

const Canvas = () => {
  const canvasRef = useCanvas((canvas) => {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    // canvas.style.background = `url(${mapBackground})`;
  });

  return (
    <Wrapper>
      <canvas ref={canvasRef} />
    </Wrapper>
  );
};

export default Canvas;
