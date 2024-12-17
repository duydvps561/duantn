"use client";
import "./globals.css";
import "../public/bootstrap/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";
import Providers from "@/redux/Provider";
import AuthProvider from "./components/AuthProvider";
import Access from "./components/accessRole";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const shouldShowFooter = () => {
    return !pathname.includes("thanhtoan/thanhcong") && !pathname.includes("admin");
  };

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#050B17" }}>
        <Providers>
          <AuthProvider>
            <Access>
              <Header />
              {children}
              {shouldShowFooter() && <Footer />}
            </Access>
          </AuthProvider>
        </Providers>
        <script src="./bootstrap/js/bootstrap.js"></script>
      </body>
    </html>
  );
}
