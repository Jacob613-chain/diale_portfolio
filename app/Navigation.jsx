/* eslint-disable jsx-a11y/alt-text */
"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';

export const Navigation = () => {

    // ANIMATIONS

    const navigationBar = useRef()
    const navigationBarCenter = useRef()
    const navigationBarCenterRef1 = useRef()
    const navigationBarCenterRef2 = useRef()
    const navigationBarCenterRef3 = useRef()
    const navigationBarCenterRef4 = useRef()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useLayoutEffect(() => {
        gsap.to(navigationBar.current, { opacity: 1, rotateY: "0deg", scale: "1", rotateX: "0deg", translateY: "0vh", duration: 0.75, ease: 'power1', delay: 0.75 })
        gsap.fromTo(navigationBar.current, { width: "25%" }, { width: "100%", duration: 0.75, ease: "power1", delay: 1.75 })
        gsap.fromTo(navigationBarCenter.current, { display: "none" }, { display: "flex", duration: 0.01, delay: 1.75 })
        gsap.to(navigationBarCenterRef1.current, { opacity: 1, duration: 1, delay: 1.75 })
        gsap.to(navigationBarCenterRef2.current, { opacity: 1, duration: 1, delay: 1.85 })
        gsap.to(navigationBarCenterRef3.current, { opacity: 1, duration: 1, delay: 1.95 })
        gsap.to(navigationBarCenterRef4.current, { opacity: 1, duration: 1, delay: 2.05 })
    }, [])

    // NAVIGATION

    const router = useRouter();
    const pathname = usePathname();
    let isAnimating = false;
  
    const handleNavigate = (path) => {
        setIsMobileMenuOpen(false); // Close mobile menu when navigating
        router.push(path);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

  return (
    <div className="navigation-wrapper">
        <div className="navigation-inside" ref={navigationBar} >
            <div className="navigation-inside-left">
                <img src="/images/jose-logo.webp" className="navigation-inside-left-image" alt="" />
            </div>
            <div className="navigation-inside-big" ref={navigationBarCenter} >
                <p className="small-description white hover-text-white opacity" ref={navigationBarCenterRef1} onClick={() => handleNavigate('/')} >Home</p>
                <p className="small-description white hover-text-white opacity" ref={navigationBarCenterRef2} onClick={() => handleNavigate('/about')} >About</p>
                <p className="small-description white hover-text-white opacity" ref={navigationBarCenterRef3} onClick={() => handleNavigate('/works')} >Works</p>
                {/* <p className="small-description white hover-text-white opacity" ref={navigationBarCenterRef4} onClick={() => handleNavigate('/casestudies')} >Case Studies</p> */}
            </div>
            <div className="navigation-inside-right">
                <button className="button button-navigation button-transparent-border" onClick={() => handleNavigate('/contact')} >
                    <div className="button-content">
                        <span className="small-description">Contact</span>
                        <span className="small-description">Contact</span>
                    </div>
                    <div className="button-circle button-circle-white">
                        <ArrowUpRight className="button-icon" />
                    </div>
                </button>
            </div>
            <div
                className="navigation-inside-right-mobile"
                onClick={toggleMobileMenu}
                style={{
                    cursor: 'pointer',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '44px',
                    minHeight: '44px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div className="navigation-inside-right-mobile-line" style={{
                    width: '24px',
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease',
                    transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'
                }} />
                <div className="navigation-inside-right-mobile-line" style={{
                    width: '24px',
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease',
                    opacity: isMobileMenuOpen ? '0' : '1'
                }} />
                <div className="navigation-inside-right-mobile-line" style={{
                    width: '24px',
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease',
                    transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'
                }} />
            </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div
                className="mobile-menu-overlay"
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    zIndex: '9999',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 'clamp(24px, 6vw, 40px)',
                    animation: 'fadeIn 0.3s ease-in-out'
                }}
            >
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        cursor: 'pointer',
                        padding: '10px',
                        color: 'white',
                        fontSize: '24px'
                    }}
                >
                    ✕
                </div>

                <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 5vw, 32px)'}}>
                    <p
                        className="mobile-menu-item"
                        onClick={() => handleNavigate('/')}
                        style={{
                            fontSize: 'clamp(24px, 6vw, 32px)',
                            color: 'white',
                            cursor: 'pointer',
                            margin: '0',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                        }}
                    >
                        Home
                    </p>
                    <p
                        className="mobile-menu-item"
                        onClick={() => handleNavigate('/about')}
                        style={{
                            fontSize: 'clamp(24px, 6vw, 32px)',
                            color: 'white',
                            cursor: 'pointer',
                            margin: '0',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        About
                    </p>
                    <p
                        className="mobile-menu-item"
                        onClick={() => handleNavigate('/works')}
                        style={{
                            fontSize: 'clamp(24px, 6vw, 32px)',
                            color: 'white',
                            cursor: 'pointer',
                            margin: '0',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Works
                    </p>
                    <button
                        onClick={() => handleNavigate('/contact')}
                        style={{
                            fontSize: 'clamp(18px, 4vw, 24px)',
                            color: 'black',
                            backgroundColor: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            margin: '16px 0 0 0',
                            padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
                            borderRadius: 'clamp(8px, 2vw, 12px)',
                            transition: 'all 0.3s ease',
                            fontWeight: '500',
                            minHeight: '44px'
                        }}
                    >
                        Contact Me
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};