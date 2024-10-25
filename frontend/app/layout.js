'use client'
import "./globals.css";
import "../public/bootstrap-5.3.3-dist/css/bootstrap.min.css";
import Header from "./components/header";
import Footer from "./components/footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#050B17' }}>
        <Header />
        {children}
        <Footer/>
        <script src="/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="https://kit.fontawesome.com/ea6209cd9f.js" crossorigin="anonymous"></script>
      </body>
    </html>
  );
}
