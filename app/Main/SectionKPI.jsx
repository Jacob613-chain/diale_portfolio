import { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import SplitText from "gsap/src/SplitText";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cone, Globe, Send, User, Zap } from 'lucide-react';
import Marquee from "react-fast-marquee";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton, usePrevNextButtons} from "./Carousel/EmblaCarouselArrowButtons";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

export const SectionKPI = () => {

    const subheadlineBoxRef = useRef()
    const titleRef = useRef()
    const bentoBoxRef1 = useRef()
    const bentoBoxRef2 = useRef()
    const bentoBoxRef3 = useRef()
    const kpiCarouselRef = useRef()
    // const bentoBoxRef4 = useRef()

    // EMBLA CAROUSEL
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        containScroll: 'trimSnaps',
        dragFree: false,
        loop: false
    })
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

    useEffect(() => {

        // subheadline box animation
        gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

        // headline text animation
        const titleSplit = new SplitText(titleRef.current, { type: "words" });
        gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 100 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.085, duration: 1, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

        // kpi carousel animation
        gsap.to(kpiCarouselRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: kpiCarouselRef.current, start: "top 95%" }});

        // bento grid boxes animations (for desktop)
        gsap.fromTo(bentoBoxRef1.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', ease: 'power1', scrollTrigger: { trigger: bentoBoxRef1.current, start: "top bottom" }});
        gsap.fromTo(bentoBoxRef2.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { delay: 0.2, rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', ease: 'power1', scrollTrigger: { trigger: bentoBoxRef2.current, start: "top bottom" }});
        gsap.fromTo(bentoBoxRef3.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { delay: 0.4, rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', ease: 'power1', scrollTrigger: { trigger: bentoBoxRef3.current, start: "top bottom" } });

    }, [])

    return (
        <section className="kpi">
            <div className="kpi-content">
                <div className="textbox">
                    <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
                        <Zap className="subheadline-box-icon" />
                        <h2 className="small-description grey" >Show Me the Money (Proof)</h2>
                    </div>
                    <div className="titlebox">
                        <div className="titlebox-gradient" />
                        <h1 className="subheadline white" ref={titleRef} >Results That Pay Off</h1>
                    </div>
                </div>
                {/* Desktop Version */}
                <div className="kpi-content-row hide-on-mobile">
                    <div className="kpi-content-item" ref={bentoBoxRef1} >
                        <div className="kpi-item-textbox">
                            <div className="kpi-item-textbox-top">
                                <div className="kpi-item-textbox-number">
                                    <h2 className="headline kpi-item-textbox-number-text white" >120</h2>
                                    <div className="kpi-item-textbox-number-gradient" />
                                </div>
                                <h3 className="small-subheadline kpi-item-textbox-top-text white" >hours/month</h3>
                            </div>
                            <p className="description grey" >Saved for a real estate firm by <br /> automating CRM + lead follow-ups</p>
                        </div>
                        <div className="kpi-item-button" >
                            <Globe className="kpi-item-button-icon" />
                        </div>
                        <div className="kpi-item-grid" />
                    </div>
                    <div className="kpi-content-item" ref={bentoBoxRef2} >
                        <div className="kpi-item-textbox">
                            <div className="kpi-item-textbox-top">
                                <div className="kpi-item-textbox-number">
                                    <h2 className="headline kpi-item-textbox-number-text white" >$5K</h2>
                                    <div className="kpi-item-textbox-number-gradient" />
                                </div>
                                <h3 className="small-subheadline kpi-item-textbox-top-text white" >monthly savings</h3>
                            </div>
                            <p className="description grey" >Cut in admin + ad spend for a clinic <br /> with AI-driven marketing</p>
                        </div>
                        <div className="kpi-item-button" >
                            <User className="kpi-item-button-icon" />
                        </div>
                        <div className="kpi-item-grid" />
                    </div>
                    <div className="kpi-content-item" ref={bentoBoxRef3} >
                        <div className="kpi-item-textbox">
                            <div className="kpi-item-textbox-top">
                                <div className="kpi-item-textbox-number">
                                    <h2 className="headline kpi-item-textbox-number-text white" >35%</h2>
                                    <div className="kpi-item-textbox-number-gradient" />
                                </div>
                                <h3 className="small-subheadline kpi-item-textbox-top-text white" >conversion boost</h3>
                            </div>
                            <p className="description grey" >By aligning branding, website copy, <br /> and automated email journeys</p>
                        </div>
                        <div className="kpi-item-button" >
                            <Cone className="kpi-item-button-icon" />
                        </div>
                        <div className="kpi-item-grid" />
                    </div>
                </div>

                {/* Mobile Carousel Version */}
                <div className="opacity-blur hide-on-desktop" ref={kpiCarouselRef} >
                    <div className="kpi-carousel" ref={emblaRef} >
                        <div className="kpi-carousel-row">
                            <div className="kpi-item-padding" />
                            <div className="kpi-content-item" >
                                <div className="kpi-item-textbox">
                                    <div className="kpi-item-textbox-top">
                                        <div className="kpi-item-textbox-number">
                                            <h2 className="headline kpi-item-textbox-number-text white" >Real Estate</h2>
                                            <div className="kpi-item-textbox-number-gradient" />
                                        </div>
                                        <h3 className="small-subheadline kpi-item-textbox-top-text white" >& Property Management</h3>
                                    </div>
                                    <p className="description grey" >Automated lead gen + branded campaigns</p>
                                </div>
                                <div className="kpi-item-button" >
                                    <Globe className="kpi-item-button-icon" />
                                </div>
                                <div className="kpi-item-grid" />
                            </div>
                            <div className="kpi-content-item" >
                                <div className="kpi-item-textbox">
                                    <div className="kpi-item-textbox-top">
                                        <div className="kpi-item-textbox-number">
                                            <h2 className="headline kpi-item-textbox-number-text white" >Healthcare</h2>
                                            <div className="kpi-item-textbox-number-gradient" />
                                        </div>
                                        <h3 className="small-subheadline kpi-item-textbox-top-text white" >& Clinics</h3>
                                    </div>
                                    <p className="description grey" >Less paperwork, more patient-facing time</p>
                                </div>
                                <div className="kpi-item-button" >
                                    <User className="kpi-item-button-icon" />
                                </div>
                                <div className="kpi-item-grid" />
                            </div>
                            <div className="kpi-content-item" >
                                <div className="kpi-item-textbox">
                                    <div className="kpi-item-textbox-top">
                                        <div className="kpi-item-textbox-number">
                                            <h2 className="headline kpi-item-textbox-number-text white" >Agencies</h2>
                                            <div className="kpi-item-textbox-number-gradient" />
                                        </div>
                                        <h3 className="small-subheadline kpi-item-textbox-top-text white" >& Startups</h3>
                                    </div>
                                    <p className="description grey" >Faster delivery, sharper branding, automated growth engines</p>
                                </div>
                                <div className="kpi-item-button" >
                                    <Cone className="kpi-item-button-icon" />
                                </div>
                                <div className="kpi-item-grid" />
                            </div>
                            <div className="kpi-content-item" >
                                <div className="kpi-item-textbox">
                                    <div className="kpi-item-textbox-top">
                                        <div className="kpi-item-textbox-number">
                                            <h2 className="headline kpi-item-textbox-number-text white" >Service</h2>
                                            <div className="kpi-item-textbox-number-gradient" />
                                        </div>
                                        <h3 className="small-subheadline kpi-item-textbox-top-text white" >Businesses</h3>
                                    </div>
                                    <p className="description grey" >Client support + marketing that works 24/7 without staff overhead</p>
                                </div>
                                <div className="kpi-item-button" >
                                    <Send className="kpi-item-button-icon" />
                                </div>
                                <div className="kpi-item-grid" />
                            </div>
                            <div className="kpi-item-padding" />
                        </div>
                    </div>
                </div>

                {/* Mobile Carousel Controls */}
                <div className="kpi-content-bottom hide-on-desktop">
                    <div className="kpi-content-bottom-buttons">
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







