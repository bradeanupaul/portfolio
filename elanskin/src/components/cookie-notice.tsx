"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonClass } from "@/components/chrome";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem("elan-cookie") !== "da");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-[1.4rem] border border-line bg-white p-5 shadow-soft md:inset-x-auto md:right-6">
      <p className="text-sm leading-6 text-ink">
        Ținem minte coșul, favoritele și acest acord în browser. Poți citi{" "}
        <Link href="/politica-cookies" className="text-orchid">
          politica de cookie
        </Link>
        .
      </p>
      <button
        type="button"
        className={buttonClass("solid", "mt-4 px-5 py-2")}
        onClick={() => {
          window.localStorage.setItem("elan-cookie", "da");
          setVisible(false);
        }}
      >
        Am înțeles
      </button>
    </div>
  );
}
