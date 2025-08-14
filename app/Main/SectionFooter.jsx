import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionFooter = () => {

  const topRef1 = useRef();
  const topRef2 = useRef();
  const topRef3 = useRef();
  const centerRef1 = useRef();
  const bottomRef1 = useRef();
  const bottomRef2 = useRef()
  const router = useRouter()

  // Navigation handlers
  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };;

  useEffect(() => {
    gsap.fromTo(topRef1.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: topRef1.current, start: "top 95%" }});
    gsap.fromTo(topRef2.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0.2, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: topRef1.current, start: "top 95%" }});
    gsap.fromTo(topRef3.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0.4, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: topRef1.current, start: "top 95%" }});
    gsap.fromTo(centerRef1.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: centerRef1.current, start: "top 95%" }});
    gsap.fromTo(bottomRef1.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: bottomRef1.current, start: "top 95%" }});
    gsap.fromTo(bottomRef2.current, { filter: 'blur(8px)', opacity: 0 }, { delay: 0.2, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'sine', scrollTrigger: { trigger: bottomRef2.current, start: "top 95%" }});
  }, [])

  return (
    <section className="footer">
      <div className="footer-content">
        <div className="footer-content-left" ref={topRef1} >
          <img src="/images/jose-logo.webp" className="footer-logo" alt="" />
          <h1 className="subheadline white" >Jose Juarez</h1>
          <p className="description grey"  >Senior Software Engineer building scalable, high-performance web applications with modern technologies</p>
        </div>
        <div className="footer-content-right" ref={topRef2} >
          <div className="footer-content-right-column">
            <h2 className="description white" >Company</h2>
            <div className="footer-column-contents">
              <div className="footer-column-contents-item" onClick={() => handleNavigation('/')}>
                <p className="description grey hover-text-grey" style={{cursor: 'pointer'}}>Home</p>
              </div>
              <div className="footer-column-contents-item" onClick={() => handleNavigation('/about')}>
                <p className="description grey hover-text-grey" style={{cursor: 'pointer'}}>About</p>
              </div>
              <div className="footer-column-contents-item" onClick={() => handleNavigation('/works')}>
                <p className="description grey hover-text-grey" style={{cursor: 'pointer'}}>Projects</p>
              </div>
              <div className="footer-column-contents-item" onClick={() => handleNavigation('/contact')}>
                <p className="description grey hover-text-grey" style={{cursor: 'pointer'}}>Contact</p>
              </div>
            </div>
          </div>
          <div className="footer-content-right-column" ref={topRef3} >
            <h2 className="description white" >Connect</h2>
            <div className="footer-column-contents">
              <div className="footer-column-contents-item" onClick={() => handleSocialClick('mailto:joseiscoding@gmail.com')}>
                <p className="description grey hover-text-grey" style={{cursor: 'pointer'}}>Email Me</p>
              </div>
              <div className="footer-column-contents-item" onClick={() => handleSocialClick('https://github.com/jose-juarez')}>
                <p className="description grey hover-text-grey" style={{cursor: 'pointer'}}>GitHub</p>
              </div>
              <div className="footer-column-contents-item" onClick={() => handleSocialClick('tel:+17605878472')}>
                <p className="description grey hover-text-grey" style={{cursor: 'pointer'}}>Call Me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-divider" ref={centerRef1} />
      <div className="footer-content-bottom">
        <p className="small-description grey" ref={bottomRef1} >© 2024 Jose Juarez All Rights Reserved</p>
        <div className="footer-socials" ref={bottomRef2} >
          <Instagram
            strokeWidth={1.25}
            className="footer-socials-icon"
            style={{cursor: 'pointer'}}
            onClick={() => handleSocialClick('https://instagram.com/joseiscoding')}
          />
          <Twitter
            strokeWidth={1.25}
            className="footer-socials-icon"
            style={{cursor: 'pointer'}}
            onClick={() => handleSocialClick('https://twitter.com/joseiscoding')}
          />
          <Linkedin
            strokeWidth={1.25}
            className="footer-socials-icon"
            style={{cursor: 'pointer'}}
            onClick={() => handleSocialClick('https://linkedin.com/in/jose-juarez-dev')}
          />
        </div>
      </div>
    </section>
  );
};