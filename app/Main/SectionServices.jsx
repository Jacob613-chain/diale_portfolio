/* eslint-disable react/jsx-key */
import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, Hand, Plus, X, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);

const customEase = CustomEase.create("customEase", ".4,0,.1,1");

export const SectionServices = () => {

  const subheadlineBoxRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const buttonRef = useRef()
  const overlayRef = useRef()
  const overlayWidgetRef = useRef()
  const overlayWidgetButtonRef = useRef()
  const stepsRef = useRef()
  const stepRefs = useRef([])
  const stepTitleRefs = useRef([])
  const stepDescRefs = useRef([])
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {

    // subheadline box animation
    gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

    // headline text animation
    const titleSplit = new SplitText(titleRef.current, { type: "words" });
    gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 100 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.085, duration: 1, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

    // description text animation
    const descriptionSplit = new SplitText(descriptionRef.current, { type: "words" });
    gsap.fromTo(descriptionSplit.words, { filter: 'blur(8px)', opacity: 0, skewX: 0 }, { opacity: 1, filter: 'blur(0px)', skewX: 0, stagger: 0.025, ease: 'sine', scrollTrigger: { trigger: descriptionRef.current, start: "top 95%" } });

    // button animation
    gsap.to(buttonRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: buttonRef.current, start: "top 95%" }});

    // steps animation
    stepRefs.current.forEach((step, index) => {
      if (step) {
        gsap.to(step, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: step,
            start: "top 90%"
          }
        });
      }
    });
  }, [])

  useEffect(() => {
    // Dynamically load the Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Clean up script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleOverlay = () => {
    if (!isOverlayVisible) {
      // Show overlay
      gsap.to(overlayRef.current, { display: "flex", opacity: 1, duration: 0.3 });
      gsap.fromTo(overlayWidgetRef.current, { yPercent: 10, rotate: 5, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.5, ease: customEase } );
      gsap.fromTo(overlayWidgetButtonRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: customEase } );
    } else {
      // Hide overlay
      gsap.to(overlayWidgetRef.current, { yPercent: 10, rotate: 5, opacity: 0, duration: 0.5, ease: customEase } );
      gsap.to(overlayWidgetButtonRef.current, { opacity: 0, scale: 0.5, duration: 0.5, ease: customEase } );
      gsap.to(overlayRef.current, { delay: 0.1, opacity: 0, duration: 0.5, onComplete: () => { overlayRef.current.style.display = "none"; } });
    }
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <section className="services">
      <div className="calendly-overlay" ref={overlayRef} style={{ display: "none", opacity: 0 }} onClick={toggleOverlay} >
        <div className="calendly-overlay-widget" ref={overlayWidgetRef} >
          <div className="calendly-overlay-widget-border" />
          <div className="calendly-overlay-widget-scrollbar-hider" />
          <div className="calendly-inline-widget" data-url="https://calendly.com/joseiscoding/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=9b92a2"/>
        </div>
        <div className="calendly-overlay-widget-button" ref={overlayWidgetButtonRef} onClick={toggleOverlay} >
          <X className="calendly-overlay-widget-button-icon" />
        </div>
      </div>
      <div className="services-content" >
        <div className="textbox">
          <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
            <Zap className="subheadline-box-icon" />
            <h2 className="small-description grey" >Our Process</h2>
          </div>
          <div className="titlebox">
            <div className="titlebox-gradient" />
            <h1 className="subheadline white" ref={titleRef} >Your Growth, Architected in 4 Steps</h1>
          </div>
          <p className="description grey" ref={descriptionRef} >We transform your business through strategic automation, intelligent systems, and seamless integration. <br /> From identifying opportunities to scaling your success.</p>
          <div className="contact-button-wrapper opacity-blur" ref={buttonRef} onClick={handleContactClick} >
            <button className="contact-button-white" >
              <span>
                <span className="contact-button-container-white">
                  <span className="contact-button-primary-white"></span>
                  <span className="contact-button-complimentary-white"></span>
                </span>
              </span>
              <span className="description black" >Let&apos;s Connect</span>
            </button>
          </div>
        </div>

        <div className="services-steps" ref={stepsRef}>
          <div className="services-step opacity-blur" ref={el => stepRefs.current[0] = el}>
            <div className="services-step-number">
              <span className="small-description white">01</span>
            </div>
            <div className="services-step-content">
              <h3 className="small-subheadline white" ref={el => stepTitleRefs.current[0] = el}>Find the Gaps</h3>
              <p className="description grey" ref={el => stepDescRefs.current[0] = el}>We uncover where you're losing money, wasting time, or missing brand opportunities.</p>
            </div>
          </div>

          <div className="services-step opacity-blur" ref={el => stepRefs.current[1] = el}>
            <div className="services-step-number">
              <span className="small-description white">02</span>
            </div>
            <div className="services-step-content">
              <h3 className="small-subheadline white" ref={el => stepTitleRefs.current[1] = el}>Design Your Blueprint</h3>
              <p className="description grey" ref={el => stepDescRefs.current[1] = el}>We architect automation + marketing + branding strategies tailored to your business.</p>
            </div>
          </div>

          <div className="services-step opacity-blur" ref={el => stepRefs.current[2] = el}>
            <div className="services-step-number">
              <span className="small-description white">03</span>
            </div>
            <div className="services-step-content">
              <h3 className="small-subheadline white" ref={el => stepTitleRefs.current[2] = el}>Automate & Integrate</h3>
              <p className="description grey" ref={el => stepDescRefs.current[2] = el}>We replace repetitive tasks with AI, and connect all your tools—CRM, email, ads, scheduling—into one seamless system.</p>
            </div>
          </div>

          <div className="services-step opacity-blur" ref={el => stepRefs.current[3] = el}>
            <div className="services-step-number">
              <span className="small-description white">04</span>
            </div>
            <div className="services-step-content">
              <h3 className="small-subheadline white" ref={el => stepTitleRefs.current[3] = el}>Scale & Sell More</h3>
              <p className="description grey" ref={el => stepDescRefs.current[3] = el}>With automation running in the background, your brand and marketing do the heavy lifting while you focus on growth.</p>
            </div>
          </div>
        </div>

        <div className="services-content-container">
          <div className="services-content-container-left" />
          <div className="services-content-container-right" />
          <div className="services-content-container-bottom" />
          <div className="services-content-container-top" />
          <video src="/videos/serviceshighquality.mp4" className="services-content-video" autoPlay="autoplay" muted playsInline={true} data-wf-ignore="true" preload="auto" loop />
        </div>
      </div>
    </section>
  );
};