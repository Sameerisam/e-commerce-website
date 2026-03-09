import "./globals.css";
import Header from '../components/header/header';

import 'bootstrap-icons/font/bootstrap-icons.css'
import ConditionalFooter from "../components/footer/ConditionalFooter";
import ReduxProvider from "@/redux/ReduxProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" async />
      </head>

      <body>
        <ReduxProvider>
          <Header />
          <main>
            {children}
          </main>
          <ConditionalFooter />
        </ReduxProvider>
      </body>
    </html>
  );
}

