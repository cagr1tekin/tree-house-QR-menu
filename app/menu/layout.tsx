import React from "react";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#202020] relative selection:bg-[#DFD0B8] selection:text-[#202020]">
      {/* Shared Static Header Background */}
      <div className="absolute top-0 left-0 w-full h-[40vh] overflow-hidden rounded-b-[3rem] z-0 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
