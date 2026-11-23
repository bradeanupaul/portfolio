import { handleInquiry } from "@/lib/inquiry-handler";
import { contactSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  return handleInquiry(request, "contact", contactSchema);
}
