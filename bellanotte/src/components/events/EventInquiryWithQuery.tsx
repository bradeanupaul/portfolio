"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EventInquiryForm } from "./EventInquiryForm";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function EventInquiryFromQuery() {
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get("eveniment") ?? undefined;
  return <EventInquiryForm defaultEventSlug={eventSlug} />;
}

export function EventInquiryWithQuery() {
  return (
    <Suspense
      fallback={
        <p className="flex items-center gap-2 text-sm text-bn-text-muted">
          <LoadingSpinner className="size-4" />
          Se încarcă formularul...
        </p>
      }
    >
      <EventInquiryFromQuery />
    </Suspense>
  );
}