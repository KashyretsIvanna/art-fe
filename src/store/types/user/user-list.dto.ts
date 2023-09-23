/** @format */

export interface UserListRes {
  users: UserListItemRes[];
  pages: 0;
}

export interface UserListItemRes {
  id: number;
  city: string;
  country: string;
  gender: string;
  aboutMe: string;
  plan: string;
  isLookingForArtist: true;
  isLookingForGallery: true;
  isLookingForCollector: true;
  name: string;
  email: string;
}
