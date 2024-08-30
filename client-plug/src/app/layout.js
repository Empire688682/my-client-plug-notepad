import NavBar from "@/Component/NavBar/NavBar";
import "./globals.css";
import Footer from "@/Component/Footer/Footer";

export const metadata = {
  title: "My Client Plug",
  description: "This is my client plug",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
