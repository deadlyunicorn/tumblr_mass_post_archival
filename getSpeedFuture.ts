import readline from "readline";

export const getSpeedFuture = async ({ scanner }: { scanner: readline.Interface; }) => {
  while (true) {
    let speedFactor: string = await new Promise((res) => {
      scanner.question(
        "Select speed for scanning posts ( 1 -> 1 second per scroll 3 -> 3 seconds per scroll ): ",
        (userInput) => res(userInput)
      );
    });
    if (speedFactor != null && Number.isFinite(parseInt(speedFactor))) {
      return +speedFactor * 1000;
    }
  }
};
