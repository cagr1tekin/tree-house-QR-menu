"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f0] text-[#3e2b22] p-4 text-center">
      <h2 className="text-2xl font-bold mb-4 font-serif">Bir şeyler ters gitti!</h2>
      <p className="mb-6 text-gray-600">
        Menü yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-[#5c4033] text-white rounded-lg hover:bg-[#3e2b22] transition-colors font-medium"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
