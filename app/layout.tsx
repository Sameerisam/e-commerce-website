import "./globals.css";
import Header from '../components/header/header';

import 'bootstrap-icons/font/bootstrap-icons.css'
import ConditionalFooter from "../components/footer/ConditionalFooter";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" ></link>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" ></script>
      </head>
      
      <body>
    
    <Header></Header>
    <main> 
        {children}   
    </main>
        <ConditionalFooter></ConditionalFooter>
      </body>
    </html>
  );
}
