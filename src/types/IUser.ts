export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: "patient" | "doctor";
  isUpdateInfo: boolean;
  image: string;
}
