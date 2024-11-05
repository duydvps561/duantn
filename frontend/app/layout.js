"use client";
import "./globals.css";
import "../public/bootstrap-5.3.3-dist/css/bootstrap.min.css";
import "../public/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js";
import Header from "./components/header";
import Footer from "./components/footer";
import Providers from "@/redux/Provider";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
    const isThanhCong = pathname.includes('thanhtoan/thanhcong');
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#050B17" }}>
        <Providers>
<<<<<<< HEAD
          <Header />
          {children}
          <Footer />
        </Providers>
        <script
          src="https://kit.fontawesome.com/ea6209cd9f.js"
          crossorigin="anonymous"
        ></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      </body>
=======
        <Header />
        {children}
        {!isThanhCong && <Footer />}
        </Providers>
        <script src="https://kit.fontawesome.com/ea6209cd9f.js" crossorigin="anonymous"></script>
        </body>
>>>>>>> 2d358396dab62089025615c40ee5a12cd5e00907
    </html>
  );
}
