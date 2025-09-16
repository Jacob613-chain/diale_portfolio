import "./globals.css";
import { Navigation } from "./Navigation";

export const metadata = {
  title: "Obsydia AI | AI-Powered Web Development & Automation Agency",
  description: "Obsydia AI specializes in cutting-edge AI development, intelligent automation, and scalable web applications. Transform your business with our innovative AI-powered solutions.",
  keywords: ["AI development", "artificial intelligence", "web development agency", "automation", "machine learning", "React", "Next.js", "Angular", "Vue.js", "Node.js", "Python", "AWS", "Azure", "Google Cloud", "microservices", "CI/CD", "JavaScript", "TypeScript", "AI integration", "digital transformation", "scalable applications"],
  openGraph: {
    title: "Obsydia AI | AI-Powered Web Development & Automation Agency",
    description: "Obsydia AI specializes in cutting-edge AI development, intelligent automation, and scalable web applications. Transform your business with our innovative AI-powered solutions.",
    images: ["/images/obsydia-logo.webp"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
