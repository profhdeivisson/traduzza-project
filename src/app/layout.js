import "./globals.css";

export const metadata = {
  title: "Traduzza",
  description: "Estude inglês com Traduzza",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
