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

    const experienceItems = [
        { company: "Imagine Pediatrics", role: "Senior Software Engineer", period: "Dec 2023 – Present", location: "Cathedral City, California" },
        { company: "Snowflake", role: "Senior Full Stack Developer", period: "Nov 2021 - Oct 2023", location: "Cathedral City, California" },
        { company: "GettyImages", role: "Software Engineer", period: "Feb 2019 - Oct 2021", location: "Cathedral City, California" },
        { company: "Codazen", role: "Web Developer", period: "Jul 2017 - Jan 2019", location: "Irvine, California" },
        { company: "California State University, San Bernardino", role: "Bachelor's Degree", period: "Aug 2013 - June 2017", location: "San Bernardino, California" },
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
                        <h1 className="headline white" ref={titleRef} >About Jose Juarez</h1>
                    </div>
                    <p className="description grey opacity-blur" ref={descriptionRef} >A passionate Senior Software Engineer with 7+ years of experience building scalable, high-performance web applications and driving innovation through modern technologies.</p>
                </div>
                <div className="about-divider" ref={lineRef} />
            </div>
            <div className="about-team">
                <div className="about-team-container">
                    {experienceItems.map((item, index) => (
                        <div className="about-team-item" key={index} ref={el => itemRefs.current[index] = el} >
                            <p className="description white" >{item.company}</p>
                            <p className="description white" >{item.role}</p>
                            <p className="small-description grey" >{item.period}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="about-divider" />
            <div className="about-whyus" >
                <p className="description about-whyus-description grey" >My Approach</p>
                <p className="subheadline about-whyus-subheadline white" ref={titleRef2} >I bring a startup mindset to every project — dynamic, innovative, and driven to make a real difference. With 7+ years of experience across diverse industries, I don&apos;t just write code; I architect solutions that solve complex business problems. From optimizing performance to implementing cutting-edge AI features, every project is an opportunity to push boundaries and deliver exceptional results.</p>
            </div>
            <div className="about-divider" />
            <div className="about-sticky-container">
				<div className="about-sticky-item" ref={item1Ref} >
                    <div className="about-sticky-item-left">
                        <div className="about-sticky-item-left-textbox">
                            <h1 className="headline white" >3D/2D <br /> Animation</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Unlock the power of storytelling with our cutting-edge 2D and 3D animation. Whether you want to create vibrant characters or immersive worlds, our team combines artistic flair with technical expertise to bring your vision to life.</p>
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
                            <h1 className="headline white" >AI Tuning</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Harness the potential of artificial intelligence to elevate your projects with our AI Tuning. By integrating intelligent solutions, we help you achieve precision and creativity that stand out in the competitive landscape.</p>
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
                            <h1 className="headline white" >AR VR</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Step into the future of interactive experiences with our Augmented Reality (AR) and Virtual Reality (VR) offerings. We create captivating environments that allow users to engage with your content in thrilling new ways, merging the digital and real worlds seamlessly.</p>
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
                            <h1 className="headline white" >VFX</h1>
                            <p className="description about-sticky-item-left-textbox-description grey" >Transform your visuals into stunning spectacles with our top-notch Visual Effects (VFX). From breathtaking explosions to fantastical landscapes, we add that extra layer of magic that captivates viewers.</p>
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