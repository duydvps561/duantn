"use client";
import { useEffect } from "react";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
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

  useEffect(() => {
    // Load Bootstrap JS
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

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
      </body>
    </html>
  );
}