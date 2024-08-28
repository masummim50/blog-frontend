import React, { useState } from "react";

const images = [
  {
    link: "/game/0.jpg",
    id: 0,
  },
  {
    link: "/game/1.jpg",
    id: 1,
  },
  {
    link: "/game/2.jpg",
    id: 2,
  },
  {
    link: "/game/3.jpg",
    id: 3,
  },
  {
    link: "/game/4.jpg",
    id: 4,
  },
  {
    link: "/game/5.jpg",
    id: 5,
  },
  {
    link: "/game/6.jpg",
    id: 6,
  },
  {
    link: "/game/7.jpg",
    id: 7,
  },
  {
    link: "/game/8.jpg",
    id: 8,
  },
  {
    link: "/game/9.jpg",
    id: 9,
  },
  {
    link: "/game/10.jpg",
    id: 10,
  },
  {
    link: "/game/11.jpg",
    id: 11,
  },
  {
    link: "/game/12.jpg",
    id: 12,
  },
  {
    link: "/game/13.jpg",
    id: 13,
  },
  {
    link: "/game/14.jpg",
    id: 14,
  },
  {
    link: "/game/15.jpg",
    id: 15,
  },
  {
    link: "/game/16.jpg",
    id: 16,
  },
  {
    link: "/game/17.jpg",
    id: 17,
  },
  {
    link: "/game/18.jpg",
    id: 18,
  },
  {
    link: "/game/19.jpg",
    id: 19,
  },
  {
    link: "/game/20.jpg",
    id: 20,
  },
  {
    link: "/game/21.jpg",
    id: 21,
  },
  {
    link: "/game/22.jpg",
    id: 22,
  },
  {
    link: "/game/23.jpg",
    id: 23,
  },
  {
    link: "/game/24.jpg",
    id: 24,
  },
  {
    link: "/game/25.jpg",
    id: 25,
  },
  {
    link: "/game/26.jpg",
    id: 26,
  },
  {
    link: "/game/27.jpg",
    id: 27,
  },
  {
    link: "/game/28.jpg",
    id: 28,
  },
  {
    link: "/game/29.jpg",
    id: 29,
  },
  {
    link: "/game/30.jpg",
    id: 30,
  },
  {
    link: "/game/31.jpg",
    id: 31,
  },
];

const getRandomValue = () => {
  let random = Math.floor(Math.random() * 100);
  if (random > 63) {
    random = random - 63;
  }
  return random;
};

const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const first = getRandomValue();
    const second = getRandomValue();
    const copyOfFirst = arr[first];
    arr[first] = arr[second];
    arr[second] = copyOfFirst;
  }
  return arr;
};

const double = shuffle([...images, ...images]);
const GameHomePage = () => {
  // handle click logic:
  // 1. check if first click or second click, if first click set the image id to the state,
  // 2. if second click, check if prev and curr match,
  // 3. if match score ++ and set the images with the id index to null
  // 4. if not match, remove the prev set image

  type clickType = {
    id: number | null;
    index: number | null;
  };
  type stateType = {
    first: clickType;
    second: clickType;
  };
  const [clicked, setClicked] = useState<stateType>({
    first: { id: null, index: null },
    second: { id: null, index: null },
  });

  const handleClick = (
    imageObject: { src: string; id: number },
    index: number
  ) => {
    if (clicked.first.id && clicked.first.index) {
      // if second click
      setClicked((prev) => {
        return { ...prev, second: { id: imageObject.id, index } };
      });
      // second

      if (clicked.first.id === imageObject.id) {
        copy[clicked.first.index] = null;
        copy[index] = null;
      } else {
        setClicked({
          first: { id: null, index: null },
          second: { id: null, index: null },
        });
      }
    } else {
      setClicked((prev) => {
        return { ...prev, first: { id: imageObject.id, index } };
      });
    }
  };

  // 8 by 8 grid

  // console.log(double);
  const copy = [...double]
  return (
    <div>
      <div className="grid grid-cols-8 gap-2 ">
        {copy.map((img, i) => (
          <img
            onClick={() => handleClick(img, i)}
            key={i}
            className={`h-[10vh] w-full bg-orange-400 rounded-md ${
              (clicked.first.id === img.id && clicked.first.index === i) || (clicked.second.id === img.id && clicked.second.index === i)
                ? "opacity-100"
                : "opacity-25"
            }`}
            src={img.link}
          />
        ))}
      </div>
    </div>
  );
};

export default GameHomePage;
