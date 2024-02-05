import readline from "readline";

export const getUsernameFuture = async ({
  scanner,
}: {
  scanner: readline.Interface;
}): Promise<string> => new Promise<string>((res) => scanner.question("Enter username: ", (username: string) => {
  return res(username);
})
);
