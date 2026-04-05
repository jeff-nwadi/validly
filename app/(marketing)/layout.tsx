import Header from "@/components/frontpage/Header";
import Footer from "@/components/frontpage/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
