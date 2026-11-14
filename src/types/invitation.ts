export type Guest = {
  slug: string;
  name: string;
  displayName: string;
  relationship: "senior" | "friend" | "junior";
  customMessage?: string;
  customMessageVi?: string;
  addressing?: import("@/data/content").GuestAddressing;
};
