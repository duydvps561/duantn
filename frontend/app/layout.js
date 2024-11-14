"use client";
import "./globals.css";
import "../public/bootstrap-5.3.3-dist/css/bootstrap.min.css";
import "../public/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js";
import Header from "./components/header";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";
import Providers from "@/redux/Provider";
import AuthProvider from "./components/AuthProvider"; 

export default function RootLayout({ children }) {

  const pathname = usePathname();
  const isThanhCong = pathname.includes("thanhtoan/thanhcong");
  const isAdminRoute = pathname.includes('admin');

  return (
    <html lang="en">
      <body style={{ backgroundColor: "#050B17" }}>
        <Providers>
          <AuthProvider>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <Header />
            {children}
           
            {!isThanhCong && !isAdminRoute && <Footer />}
          </AuthProvider>
        </Providers>
        <script
          src="https://kit.fontawesome.com/ea6209cd9f.js"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
