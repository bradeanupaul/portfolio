const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const REFERENCE_LENGTH = 8;

export function generateReferenceId(): string {
  let suffix = "";
  for (let i = 0; i < REFERENCE_LENGTH; i += 1) {
    const index = Math.floor(Math.random() * REFERENCE_ALPHABET.length);
    suffix += REFERENCE_ALPHABET[index];
  }
  return `VI-${suffix}`;
}