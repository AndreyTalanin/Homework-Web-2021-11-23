import { AgeRating } from "./AgeRating";

export interface Game {
  id: number;
  title: string;
  description: string;
  imagePaths: string[];
  ageRating: AgeRating;
}
