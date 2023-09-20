/** @format */

export enum UserRole {
  ARTIST = 'ARTIST',
  COLLECTOR = 'COLLECTOR',
  GALLERY = 'GALLERY',
  BANNED = 'BANNED',
  ADMIN = 'ADMIN',
}

export interface WhoamiRes {
  email: string;
  role: UserRole;
}
