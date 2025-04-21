import Navbar from "../../components/navbar/navbar";
import Radar from "../../components/radar/radar";
import Footer from "../../components/footer/footer";
import HowItWorksSection from "./HowItWorksSection";
import "./homepage.css";
import {
  FaShieldAlt,
  FaSearch,
  FaFileAlt,
  FaChartLine,
  FaArrowRight,
  FaUserSecret,
  FaGlobe,
  FaFileContract,
  FaDatabase,
  FaUsers,
  FaGlobeAmericas,
  FaChartPie,
} from "react-icons/fa";
import { useEffect, useRef, useState, RefObject } from "react";
import { Link } from "react-router-dom";

interface HomepageProps {
  openCaseModal: () => void;
}

const Homepage = ({ openCaseModal }: HomepageProps) => {
  const [countVisible, setCountVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(
    null
  ) as RefObject<HTMLDivElement>;
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState("name");

  const [counts, setCounts] = useState({
    platforms: 0,
    users: 0,
    intelligence: 0,
  });

  const targets = {
    platforms: 6.7,
    users: 4.95,
    intelligence: 30,
  };

  // Handle testimonial navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((current) => (current === 2 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((current) => (current === 0 ? 2 : current - 1));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setCountVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => {
      if (metricsRef.current) {
        observer.unobserve(metricsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!countVisible) return;

    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounts({
        platforms: Number((progress * targets.platforms).toFixed(1)),
        users: Number((progress * targets.users).toFixed(2)),
        intelligence: Math.floor(progress * targets.intelligence),
      });

      if (frame === totalFrames) {
        clearInterval(counter);
        setCounts(targets);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [countVisible]);

  // Auto-rotate testimonials
  useEffect(() => {
    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((current) => (current === 2 ? 0 : current + 1));
    }, 6000); // Change slide every 6 seconds

    return () => {
      if (sliderTimerRef.current) {
        clearInterval(sliderTimerRef.current);
      }
    };
  }, []);

  // Reset timer when manually changing slides
  useEffect(() => {
    if (sliderTimerRef.current) {
      clearInterval(sliderTimerRef.current);
    }

    sliderTimerRef.current = setInterval(() => {
      setCurrentSlide((current) => (current === 2 ? 0 : current + 1));
    }, 6000);

    return () => {
      if (sliderTimerRef.current) {
        clearInterval(sliderTimerRef.current);
      }
    };
  }, [currentSlide]);

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Get placeholder text based on active tab
  const getPlaceholderText = () => {
    switch (activeTab) {
      case "username":
        return "Enter a Username";
      case "phone":
        return "Enter a Phone Number";
      case "email":
        return "Enter an Email";
      default:
        return "Enter a Name";
    }
  };

  return (
    <div className="homepage" ref={scrollContainerRef}>
      <Navbar
        scrollContainerRef={scrollContainerRef}
        openCaseModal={openCaseModal}
      />

      <div className="hero-section">
        <div className="hero-content">
          <div className="ai-badge">With the power of AI ✨</div>

          <h1>Protect your business with Webutation</h1>

          <p className="hero-subtitle">
            Empower your decision-making and safeguard against fraud with
            comprehensive social intelligence solution.
          </p>

          <button onClick={openCaseModal} className="cta-button">
            Refer a Case
          </button>
        </div>

        <Radar />
      </div>

      <HowItWorksSection
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        getPlaceholderText={getPlaceholderText}
      />

      <div className="about-us-section">
        <div className="about-us-content">
          <div className="section-header">
            <h2>About Us</h2>
            <div className="section-divider">
              <span className="divider-line"></span>
              <span className="divider-circle"></span>
              <span className="divider-line"></span>
            </div>
          </div>

          <p className="about-us-description">
            Webutation uses advanced OSINT techniques to prevent insurance fraud
            through detailed digital analysis. We deliver accurate, legally
            defensible reports to protect businesses.
          </p>

          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Fraud Prevention</h3>
              <p>
                Advanced techniques to identify and prevent insurance fraud
                across digital platforms.
              </p>
              <a href="#" className="feature-card-link">
                Learn more <FaArrowRight />
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaSearch />
              </div>
              <h3>OSINT Expertise</h3>
              <p>
                Specialized intelligence gathering and analysis using
                cutting-edge methodologies.
              </p>
              <a href="#" className="feature-card-link">
                Learn more <FaArrowRight />
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaFileAlt />
              </div>
              <h3>Defensible Reports</h3>
              <p>
                Legally sound documentation with irrefutable evidence for case
                resolution.
              </p>
              <a href="#" className="feature-card-link">
                Learn more <FaArrowRight />
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Advanced Analysis</h3>
              <p>
                Comprehensive tracking and pattern analysis for superior risk
                assessment.
              </p>
              <a href="#" className="feature-card-link">
                Learn more <FaArrowRight />
              </a>
            </div>
          </div>

          <div className="about-us-cta">
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>

        <div className="digital-connections-graphic">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="connections-svg"
          >
            <circle
              cx="60"
              cy="60"
              r="45"
              stroke="#1752b6"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              cx="60"
              cy="60"
              r="60"
              stroke="#1752b6"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
            <circle
              cx="60"
              cy="60"
              r="30"
              fill="rgba(23, 82, 182, 0.05)"
              stroke="#1752b6"
              strokeWidth="1"
            />
            <circle cx="25" cy="35" r="5" fill="#1752b6" />
            <circle cx="90" cy="25" r="4" fill="#1752b6" />
            <circle cx="95" cy="70" r="6" fill="#1752b6" />
            <circle cx="35" cy="95" r="5" fill="#1752b6" />
            <path d="M60 60L25 35" stroke="#1752b6" strokeWidth="0.7" />
            <path d="M60 60L90 25" stroke="#1752b6" strokeWidth="0.7" />
            <path d="M60 60L95 70" stroke="#1752b6" strokeWidth="0.7" />
            <path d="M60 60L35 95" stroke="#1752b6" strokeWidth="0.7" />
          </svg>
        </div>
      </div>

      <div className="why-section">
        <div className="why-bg-elements">
          <div className="why-circle circle1"></div>
          <div className="why-circle circle2"></div>
          <div className="why-lines"></div>
        </div>

        <div className="why-content">
          <div className="section-header">
            <h2>Why Webutation?</h2>
            <div className="section-divider">
              <span className="divider-line"></span>
              <span className="divider-circle"></span>
              <span className="divider-line"></span>
            </div>
          </div>

          <div className="why-grid">
            <div className="why-item">
              <div className="why-item-inner">
                <div className="why-icon">
                  <FaUserSecret />
                </div>
                <div className="why-text">
                  <h3>Expert Leadership</h3>
                  <p>
                    Founded by an experienced Private Investigator with
                    extensive field expertise in digital forensics and
                    intelligence gathering.
                  </p>
                </div>
                <div className="why-item-decoration"></div>
              </div>
            </div>

            <div className="why-item">
              <div className="why-item-inner">
                <div className="why-icon">
                  <FaGlobe />
                </div>
                <div className="why-text">
                  <h3>US-Based Analysts</h3>
                  <p>
                    All analysis is performed by our skilled team of US-based
                    intelligence specialists with advanced training in digital
                    investigation.
                  </p>
                </div>
                <div className="why-item-decoration"></div>
              </div>
            </div>

            <div className="why-item">
              <div className="why-item-inner">
                <div className="why-icon">
                  <FaFileContract />
                </div>
                <div className="why-text">
                  <h3>Professional Presentation</h3>
                  <p>
                    Findings are presented professionally to clients with clear,
                    actionable insights and comprehensive documentation.
                  </p>
                </div>
                <div className="why-item-decoration"></div>
              </div>
            </div>

            <div className="why-item">
              <div className="why-item-inner">
                <div className="why-icon">
                  <FaDatabase />
                </div>
                <div className="why-text">
                  <h3>Extensive Data Reach</h3>
                  <p>
                    Our data searches are exceptionally thorough, accessing
                    specialized databases and sources unavailable to most
                    investigators.
                  </p>
                </div>
                <div className="why-item-decoration"></div>
              </div>
            </div>
          </div>

          <div className="why-cta">
            <button className="cta-button">Start Your Investigation</button>
          </div>
        </div>
      </div>

      <div className="metrics-section" ref={metricsRef}>
        <div className="metrics-header">
          <h2>Social Media By The Numbers</h2>
          <p>
            Discover how our online presence is shaped by social media platforms
            and why monitoring these digital footprints is crucial in today's
            connected world.
          </p>
        </div>
        <div className="metrics-container">
          <div className={`metric-item ${countVisible ? "animated" : ""}`}>
            <div className="metric-circle">
              <div className="metric-icon">
                <FaUsers />
              </div>
              <div className="metric-number">{counts.platforms.toFixed(1)}</div>
            </div>
            <p className="metric-description">
              Average of 6.7 various social media platforms / user
            </p>
          </div>

          <div className={`metric-item ${countVisible ? "animated" : ""}`}>
            <div className="metric-circle">
              <div className="metric-icon">
                <FaGlobeAmericas />
              </div>
              <div className="metric-number">
                {counts.users.toFixed(2).replace(".", ",")}
                <span className="metric-unit">BLN</span>
              </div>
            </div>
            <p className="metric-description">
              4.95 billion people currently use social media
            </p>
          </div>

          <div className={`metric-item ${countVisible ? "animated" : ""}`}>
            <div className="metric-circle">
              <div className="metric-icon">
                <FaChartPie />
              </div>
              <div className="metric-number">
                {counts.intelligence}
                <span className="metric-unit">%</span>
              </div>
            </div>
            <p className="metric-description">
              30% of actionable intelligence comes from friends' social accounts
            </p>
          </div>
        </div>
      </div>

      <div className="testimonial-cta-section">
        <div className="testimonial-cta-bg">
          <div className="animated-wave"></div>
          <div className="spotlight"></div>
        </div>

        <div className="section-title">
          <h2>What Our Clients Say</h2>
          <div className="section-divider">
            <span className="divider-line"></span>
            <span className="divider-circle"></span>
            <span className="divider-line"></span>
          </div>
        </div>

        <div className="testimonial-container">
          <div className="testimonial-slider">
            <div
              className={`testimonial-slide ${
                currentSlide === 0 ? "active" : ""
              }`}
            >
              <div className="testimonial-card">
                <div className="testimonial-quote-open">"</div>
                <div className="testimonial-quote-close">"</div>
                <p className="testimonial-text">
                  Webutation's intelligence platform identified a complex fraud
                  pattern that saved our company over $2.3M. Their insights were
                  revolutionary.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <div className="author-initial">J</div>
                  </div>
                  <div className="author-info">
                    <p className="author-name">James Wilson</p>
                    <p className="author-position">Chief Risk Officer</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`testimonial-slide ${
                currentSlide === 1 ? "active" : ""
              }`}
            >
              <div className="testimonial-card">
                <div className="testimonial-quote-open">"</div>
                <div className="testimonial-quote-close">"</div>
                <p className="testimonial-text">
                  The depth of information that Webutation uncovered was
                  remarkable. They found critical social media evidence that
                  completely changed the trajectory of our case.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <div className="author-initial">S</div>
                  </div>
                  <div className="author-info">
                    <p className="author-name">Sarah Johnson</p>
                    <p className="author-position">Legal Director</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`testimonial-slide ${
                currentSlide === 2 ? "active" : ""
              }`}
            >
              <div className="testimonial-card">
                <div className="testimonial-quote-open">"</div>
                <div className="testimonial-quote-close">"</div>
                <p className="testimonial-text">
                  Our investigation time was cut in half thanks to Webutation's
                  comprehensive platform. What would have taken weeks was
                  completed in days with greater precision.
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <div className="author-initial">M</div>
                  </div>
                  <div className="author-info">
                    <p className="author-name">Michael Chen</p>
                    <p className="author-position">Head of Security</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-arrows">
            <button
              className="testimonial-arrow prev"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              className="testimonial-arrow next"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

        <div className="testimonial-nav">
          <button
            className={`nav-dot ${currentSlide === 0 ? "active" : ""}`}
            onClick={() => goToSlide(0)}
            aria-label="Go to testimonial 1"
          ></button>
          <button
            className={`nav-dot ${currentSlide === 1 ? "active" : ""}`}
            onClick={() => goToSlide(1)}
            aria-label="Go to testimonial 2"
          ></button>
          <button
            className={`nav-dot ${currentSlide === 2 ? "active" : ""}`}
            onClick={() => goToSlide(2)}
            aria-label="Go to testimonial 3"
          ></button>
        </div>

        <div className="final-cta-container">
          <h2>Ready to uncover the hidden truth?</h2>
          <div className="cta-buttons">
            <button className="cta-button primary">
              Start Now
              <span className="button-icon">→</span>
            </button>
            <button className="cta-button outline">
              Contact Us
              <span className="button-icon">↗</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
