/** @format */

export interface PayoutByIdRes {
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
    userPhotos: { id: number; order: number }[];
    role: string;
  };
}
