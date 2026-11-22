import { describe, expect, it } from "vitest";

import { consultationSubmissionSchema } from "@/lib/validation/consultation";

const validPayload = {
  styleSlugs: ["blackwork"],
  placement: "Antebraț interior",
  approximateSize: "15 cm",
  ideaDescription:
    "Aș dori un motiv geometric discret, inspirat de linii verticale și simetrie ușoară.",
  artistSlug: "alex-muresan",
  contactName: "Demo Utilizator",
  contactEmail: "demo@example.com",
  demoAcknowledged: true as const,
};

describe("consultationSubmissionSchema", () => {
  it("accepts a valid submission", () => {
    const result = consultationSubmissionSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("requires at least one style", () => {
    const result = consultationSubmissionSchema.safeParse({
      ...validPayload,
      styleSlugs: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects unknown artist slug", () => {
    const result = consultationSubmissionSchema.safeParse({
      ...validPayload,
      artistSlug: "unknown-artist",
    });
    expect(result.success).toBe(false);
  });

  it("requires demo acknowledgment", () => {
    const result = consultationSubmissionSchema.safeParse({
      ...validPayload,
      demoAcknowledged: false,
    });
    expect(result.success).toBe(false);
  });

  it("enforces idea description length", () => {
    const result = consultationSubmissionSchema.safeParse({
      ...validPayload,
      ideaDescription: "prea scurt",
    });
    expect(result.success).toBe(false);
  });
});