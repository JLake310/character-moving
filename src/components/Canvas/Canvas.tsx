import React, { useEffect } from "react";
import { Wrapper } from "./Canvas.style";
import useCanvas from "@hooks/useCanvas";
import mapBackground from "@assets/images/background.jpeg";
import Character from "../../graphics/Character";
import getFrameRate from "../../utils/getFrameRate";

const WIDTH = 1000;
const HEIGHT = 700;

const Canvas = () => {
  let myCharacter: Character | null = null;
  const canvasRef = useCanvas(async (canvas) => {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.background = `url(${mapBackground})`;
    const frameRate = await getFrameRate();
    myCharacter = new Character(canvas, frameRate);
    document.addEventListener("keydown", myCharacter.hadleArrowKeyDown());
  });

  useEffect(() => {
    return () => {
      myCharacter &&
        document.removeEventListener(
          "keydown",
          myCharacter.hadleArrowKeyDown()
        );
    };
  }, []);

  return (
    <Wrapper>
      <canvas ref={canvasRef} />
    </Wrapper>
  );
};

export default Canvas;
