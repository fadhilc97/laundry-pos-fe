import { Role } from "../enums";

export interface IAuthJwt {
  accessToken: string;
  roles: Role[];
}
