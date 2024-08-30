import NavBar from "@/Component/NavBar/NavBar";
import "./globals.css";
import Footer from "@/Component/Footer/Footer";
import { GlobalProvider } from "@/Component/Context";

export const metadata = {
  title: "My Client Plug",
  description: "This is my client plug",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <div className="MYAPP">
            <NavBar />
            {children}
            <Footer />
          </div>
        </GlobalProvider>
      </body>
    </html>
  );
}
