import { useState } from "react";

export default function Exercise1() {
  const imgObj = {
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/lychee-fruit-sugar-1530136136.jpg?crop=1xw:1xh;center,top&resize=640:*",
      "https://hips.hearstapps.com/hmg-prod/images/mango-fruit-sugar-1530136260.jpg?crop=1xw:1xh;center,top&resize=640:*",
      "https://hips.hearstapps.com/hmg-prod/images/cherries-sugar-fruit-1530136329.jpg?crop=1xw:1xh;center,top&resize=640:*",
    ],
    currentImg: 0,
  };
  const [images, setImages] = useState(imgObj);
  function shiftImageBack(imgNum) {
    let newImgObj = { ...images, currentImg: imgNum - 1 };
    console.log(newImgObj.currentImg);
    setImages(newImgObj);
  }
  function shiftImageForward(imgNum) {
    let newImgObj = { ...images, currentImg: imgNum + 1 };
    console.log(newImgObj.currentImg);
    setImages(newImgObj);
  }

  return (
    <div>
      {images.currentImg !== 0 ? (
        <button onClick={() => shiftImageBack(images.currentImg)}>
          Previous
        </button>
      ) : null}
      <img src={images.images[images.currentImg]} />
      {images.currentImg !== images.images.length - 1 ? (
        <button onClick={() => shiftImageForward(images.currentImg)}>
          Forward
        </button>
      ) : null}
    </div>
  );
}
