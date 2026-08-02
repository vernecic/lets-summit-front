export interface Card {
  id: string;
}

export interface CardSummit extends Card {
  title: string;
  image: string;
  difficulty: "easy" | "moderate" | "hard" | "extreme";
  duration: string;
  startDate: string;
  location: string;
  country: string;
  description: string;
  height: string;
}
