export interface Card {
  id: string;
}
export interface TripUser {
  _id: string;
  username: string;
}

export interface CardTrip extends Card {
  title: string;
  image: string;
  difficulty: "easy" | "moderate" | "hard" | "extreme";
  duration: number;
  shortDescription: string;
  date: string;
  location: string;
  country: string;
  description: string;
  elevation: number;
  ownerId: string;
  maxParticipants: number;
  participants: TripUser[];
  joinRequests: TripUser[];
}
