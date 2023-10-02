import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function App() {
  const [wordToGuess, setWordToGuess] = useState("test");
  const [guessLetters, setGuessedLetters] = useState<string[]>([]);
  const inCorrectLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLose = inCorrectLetters.length >= 6;
  const isWin = wordToGuess
    .split("")
    .every((letter) => guessLetters.includes(letter));

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
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {" "}
        {isWin && "Winner!"} {isLose && "Loser!"}
      </div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
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
