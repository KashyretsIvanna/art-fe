/** @format */

export interface UserByIdRes {
  user: {
    id: number;
    name: string;
    email: string;
    city?: string;
    age?: number;
    country?: string;
    gender?: string;
    profileDescription?: string;
    plan?: string;
    isLookingForArtist: boolean;
    isLookingForGallery: boolean;
    isLookingForCollector: boolean;
    profilePhoto: number[];
    role: string;
  };
}
