type HangmanWordProps = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

export function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "normal",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((letter, index) => (
        <span
          style={{ borderBottom: ".1em solid oldlace", borderRadius: "5px" }}
          key={letter}
        >
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) ||
                reveal ||
                wordToGuess == "loading"
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "oldlace",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
