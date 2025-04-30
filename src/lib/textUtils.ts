/**
 * Formats a string in upper snake case to title case.
 *
 * @param str - The string to format.
 * @returns The formatted string in title case.
 *
 * @example
 * constToTitleCase("THIS_IS_AN_EXAMPLE") // "This Is An Example"
 *
 * @example
 * constToTitleCase("HELLO_WORLD") // "Hello World"
 */
export const constToTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
