import characterFront from "@assets/images/character/front.png";
import characterFrontRight from "@assets/images/character/front_right.png";
import characterLeft from "@assets/images/character/left.png";
import characterLeftRight from "@assets/images/character/left_right.png";
import characterRight from "@assets/images/character/right.png";
import characterRightRight from "@assets/images/character/right_right.png";
import characterBack from "@assets/images/character/back.png";
import characterBackRight from "@assets/images/character/back_right.png";

const init: { [key: string]: HTMLImageElement } = {};
const imageSrc = {
  characterFront,
  characterFrontRight,
  characterLeft,
  characterLeftRight,
  characterRight,
  characterRightRight,
  characterBack,
  characterBackRight,
};

const CharacterImages = Object.entries(imageSrc).reduce(
  (images, [key, src]) => {
    const image = new Image();
    image.src = src;
    images[key] = image;
    return images;
  },
  init
);

export default CharacterImages;
