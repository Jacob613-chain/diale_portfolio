/* eslint-disable react/jsx-key */
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, Calculator, Calendar, CheckCircle, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionCTA = () => {
    const subheadlineBoxRef = useRef()
    const titleRef = useRef()
    const stepsRef = useRef()
    const stepRefs = useRef([])
    const buttonsRef = useRef()
    const servicesRef = useRef()
    const industriesRef = useRef()
    const router = useRouter()

    useEffect(() => {
        // subheadline box animation
        gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

        // headline text animation
        const titleSplit = new SplitText(titleRef.current, { type: "words" });
        gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 100 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.085, duration: 1, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

        // steps animation
        stepRefs.current.forEach((step, index) => {
            if (step) {
                gsap.to(step, { 
                    opacity: 1, 
                    filter: 'blur(0px)', 
                    y: 0,
                    duration: 0.6, 
                    ease: 'power2.out', 
                    delay: index * 0.15,
                    scrollTrigger: { 
                        trigger: step, 
                        start: "top 90%" 
                    }
                });
            }
        });

        // buttons animation
        gsap.to(buttonsRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: buttonsRef.current, start: "top 95%" }});

        // services animation
        gsap.to(servicesRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: servicesRef.current, start: "top 95%" }});

        // industries animation
        gsap.to(industriesRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: industriesRef.current, start: "top 95%" }});

    }, [])

    const handleBookAudit = () => {
        // Add your booking logic here - could open a calendar widget or redirect
        window.open('https://calendly.com/obsydiaai/audit', '_blank');
    };

    const handleCalculateSavings = () => {
        // Add your calculator logic here - could open a modal or redirect
        router.push('/contact');
    };

    return (
        <section className="cta">
            <div className="cta-content">
                <div className="textbox">
                    <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef}>
                        <Zap className="subheadline-box-icon" />
                        <h2 className="small-description grey">Get Started (Final CTA)</h2>
                    </div>
                    <div className="titlebox">
                        <div className="titlebox-big-gradient" />
                        <h1 className="subheadline white" ref={titleRef}>The Smartest Hire You'll Ever Make Isn't a Person. It's Obsydia.ai.</h1>
                    </div>
                </div>

                <div className="cta-steps" ref={stepsRef}>
                    <h2 className="small-subheadline white">3 Easy Steps:</h2>
                    <div className="cta-steps-grid">
                        <div className="cta-step opacity-blur" ref={el => stepRefs.current[0] = el}>
                            <div className="cta-step-number">
                                <span className="small-description white">01</span>
                            </div>
                            <div className="cta-step-content">
                                {/* <Calendar className="cta-step-icon" /> */}
                                <p className="description white">Book your free AI audit</p>
                            </div>
                        </div>
                        
                        <div className="cta-step opacity-blur" ref={el => stepRefs.current[1] = el}>
                            <div className="cta-step-number">
                                <span className="small-description white">02</span>
                            </div>
                            <div className="cta-step-content">
                                {/* <CheckCircle className="cta-step-icon" /> */}
                                <p className="description white">Get your custom AI + Branding + Marketing Blueprint</p>
                            </div>
                        </div>
                        
                        <div className="cta-step opacity-blur" ref={el => stepRefs.current[2] = el}>
                            <div className="cta-step-number">
                                <span className="small-description white">03</span>
                            </div>
                            <div className="cta-step-content">
                                {/* <ArrowUpRight className="cta-step-icon" /> */}
                                <p className="description white">Start saving time + making more money</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cta-buttons opacity-blur" ref={buttonsRef}>
                    <button className="cta-button-primary" onClick={handleBookAudit}>
                        <span className="description black">Book My Free Audit Now</span>
                    </button>
                    
                    <button className="cta-button-secondary" onClick={handleCalculateSavings}>
                        <Calculator className="cta-button-icon" />
                        <span className="description white">Calculate My Savings</span>
                    </button>
                </div>

            </div>
        </section>
    );
};
