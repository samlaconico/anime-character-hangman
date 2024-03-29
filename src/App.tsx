import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [randomPage, setRandomPage] = useState(
    Math.floor(Math.random() * 4) + 1
  );
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 25));
  const [image, setImage] = useState("");
  const [wordToGuess, setWordToGuess] = useState("loading");
  const [guessLetters, setGuessedLetters] = useState<string[]>([]);
  const [animeWord, setAnimeWord] = useState([]);
  const [isWin, setIsWin] = useState(false);

  const getAnimeWord = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/characters?page=${randomPage}&limit=25`
    ).then((res) => res.json());

    const tempImage: string = temp.data[randomNum].images.jpg.image_url;
    setImage(tempImage);
    setWordToGuess(temp.data[randomNum].name.toLowerCase().replace(/\./g, ""));
  };

  useEffect(() => {
    getAnimeWord();
  }, []);

  const inCorrectLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const isLose = inCorrectLetters.length >= 6;

  useEffect(() => {
    setIsWin(
      wordToGuess
        .replace(/\s/g, "")
        .split("")
        .every((letter) => guessLetters.includes(letter))
    );
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
          fontFamily: "sans-serif",
          fontWeight: "bold",
          fontSize: "2rem",
          textAlign: "center",
          color: "oldlace",
          paddingTop: isWin || isLose ? "10px" : "47px",
        }}
      >
        {isWin && "You Win!"} {isLose && "You Lose!"}
      </div>

      <div style={{ display: "flex" }}>
        <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />

        {isWin || isLose ? (
          <img
            src={image}
            style={{
              marginLeft: "100px",
              height: "400px",
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: "oldlace",
            }}
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
