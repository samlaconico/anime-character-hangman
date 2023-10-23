import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  //console.log(randomNum);

  const [randomPage, setRandomPage] = useState(
    Math.floor(Math.random() * 3) + 1
  );
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 25));
  const [image, setImage] = useState("");

  const getAnimeWord = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/characters?page=${randomPage}&limit=25`
    ).then((res) => res.json());

    const tempImage: string = temp.data[randomNum].images.jpg.image_url;
    setImage(tempImage);
    console.log(image);

    //console.log(temp.data[0].name);
    console.log(temp.data);

    setWordToGuess(temp.data[randomNum].name.toLowerCase().replace(/\./g, ""));
  };

  useEffect(() => {
    getAnimeWord();
  }, []);

  const [wordToGuess, setWordToGuess] = useState("loading");
  const [guessLetters, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const [animeWord, setAnimeWord] = useState([]);

  const [isWin, setIsWin] = useState(false);
  const isLose = inCorrectLetters.length >= 6;

  useEffect(() => {
    setIsWin(
      wordToGuess
        .replace(/\s/g, "")
        .split("")
        .every((letter) => guessLetters.includes(letter))
    );
    //console.log(isWin);
  }, [wordToGuess, guessLetters]);

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessLetters.includes(letter) || isLose || isWin) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessLetters, isLose, isWin]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessLetters]);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
          color: isWin || isLose ? "black" : "white",
        }}
      >
        {isWin || isLose ? "" : "Blank!"}
        {isWin && "Winner!"} {isLose && "Loser!"}
      </div>

      <div style={{ display: "flex" }}>
        <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />

        {isWin || isLose ? (
          <img
            src={image}
            style={{ paddingLeft: "100px", height: "400px" }}
          ></img>
        ) : (
          <></>
        )}
      </div>
      <HangmanWord
        wordToGuess={wordToGuess}
        guessedLetters={guessLetters}
        reveal={isLose}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          activeLetters={guessLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
          disabled={isLose || isWin}
        />
      </div>
    </div>
  );
}

export default App;
