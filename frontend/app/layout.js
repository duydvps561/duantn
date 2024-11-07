'use client';
import "./globals.css";
import "../public/bootstrap-5.3.3-dist/css/bootstrap.min.css";
import '../public/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js';
import Header from "./components/header";
import Footer from "./components/footer";
import Providers from "@/redux/Provider";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.includes('admin');

  return (
    <html lang="en">
      <body style={{ backgroundColor: '#050B17' }}>
        <Providers>
          <Header />
          {children}
          {!isAdminRoute && <Footer />}
        </Providers>
        <script src="https://kit.fontawesome.com/ea6209cd9f.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
