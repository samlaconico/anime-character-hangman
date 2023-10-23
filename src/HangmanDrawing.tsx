const HEAD = (
  <div
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "100%",
      border: "10px solid black",
      position: "absolute",
      top: "50px",
      right: "-30px",
      borderColor: "oldlace",
    }}
  />
);

const BODY = (
  <div
    style={{
      width: "10px",
      height: "100px",
      background: "oldlace",
      position: "absolute",
      top: "120px",
      right: 0,
    }}
  />
);

const LEFTARM = (
  <div
    style={{
      width: "80px",
      height: "10px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
      background: "oldlace",
      position: "absolute",
      top: "150px",
      right: "-80px",
    }}
  />
);

const RIGHTARM = (
  <div
    style={{
      width: "80px",
      height: "10px",
      rotate: "30deg",
      transformOrigin: "right bottom",
      background: "oldlace",
      position: "absolute",
      top: "150px",
      right: "10px",
    }}
  />
);

const LEFTLEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      rotate: "-60deg",
      transformOrigin: "right bottom",
      background: "oldlace",
      position: "absolute",
      top: "210px",
      right: "0px",
    }}
  />
);

const RIGHTLEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      rotate: "60deg",
      transformOrigin: "left bottom",
      background: "oldlace",
      position: "absolute",
      top: "210px",
      right: "-90px",
    }}
  />
);

type HangmanDrawingProps = {
  numberOfGuesses: number;
};

const BODYPARTS = [HEAD, BODY, RIGHTARM, LEFTARM, RIGHTLEG, LEFTLEG];

export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ position: "relative" }}>
      {BODYPARTS.slice(0, numberOfGuesses)}
      <div
        style={{
          position: "absolute",
          height: "50px",
          width: "10px",
          background: "oldlace",
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: "10px",
          width: "200px",
          background: "oldlace",
          marginLeft: "120px",
        }}
      />
      <div
        style={{
          height: "400px",
          width: "10px",
          background: "oldlace",
          marginLeft: "120px",
        }}
      />
      <div style={{ height: "10px", width: "250px", background: "oldlace" }} />
    </div>
  );
}
