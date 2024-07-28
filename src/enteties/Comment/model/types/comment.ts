import { User } from "enteties/User"

export interface Comment {
  id: string;
  user: User;
  text: string;
}