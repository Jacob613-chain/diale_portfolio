/* eslint-disable react/jsx-key */
import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PrevButton, NextButton, usePrevNextButtons} from "./Carousel/EmblaCarouselArrowButtons"
import useEmblaCarousel from "embla-carousel-react"
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionTestimonials = () => {

    const subheadlineBoxRef = useRef()
    const titleRef = useRef()
    const emblaWrapperRef = useRef()
    const router = useRouter()

    // Handle contact button click
    const handleContactClick = () => {
        router.push('/contact');
    };

    // GSAP ANIMATIONS

    useEffect(() => {

        // subheadline box animation
        gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

        // headline text animation
        const titleSplit = new SplitText(titleRef.current, { type: "words" });
        gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 50 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.05, duration: 0.75, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

        // embla wrapper animation
        gsap.to(emblaWrapperRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: emblaWrapperRef.current, start: "top 95%" }});

    }, [])

    // EMBLA CAROUSEL

    const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true})
    const [scrollProgress, setScrollProgress] = useState(0)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    const onScroll = useCallback((emblaApi) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
        setScrollProgress(progress * 100)
    }, [])

    useEffect(() => {
        if (!emblaApi) return
    
        onScroll(emblaApi)
        emblaApi
          .on("reInit", onScroll)
          .on("scroll", onScroll)
          .on("slideFocus", onScroll)
    }, [emblaApi, onScroll])

  return (
    <section className="testimonials">
    <div className="testimonials-content">
        <div className="textbox testimonials-content-textbox">
            <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
                <Send className="subheadline-box-icon" />
                <h2 className="small-description grey" >Why Obsydia is a No-Brainer</h2>
            </div>
            <div className="titlebox">
                <div className="titlebox-big-gradient" />
                <h1 className="subheadline white" ref={titleRef} >We’re Not Just Tech. We’re Your Growth Architects.</h1>
            </div>
        </div>
        <div className="opacity-blur" ref={emblaWrapperRef} >
            <div className="testimonials-carousel" ref={emblaRef} >
                <div className="testimonials-carousel-row">
                    <div className="testimonials-item-padding" />
                    <div className="testimonials-item" >
                        <div className="testimonials-item-content">
                            <div className="testimonials-item-profile">
                                <img src="/images/fp1.jpg" alt="" />
                            </div>
                            <div className="testimonials-item-center">
                                <p className="big-description white" >Sarah Johnson</p>
                                <p className="description grey" >Real Estate Agency Owner</p>
                            </div>
                            <p className="description white" >Obsydia didn't just automate tasks—they gave us a real brand, a marketing system, and time back to grow. Our sales pipeline has never looked better.</p>
                        </div>
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item" >
                        <div className="testimonials-item-content">
                            <div className="testimonials-item-profile">
                                <img src="/images/fp2.jpg" alt="" />
                            </div>
                            <div className="testimonials-item-center">
                                <p className="big-description white" >David Patel</p>
                                <p className="description grey" >Medical Clinic Director</p>
                            </div>
                            <p className="description white" >We went from drowning in admin work to having a streamlined operation. The AI marketing alone saved us $5,000 monthly while doubling our patient bookings.</p>
                        </div>
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item" >
                        <div className="testimonials-item-content">
                            <div className="testimonials-item-profile">
                                <img src="/images/fp3.jpg" alt="" />
                            </div>
                            <div className="testimonials-item-center">
                                <p className="big-description white" >Emily Carter</p>
                                <p className="description grey" >E-commerce Founder</p>
                            </div>
                            <p className="description white" >The brand transformation was incredible. Our conversion rate jumped 35% after they aligned our messaging, website, and email automation. Finally, everything works together.</p>
                        </div>
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item" >
                        <div className="testimonials-item-content">
                            <div className="testimonials-item-profile">
                                <img src="/images/fp4.jpg" alt="" />
                            </div>
                            <div className="testimonials-item-center">
                                <p className="big-description white" >Marcus Rodriguez</p>
                                <p className="description grey" >SaaS Startup CEO</p>
                            </div>
                            <p className="description white" >They built us a growth machine. Lead nurturing runs on autopilot, our CRM stays updated, and we've scaled from 10 to 100 customers without adding staff. Game changer.</p>
                        </div>
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item" >
                        <div className="testimonials-item-content">
                            <div className="testimonials-item-profile">
                                <img src="/images/fp5.jpg" alt="" />
                            </div>
                            <div className="testimonials-item-center">
                                <p className="big-description white" >Lisa Chen</p>
                                <p className="description grey" >Marketing Agency Owner</p>
                            </div>
                            <p className="description white" >I was skeptical about AI, but Obsydia made it simple. Our client campaigns now optimize themselves, and we're delivering better results with half the manual work.</p>
                        </div>
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item" >
                        <div className="testimonials-item-content">
                            <div className="testimonials-item-profile">
                                <img src="/images/fp6.jpg" alt="" />
                            </div>
                            <div className="testimonials-item-center">
                                <p className="big-description white" >James Thompson</p>
                                <p className="description grey" >Restaurant Chain Owner</p>
                            </div>
                            <p className="description white" >From scattered social media to a cohesive brand that actually sells—Obsydia transformed how customers see us. Revenue is up 40% and our team finally has time to focus on growth.</p>
                        </div>
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item" >
                        <div className="testimonials-item-content">
                            <div className="testimonials-item-profile">
                                <img src="/images/fp7.jpg" alt="" />
                            </div>
                            <div className="testimonials-item-center">
                                <p className="big-description white" >Amanda Foster</p>
                                <p className="description grey" >Consulting Firm Partner</p>
                            </div>
                            <p className="description white" >The email automation alone pays for itself. Our follow-up sequences convert 3x better, and I never worry about leads falling through the cracks anymore. Pure ROI.</p>
                        </div>
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item testimonials-item-last" >
                        <div className="testimonials-item-content testimonials-item-content-last">
                            <div className="testimonials-item-last-top">
                                <p className="description white" >Be our next client in this section!</p>
                            </div>
                            <p className="small-subheadline white hide-on-mobile" >Let us get you a coffee.</p>
                            <div className="contact-button-wrapper" style={{marginTop: 'clamp(16px, 4vw, 24px)'}}>
                                <button
                                    className="contact-button-white"
                                    onClick={handleContactClick}
                                    style={{
                                        padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
                                        fontSize: 'clamp(14px, 3vw, 16px)',
                                        borderRadius: 'clamp(8px, 2vw, 12px)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        minHeight: '44px' // Minimum touch target for mobile
                                    }}
                                >
                                    <span>
                                        <span className="contact-button-container-white">
                                            <span className="contact-button-primary-white"></span>
                                            <span className="contact-button-complimentary-white"></span>
                                        </span>
                                    </span>
                                    <span className="description black" style={{fontSize: 'clamp(14px, 3vw, 16px)'}}>Contact Me</span>
                                </button>
                            </div>
                        </div>
                        <div className="background-gradient-circle-3" />
                        <div className="testimonials-item-grid" />
                    </div>
                    <div className="testimonials-item-padding" />
                </div>
            </div>
        </div>

        <div className="testimonials-content-bottom">
            <div className="testimonials-content-bottom-buttons">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
            <div className="embla__progress">
                <div
                    className="embla__progress__bar"
                    style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
                />
            </div>
        </div>
    </div>
</section>
  );
};