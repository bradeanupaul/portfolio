import { getPropertyById } from "@/lib/properties";
import { handleInquiry } from "@/lib/inquiry-handler";
import { viewingSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  return handleInquiry(request, "viewing", viewingSchema, (value) => {
    const property = getPropertyById(value.propertyId);
    if (!property) return "Proprietatea aleasă nu există în portofoliu.";
    if (property.status === "vandut") {
      return "Această proprietate este marcată vândută și nu mai poate fi vizionată.";
    }
    return null;
  });
}
