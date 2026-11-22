export type DemoSlot = {
  id: string;
  startsAt: string;
  endsAt: string;
  label: string;
};

export async function fetchDemoSlotsForArtist(
  artistSlug: string,
): Promise<{ slots: DemoSlot[]; error: string | null }> {
  try {
    const res = await fetch(
      `/api/demo-slots?artist=${encodeURIComponent(artistSlug)}`,
    );
    const data = (await res.json()) as {
      ok: boolean;
      slots?: DemoSlot[];
      error?: string;
    };
    if (!res.ok || !data.ok || !data.slots) {
      return {
        slots: [],
        error: data.error ?? "Nu am putut încărca intervalele.",
      };
    }
    return { slots: data.slots, error: null };
  } catch {
    return { slots: [], error: "Nu am putut încărca intervalele." };
  }
}