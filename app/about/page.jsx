import "./about.css";
import { AboutPageSection } from "./AboutPageSection";

export const metadata = {
  title: 'Obsydia AI | About Us',
  description: "Obsydia AI - AI-Powered Web Development Agency.",
  openGraph: {
    title: 'About Us',
  },
}

const About = () => {

  return (
    <AboutPageSection />
  );
};

export default About;