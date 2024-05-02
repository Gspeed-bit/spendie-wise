"use client";

import Footer from "@/components/ui/shared/footer";
import Header from "@/components/ui/shared/header";
import SideMenu from "@/components/ui/shared/sideMenu";

// this was created because we dont want the header and footer in all the pages so we created this layout seperately

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
