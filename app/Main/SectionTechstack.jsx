/* eslint-disable react/jsx-key */
import React, { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronRight, Hand, Layers, Link, Send } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { PrevButton, NextButton, usePrevNextButtons} from "./Carousel/EmblaCarouselArrowButtons"
import { DotButton, useDotButton } from './Carousel/EmblaCarouselDotButton'
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TWEEN_FACTOR_BASE = 0.25

const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max)

export const SectionTechstack = () => {

    // GSAP ANIMATIONS

    const subheadlineBoxRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const bentoBoxRef1 = useRef()
    const bentoBoxRef2 = useRef()
    const bentoBoxRef3 = useRef()

    useEffect(() => {

    // subheadline box animation
    gsap.to(subheadlineBoxRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1', scrollTrigger: { trigger: subheadlineBoxRef.current, start: "top 95%" }});

    // headline text animation
    const titleSplit = new SplitText(titleRef.current, { type: "words" });
    gsap.fromTo(titleSplit.words, { 'will-change': 'opacity, transform', filter: 'blur(8px)', opacity: 0, yPercent: 50 }, { opacity: 1, filter: 'blur(0px)', yPercent: 0, stagger: 0.05, duration: 0.75, ease: "power2", scrollTrigger: { trigger: titleRef.current, start: "top 95%" } });

    // description text animation
    const descriptionSplit = new SplitText(descriptionRef.current, { type: "words" });
    gsap.fromTo(descriptionSplit.words, { filter: 'blur(8px)', opacity: 0 }, { opacity: 1, filter: 'blur(0px)', stagger: 0.025, ease: 'sine', scrollTrigger: { trigger: descriptionRef.current, start: "top 95%" } });

    // bento grid boxes animations
    gsap.fromTo(bentoBoxRef1.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', scrollTrigger: { trigger: bentoBoxRef1.current, start: "top bottom" }});
    gsap.fromTo(bentoBoxRef2.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', scrollTrigger: { trigger: bentoBoxRef2.current, start: "top bottom" }});
    const addClassnames = () => {
        const cards = document.querySelectorAll(".techstack-item-card");
        cards.forEach((card, index) => {
            card.classList.add(`techstack-item-card-animated-${index + 1}`);
        });
        setTimeout(() => {
            cards.forEach((card) => {
            card.classList.add("techstack-item-card-animated-hover");
        });
        }, 1250);
    };
    gsap.fromTo(bentoBoxRef3.current, { rotationY: 30, scale: 0.6, opacity: 0 }, { delay: 0.2, rotationY: 0, scale: 1, opacity: 1, duration: 0.75, ease: 'power1', scrollTrigger: { trigger: bentoBoxRef3.current, start: "top bottom" }, onComplete: addClassnames });

    }, [])

    // VIDEO
    const videoRef = useRef(null);

    const handleVideoButtonClick = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    // EMBLA CAROUSEL

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false });

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

    const tweenFactor = useRef(0);
    const tweenNodes = useRef([]);
    
    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
    } = usePrevNextButtons(emblaApi);
    
    const setTweenNodes = useCallback((emblaApi) => {
      tweenNodes.current = emblaApi
        .slideNodes()
        .map((slideNode) =>
          slideNode.querySelector('.techstack-item-content-column-slider-item-child')
        );
    }, []);
    
    const setTweenFactor = useCallback((emblaApi) => {
      tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);
    
    const tweenEffects = useCallback((emblaApi, eventName) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';
    
      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];
    
        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;
    
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
    
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
    
                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }
    
          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
    
          // Apply scale effect
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
          }
    
          // Apply opacity effect
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    }, []);
    
    useEffect(() => {
      if (!emblaApi) return;
    
      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenEffects(emblaApi);
    
      emblaApi
        .on('reInit', setTweenNodes)
        .on('reInit', setTweenFactor)
        .on('reInit', tweenEffects)
        .on('scroll', tweenEffects)
        .on('slideFocus', tweenEffects);
    }, [emblaApi, setTweenNodes, setTweenFactor, tweenEffects]);

    const slideDescriptions = [
        "Manual data entry → Automated reports + CRM updates",
        "Forgotten follow-ups → AI-driven lead nurturing",
        "Inconsistent social media → Auto-generated branded content",
        "High ad costs → AI-optimized marketing campaigns",
        "Overwhelmed inbox → Smart email sorting + replies",
        "Brand confusion → Clear brand systems + messaging that sells"
    ];

  return (
    <section className="techstack">
        <div className="techstack-content">
            <div className="textbox">
                <div className="subheadline-box opacity-blur" ref={subheadlineBoxRef} >
                    <Layers className="subheadline-box-icon" />
                    <h2 className="small-description grey" >What We Replace & Upgrade with AI</h2>
                </div>
                <div className="titlebox">
                    <div className="titlebox-big-gradient" />
                    <h1 className="subheadline white" ref={titleRef} >From Messy to Money-Making</h1>
                </div>
                <p className="description grey" ref={descriptionRef} >We integrate everything—HubSpot, Salesforce, GoHighLevel, Slack, Gmail, Zapier, Meta Ads, and more—into one simple, automated growth machine.</p>
            </div>
            <div className="techstack-container">
                <div className="techstack-item-big techstack-item-no-padding" ref={bentoBoxRef1} >
                    <div className="techstack-item-content">
                        <div className="techstack-item-content-center">
                            <div className="textbox">
                                <h2 className="small-subheadline white hide-on-mobile" >AI-Powered <br /> Transformation</h2>
                                <button className="button hero-button button-transparent-border" onClick={handleVideoButtonClick} >
                                    <div className="button-content">
                                        <span className="small-description">See Integration</span>
                                        <span className="small-description">See Integration</span>
                                    </div>
                                    <div className="button-circle button-circle-white">
                                        <ArrowUpRight className="button-icon button-icon-180" />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <video className="techstack-item-content-video" ref={videoRef} src="/videos/logos.mp4" alt="Duotone" muted playsInline={true} data-wf-ignore="true" loop  />
                    </div>
                    <div className="background-gradient-circle" />
                    <div className="techstack-item-no-padding-border" />
                </div>
                <div className="techstack-item-small techstack-item-small-mobile-big" ref={bentoBoxRef2} >
                    <div className="techstack-item-content">
                        <div className="techstack-item-content-column">
                            <div className="techstack-item-content-column-slider">
                                <img src="/images/abs.webp" className="techstack-item-content-column-slider-image" alt="" />
                                <div className="techstack-item-content-column-slider-carousel" ref={emblaRef} >
                                    <div className="techstack-item-content-column-slider-carousel-row">
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/zapier-logo.svg" className="techstack-item-content-column-slider-item-image" alt="Zapier" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/make-logo.svg" className="techstack-item-content-column-slider-item-image" alt="Make.com" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/n8n-logo.svg" className="techstack-item-content-column-slider-item-image" alt="n8n" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/hubspot-logo.svg" className="techstack-item-content-column-slider-item-image" alt="HubSpot" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/salesforce-logo.svg" className="techstack-item-content-column-slider-item-image" alt="Salesforce" />
                                            </div>
                                        </div>
                                        <div className="techstack-item-content-column-slider-item">
                                            <div className="techstack-item-content-column-slider-item-child">
                                                <img src="/logos/gohighlevel-logo.svg" className="techstack-item-content-column-slider-item-image" alt="GoHighLevel" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="techstack-item-content-column-textbox">
                                <h2 className="small-subheadline white" >Before → After</h2>
                                <motion.p
                                    key={selectedIndex}
                                    className="description grey"
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {slideDescriptions[selectedIndex]}
                                </motion.p>
                            </div>
                            <div className="techstack-item-content-column-border" />
                            <div className="techstack-item-content-column-bottom">
                                <div className="techstack-item-content-column-bottom-left">
                                    <button className=" button techstack-item-content-column-bottom-button" onClick={onPrevButtonClick} >
                                        <div className="button-content">
                                            <span className="small-description">Previous</span>
                                            <span className="small-description">Previous</span>
                                        </div>
                                    </button>
                                </div>
                                <div className="techstack-item-content-column-bottom-center">
                                    <div className="embla__dots-small">
                                        {scrollSnaps.map((_, index) => (
                                            <DotButton
                                                key={index}
                                                onClick={() => onDotButtonClick(index)}
                                                className={'embla__dot-small'.concat(
                                                    index === selectedIndex ? ' embla__dot--selected-small' : ''
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="techstack-item-content-column-bottom-right">
                                    <button className="button techstack-item-content-column-bottom-button" onClick={onNextButtonClick} >
                                        <div className="button-content">
                                            <span className="small-description">Continue</span>
                                            <span className="small-description">Continue</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="background-gradient-circle" />
                </div>
                <div className="techstack-item-small bentoBoxRef3" ref={bentoBoxRef3} >
                    <div className="techstack-item-content-cards">
                        <div className="techstack-item-content-textbox">
                            <h2 className="small-subheadline white" >Integration Hub</h2>
                            <p className="description grey" >All your tools connected and automated for seamless business operations.</p>
                        </div>
                        <div className="techstack-item-cards">
                            <div className="techstack-item-card techstack-item-card-1" >
                                <div className="techstack-item-card-content techstack-item-card-content-1">
                                    <div className="techstack-item-card-content-top">
                                        <p className="description white" >HubSpot</p>
                                        <img src="/logos/hubspot-logo.svg" className="techstack-item-card-content-top-image" alt="HubSpot" />
                                    </div>
                                    <div className="techstack-item-card-content-bottom">
                                        <p className="small-description grey" >CRM automatically updated with lead data. Follow-up sequences triggered.</p>
                                    </div>
                                    <p className="small-description grey" >Auto-Sync</p>
                                </div>
                            </div>
                            <div className="techstack-item-card techstack-item-card-2" >
                                <div className="techstack-item-card-content techstack-item-card-content-2">
                                    <div className="techstack-item-card-content-top">
                                        <p className="description white" >Make.com</p>
                                        <img src="/logos/make-logo.svg" className="techstack-item-card-content-top-image" alt="Make.com" />
                                    </div>
                                    <div className="techstack-item-card-content-bottom">
                                        <p className="small-description grey" >Complex workflows automated. Multi-step processes running seamlessly.</p>
                                    </div>
                                    <p className="small-description grey" >Live</p>
                                </div>
                            </div>
                            <div className="techstack-item-card techstack-item-card-3" >
                                <div className="techstack-item-card-content">
                                    <div className="techstack-item-card-content-top">
                                        <p className="description white" >Zapier</p>
                                        <img src="/logos/zapier-logo.svg" className="techstack-item-card-content-top-image" alt="Zapier" />
                                    </div>
                                    <div className="techstack-item-card-content-bottom">
                                        <p className="small-description grey" >All systems connected. Data flows seamlessly between platforms.</p>
                                    </div>
                                    <p className="small-description grey" >Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="background-gradient-circle-2" />
                </div>
            </div>
        </div>
    </section>
  );
};