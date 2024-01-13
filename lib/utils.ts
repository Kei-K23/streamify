import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(inputString: string): string {
  // Simple hash function to generate a numeric value from the input string
  let hash = 0;
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the numeric hash to a color
  const color = Math.abs(hash) % 16777215; // Limit to a valid RGB color range

  // Convert the numeric color to hexadecimal format
  const hexColor = color.toString(16);

  // Pad the hexadecimal color with zeros if needed
  return "#" + "000000".substring(0, 6 - hexColor.length) + hexColor;
}
