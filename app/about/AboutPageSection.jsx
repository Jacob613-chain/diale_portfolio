"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactLenis } from 'lenis/react'
import { SectionFooter } from "../Main/SectionFooter";
import gsap from "gsap";
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger, TextPlugin);

export const AboutPageSection = () => {
    // ANIMATIONS

    const titleRef = useRef()
    const titleRef2 = useRef()
    const descriptionRef = useRef()
    const lineRef = useRef()
    const itemRefs = useRef([]);

    const expertiseItems = [
        { service: "Real Estate & Property Management", specialization: "Automated lead generation", focus: "Branded campaigns", description: "Automated lead gen + branded campaigns" },
        { service: "Healthcare & Clinics", specialization: "Digital workflow optimization", focus: "Patient-focused solutions", description: "Less paperwork, more patient-facing time" },
        { service: "Agencies & Startups", specialization: "Growth acceleration", focus: "Brand & automation", description: "Faster delivery, sharper branding, automated growth engines" },
        { service: "Service Businesses", specialization: "24/7 automation", focus: "Client support systems", description: "Client support + marketing that works 24/7 without staff overhead" },
    ];

    useEffect(() => {

        // title animation
        const titleSplit = new SplitText(titleRef.current, { type: "chars" });
        gsap.fromTo(titleSplit.chars, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 50 }, { delay: 0.2, opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.02, duration: 0.75, ease: "power1" });

        // description animation
        gsap.to(descriptionRef.current, { opacity: 1, filter: 'blur(0px)', duration: 1, delay: 0.6 })

        // line animation
        gsap.fromTo(lineRef.current, { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.5, delay: 0.5 })

        // title 2 animation
        const titleSplit2 = new SplitText(titleRef2.current, { type: "words" });
        gsap.fromTo(titleSplit2.words, { 'will-change': 'opacity', filter: 'blur(8px)', opacity: 0 }, { opacity: 1, filter: 'blur(0px)', stagger: 0.025, ease: 'sine', scrollTrigger: { trigger: titleRef2.current, start: "top 95%", end: "bottom center", scrub: true } });

        // team member boxes animations
        itemRefs.current.forEach((item, index) => {
            gsap.fromTo(item, 
              { yPercent: 100, opacity: 0, filter: "blur(8px)" },
              {
                yPercent: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 0.75,
                delay: index * 0.2,
                ease: "power3",
                scrollTrigger: {
                  trigger: ".five-content",
                  start: "top bottom"
                }
              }
            );
          });

      }, [])

    // STICKY SECTION

    const item1Ref = useRef(null);
    const item2Ref = useRef(null);
    const item3Ref = useRef(null);
    const item4Ref = useRef(null);

    useEffect(() => {
        const refs = [item1Ref, item2Ref, item3Ref, item4Ref];

        refs.forEach((ref, position) => {
            const el = ref.current;
            const isLast = position === refs.length - 1;

            gsap.set(el, { willChange: "transform, filter" });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'center center',
                    end: '350%',
                    scrub: true,
                },
            });

            timeline
            .to(el, {
                ease: 'none',
                startAt: { filter: 'blur(0px)' },
                filter: isLast ? 'blur(0px)' : 'blur(3px)',
                scrollTrigger: {
                    trigger: el,
                    start: 'center center',
                    end: '+=100%',
                    scrub: true,
                },
            }, 0)
            .to(el, {
                ease: 'none',
                scale: isLast ? 1 : 0.55,
                yPercent: isLast ? 0 : -45,
            }, 0);
        });
    }, []);

  return (
    <ReactLenis root>
      <section className="about">
        <div className="about-content">
            <div className="about-content-top">
                <div className="about-content-textbox">
                    <div className="titlebox">
                        <div className="titlebox-gradient" />
                        <h1 className="headline white" ref={titleRef} >About Obsydia AI</h1>
                    </div>
                    <p className="description grey opacity-blur" ref={descriptionRef} >A cutting-edge AI development agency specializing in intelligent automation, scalable web applications, and transformative AI solutions that drive business innovation and growth.</p>
                </div>
                <div className="about-divider" ref={lineRef} />
            </div>
            <div className="about-team">
                <div className="about-team-container">
                    {expertiseItems.map((item, index) => (
                        <div className="about-team-item" key={index} ref={el => itemRefs.current[index] = el} >
                            <p className="description white" >{item.service}</p>
                            <p className="description white" >{item.specialization}</p>
                            <p className="small-description grey" >{item.focus}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="about-divider" />
            <div className="about-whyus" >
                <p className="description about-whyus-description grey" >Our Approach</p>
                <p className="subheadline about-whyus-subheadline white" ref={titleRef2} >AI & Automation <br /> – Kill the busywork with smart assistants + workflows. Marketing Systems <br />– Emails, ads, funnels, and campaigns that run on autopilot. Branding <br />– A clear, professional brand that makes selling effortless. Integrations <br />– All your tools connected: CRM, email, ads, scheduling, chat. Real ROI <br />– Every system we build is measured by time saved + revenue gained.</p>
            </div>
            <div className="about-divider" />
            <div className="about-sticky-container">
				<div className="about-sticky-item" ref={item1Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >Real Estate & <br /> Property Management</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Automated lead gen + branded campaigns</p>
                        </div>
                        <h1 className="headline white" >(01)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src="/images/mockup4.webp" className="about-sticky-item-right-image" alt="" />
                        </div>
                    </div>
                </div>
				<div className="about-sticky-item" ref={item2Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >Healthcare & <br /> Clinics</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Less paperwork, more patient-facing time</p>
                        </div>
                        <h1 className="headline white" >(02)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src="/images/mockup12.webp" className="about-sticky-item-right-image" alt="" />
                        </div>
                    </div>
                </div>
				<div className="about-sticky-item" ref={item3Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >Agencies & <br /> Startups</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Faster delivery, sharper branding, automated growth engines</p>
                        </div>
                        <h1 className="headline white" >(03)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src="/images/mockup7.webp" className="about-sticky-item-right-image" alt="" />
                        </div>
                    </div>
                </div>
				<div className="about-sticky-item" ref={item4Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >Service <br /> Businesses</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Client support + marketing that works 24/7 without staff overhead</p>
                        </div>
                        <h1 className="headline white" >(04)</h1>
                    </div>
                    <div className="about-sticky-item-right">
                        <div className="about-sticky-item-right-imagebox">
                            <img src="/images/mockup11.webp" className="about-sticky-item-right-image" alt="" />
                        </div>
                    </div>
                </div>
			</div>
        </div>
      </section>
      <SectionFooter />
    </ReactLenis>
  );
};