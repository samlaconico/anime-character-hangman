type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
};

export function HangmanWord({ guessedLetters, wordToGuess }: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".10em",
        fontSize: "6rem",
        fontWeight: "normal",
        textTransform: "uppercase",
        fontFamily: "sans-serif",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={letter}>
          <span
            style={{
              visibility: guessedLetters.includes(letter)
                ? "visible"
                : "hidden",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
