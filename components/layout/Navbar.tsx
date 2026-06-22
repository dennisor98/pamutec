'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import navigation from '@/lib/data/navigation.json';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navigation.mainNav.map(item => item.href.replace('#', ''));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.08);
        }
        .navbar.top {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          box-shadow: 0 1px 0 rgba(0,0,0,0.06);
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
        }
        .nav-logo-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(245,158,11,0.35);
        }
        .nav-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .nav-logo-name {
          font-size: 15px;
          font-weight: 800;
          color: #1e293b;
          letter-spacing: -0.3px;
        }
        .nav-logo-tagline {
          font-size: 10px;
          font-weight: 500;
          color: #d97706;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          position: relative;
          padding: 7px 14px;
          font-size: 13.5px;
          font-weight: 600;
          color: #475569;
          background: none;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.1px;
        }
        .nav-link:hover {
          color: #d97706;
          background: rgba(245,158,11,0.08);
        }
        .nav-link.active {
          color: #d97706;
          background: rgba(245,158,11,0.1);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: #d97706;
          border-radius: 2px;
        }
        .nav-admin-btn {
          margin-left: 12px;
          padding: 7px 16px;
          background: linear-gradient(135deg, #1e40af, #1d4ed8);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(30,64,175,0.25);
        }
        .nav-admin-btn:hover {
          background: linear-gradient(135deg, #1e3a8a, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(30,64,175,0.3);
        }
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .nav-hamburger:hover { background: rgba(0,0,0,0.05); }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #334155;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-hamburger.open span:nth-child(2) { opacity: 0; }
        .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(16px);
          padding: 12px 16px 20px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          z-index: 999;
          transform: translateY(-8px);
          opacity: 0;
          transition: all 0.25s ease;
        }
        .mobile-menu.open {
          display: block;
          transform: translateY(0);
          opacity: 1;
        }
        .mobile-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          font-size: 15px;
          font-weight: 600;
          color: #334155;
          background: none;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 2px;
        }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(245,158,11,0.1);
          color: #d97706;
        }
        .mobile-admin-link {
          display: block;
          margin-top: 12px;
          padding: 12px 16px;
          background: linear-gradient(135deg, #1e40af, #1d4ed8);
          color: white;
          border-radius: 10px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.3px;
        }
        .nav-spacer { height: 68px; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => scrollToSection('#home')} style={{background:'none', border:'none', padding:0}}>
            <div className="nav-logo-icon">☀️</div>
            <div className="nav-logo-text">
              <span className="nav-logo-name">Seven SS Stars Solar</span>
              <span className="nav-logo-tagline">We Lead, Others Follow</span>
            </div>
          </button>

          <div className="nav-links">
            {navigation.mainNav.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            {/* <Link href="/admin" className="nav-admin-btn">Admin</Link> */}
          </div>

          <button
            className={`nav-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navigation.mainNav.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            className={`mobile-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
        <Link href="/admin" className="mobile-admin-link">⚙️ Admin Dashboard</Link>
      </div> */}

      <div className="nav-spacer" />
    </>
  );
}
