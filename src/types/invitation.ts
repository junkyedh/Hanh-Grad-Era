export type Guest = {
  slug: string;
  name: string;
  displayName: string;
  relationship: "senior" | "friend" | "junior";
  customMessage?: string;
};
