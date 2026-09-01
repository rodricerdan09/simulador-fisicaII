import features from "@/config/features.json";

type FeatureKey = "auth.login" | "auth.register" | "supabase.enabled" | "sqlite.enabled" | "visitTracking" | "laboratorio";

export function isFeatureEnabled(key: FeatureKey): boolean {
  const [section, field] = key.split(".") as [string, string];
  const sectionData = (features.features as Record<string, unknown>)[section];

  if (field === undefined) {
    return Boolean(sectionData);
  }

  if (typeof sectionData === "object" && sectionData !== null) {
    return Boolean((sectionData as Record<string, unknown>)[field]);
  }

  return false;
}
