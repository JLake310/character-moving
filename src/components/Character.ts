import CharacterImages from "./CharacterImages";
import throttle from "./throttle";

interface Position {
  x: number;
  y: number;
}

enum Direction {
  FRONT = 0,
  BACK = 1,
  LEFT = 2,
  RIGHT = 3,
}

const SIZE = 64;

class Character {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private position: Position = { x: 0, y: 0 };
  private direction: number = Direction.FRONT;
  private frameDelay = 0;
  private frameCount = 0;

  constructor(canvas: HTMLCanvasElement, frameRate: number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.frameDelay = frameRate / 3;
    this.runAnimationFrame();
  }

  private runAnimationFrame() {
    this.draw(++this.frameCount < this.frameDelay);
    requestAnimationFrame(this.runAnimationFrame.bind(this));
  }

  private draw(isDelayIn: boolean) {
    const { x, y } = this.position;
    const image = this.getImageByDirection(this.direction, isDelayIn);

    if (!this.ctx || !image) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(image, x, y, SIZE, SIZE);
  }

  private getImageByDirection(direction: number, isWalking: boolean) {
    const {
      characterFront,
      characterFrontRight,
      characterLeft,
      characterLeftRight,
      characterRight,
      characterRightRight,
      characterBack,
      characterBackRight,
    } = CharacterImages;

    switch (direction) {
      case Direction.BACK:
        return isWalking ? characterBackRight : characterBack;
      case Direction.FRONT:
        return isWalking ? characterFrontRight : characterFront;
      case Direction.LEFT:
        return isWalking ? characterLeftRight : characterLeft;
      case Direction.RIGHT:
        return isWalking ? characterRightRight : characterRight;
      default:
        return null;
    }
  }

  hadleArrowKeyDown() {
    const distance = SIZE;
    const ArrowKeys = [
      {
        code: "38",
        string: "ArrowUp",
        direction: Direction.BACK,
        movement: { x: 0, y: -distance },
        isMoveable: () => this.position.y > 0,
      },
      {
        code: "40",
        string: "ArrowDown",
        direction: Direction.FRONT,
        movement: { x: 0, y: distance },
        isMoveable: () => this.position.y < this.canvas.height - SIZE,
      },
      {
        code: "39",
        string: "ArrowRight",
        direction: Direction.RIGHT,
        movement: { x: distance, y: 0 },
        isMoveable: () => this.position.x < this.canvas.width - SIZE,
      },
      {
        code: "37",
        string: "ArrowLeft",
        direction: Direction.LEFT,
        movement: { x: -distance, y: 0 },
        isMoveable: () => this.position.x > 0,
      },
    ];

    const handler = throttle((e: KeyboardEvent) => {
      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, string, direction, movement, isMoveable } = ArrowKeys[i];
        if ([code.toString(), string].includes(e.key) && isMoveable()) {
          this.position.x += movement.x;
          this.position.y += movement.y;
          this.direction = direction;
        }
        this.frameCount = 0;
      }
    }, 200);

    return (e: KeyboardEvent) => handler(e);
  }
}

export default Character;
