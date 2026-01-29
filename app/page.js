'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Scene from '@/components/Scene'

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target)
            if (index !== -1) setCurrentSection(index)
          }
        })
      },
      { threshold: 0.6 }
    )

    sectionRefs.current.forEach((s) => s && observer.observe(s))
    return () => sectionRefs.current.forEach((s) => s && observer.unobserve(s))
  }, [])

  const scrollToSection = useCallback((index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const sectionStyle = {
    minHeight: '100vh',
    scrollSnapAlign: 'start',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8vw'
  }

  return (
    <main
      style={{
        scrollSnapType: 'y mandatory',
        overflowY: 'scroll',
        height: '100vh'
      }}
    >
      <Scene currentSection={currentSection} />

      {/* HERO (WHITE – ZIGZAG) */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        style={{
          ...sectionStyle,
          background: `
            #fff
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20' viewBox='0 0 80 20'%3E%3Cpolyline points='0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10' fill='none' stroke='rgba(0,0,0,0.15)' stroke-width='1'/%3E%3C/svg%3E")
            repeat
          `,
          color: '#000',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: 'clamp(3.5rem,6vw,5rem)', fontWeight: 600 }}>
            Welcome
          </h1>

          <p style={{ marginTop: 20, fontSize: '1.2rem', lineHeight: 1.7 }}>
            A focused 3D interface built with intention.
            No decoration. No noise. Only structure, motion, and clarity.
          </p>

          <div style={{ marginTop: 36, display: 'flex', gap: 20 }}>
            <button
              onClick={() => scrollToSection(1)}
              style={{
                padding: '14px 40px',
                background: '#000',
                color: '#fff',
                border: 'none',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Explore
            </button>

            <button
              onClick={() => scrollToSection(2)}
              style={{
                padding: '14px 40px',
                background: 'transparent',
                color: '#000',
                border: '1px solid #000',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Contact
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }} />
      </section>

      {/* ABOUT (BLACK – DOTS) */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        style={{
          ...sectionStyle,
          background: `
            #000
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='rgba(255,255,255,0.15)'/%3E%3C/svg%3E")
            repeat
          `,
          color: '#fff',
          justifyContent: 'flex-end'
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 600, marginBottom: 24 }}>
            About this site
          </h2>

          <p style={{ lineHeight: 1.8, color: '#ccc', marginBottom: 16 }}>
            The laptop model reacts to scroll position and section intent,
            acting as a visual anchor instead of decoration.
          </p>

          <p style={{ lineHeight: 1.8, color: '#ccc', marginBottom: 16 }}>
            Every animation has a reason. Every transition has weight.
            Nothing is random.
          </p>

          <p style={{ lineHeight: 1.8, color: '#ccc' }}>
            This is what happens when design and engineering agree.
          </p>
        </div>
      </section>

      {/* CONTACT (WHITE – TRIANGLES) */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        style={{
          ...sectionStyle,
          background: `
            #fff
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpolygon points='30,0 60,52 0,52' fill='none' stroke='rgba(0,0,0,0.15)' stroke-width='1'/%3E%3C/svg%3E")
            repeat
          `,
          color: '#000',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <div>
          <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 600 }}>
            contact@example.com
          </h2>

          <p style={{ marginTop: 16, fontSize: '1.1rem', color: '#333' }}>
            Let’s build something serious.
          </p>

          <div style={{ marginTop: 40 }}>
            <a
              href="mailto:contact@example.com"
              style={{
                padding: '14px 44px',
                background: '#000',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-block'
              }}
            >
              Send Email
            </a>
          </div>
        </div>
      </section>

      {/* DOT NAV */}
      <div
        style={{
          position: 'fixed',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          zIndex: 20
        }}
      >
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: 'none',
              background: currentSection === i ? '#000' : 'rgba(0,0,0,0.3)',
              transform: currentSection === i ? 'scale(1.4)' : 'scale(1)',
              transition: '0.3s',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </main>
  )
}
