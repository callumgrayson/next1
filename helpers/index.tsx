export const charSafe = (char: string) => {
  switch (char) {
    case undefined:
    case "":
    case " ":
      //   return `SPACE`;
      return <p>&nbsp;</p>;

    default:
      return char;
  }
};
