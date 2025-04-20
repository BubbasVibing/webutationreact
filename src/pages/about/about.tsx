import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import './about.css';
import { FaShieldAlt, FaSearch, FaFileAlt, FaChartLine, FaUsers, FaGlobeAmericas, FaAward, FaHandshake } from 'react-icons/fa';

interface AboutProps {
  openCaseModal: () => void;
}

const About: React.FC<AboutProps> = ({ openCaseModal }) => {
  const [visibleSections, setVisibleSections] = useState({
    story: false,
    mission: false,
    team: false,
    values: false
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace('-section', '');
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (storyRef.current) observer.observe(storyRef.current);
    if (missionRef.current) observer.observe(missionRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="about-wrapper" ref={scrollContainerRef}>
      <Navbar 
        scrollContainerRef={scrollContainerRef as RefObject<HTMLDivElement>} 
        openCaseModal={openCaseModal} 
      />
      
      <div className="about-content">
        <div className="about-hero">
          <div className="hero-content">
            <h1>Our Story</h1>
            <p>Securing businesses through intelligence and expertise</p>
          </div>
          <div className="hero-overlay"></div>
        </div>
        
        <div id="story-section" className="about-section story" ref={storyRef}>
          <div className={`section-content ${visibleSections.story ? 'visible' : ''}`}>
            <div className="section-header">
              <span className="section-badge">Who We Are</span>
              <h2>Founded by expertise, driven by integrity</h2>
              <div className="section-divider">
                <span className="divider-line"></span>
                <span className="divider-circle"></span>
                <span className="divider-line"></span>
              </div>
            </div>
            
            <div className="story-content">
              <div className="story-image">
                <div className="image-container">
                  <div className="image-backdrop"></div>
                </div>
              </div>
              
              <div className="story-text">
                <p>Webutation was founded by a team of seasoned private investigators and digital security experts with a vision to revolutionize how businesses protect themselves in an increasingly complex digital landscape.</p>
                
                <p>After years of witnessing the devastating effects of insurance fraud and online threats on businesses of all sizes, our founders recognized the need for a solution that combined traditional investigative skills with cutting-edge technology.</p>
                
                <p>Since our inception, we've established ourselves as industry leaders by developing a unique approach to digital intelligence that delivers actionable insights while maintaining the highest ethical standards.</p>
                
                <p>Today, Webutation serves clients across multiple industries, providing them with the tools and intelligence they need to make informed decisions and protect their interests in an ever-changing digital environment.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="mission-section" className="about-section mission" ref={missionRef}>
          <div className={`section-content ${visibleSections.mission ? 'visible' : ''}`}>
            <div className="section-header light">
              <span className="section-badge">Our Mission</span>
              <h2>Providing clarity in a complex digital world</h2>
              <div className="section-divider">
                <span className="divider-line"></span>
                <span className="divider-circle"></span>
                <span className="divider-line"></span>
              </div>
            </div>
            
            <div className="mission-content">
              <div className="mission-card">
                <div className="mission-icon">
                  <FaShieldAlt />
                </div>
                <h3>Protect</h3>
                <p>We safeguard businesses from fraud and misinformation through comprehensive intelligence gathering and analysis.</p>
              </div>
              
              <div className="mission-card">
                <div className="mission-icon">
                  <FaSearch />
                </div>
                <h3>Investigate</h3>
                <p>Our expert team employs advanced OSINT techniques to uncover crucial information that others might miss.</p>
              </div>
              
              <div className="mission-card">
                <div className="mission-icon">
                  <FaFileAlt />
                </div>
                <h3>Document</h3>
                <p>We deliver legally defensible reports with clear, actionable insights for your business decisions.</p>
              </div>
              
              <div className="mission-card">
                <div className="mission-icon">
                  <FaChartLine />
                </div>
                <h3>Improve</h3>
                <p>We continuously refine our methodologies and technologies to stay ahead of emerging threats.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="team-section" className="about-section team" ref={teamRef}>
          <div className={`section-content ${visibleSections.team ? 'visible' : ''}`}>
            <div className="section-header">
              <span className="section-badge">Our Team</span>
              <h2>Led by experienced professionals</h2>
              <div className="section-divider">
                <span className="divider-line"></span>
                <span className="divider-circle"></span>
                <span className="divider-line"></span>
              </div>
            </div>
            
            <div className="team-content">
              <div className="team-member">
                <div className="member-photo">
                  <div className="photo-placeholder">JD</div>
                </div>
                <h3>James Davis</h3>
                <p className="member-title">Founder & CEO</p>
                <p className="member-bio">Former private investigator with 15+ years of experience in digital forensics and insurance fraud investigation.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo">
                  <div className="photo-placeholder">SM</div>
                </div>
                <h3>Sarah Miller</h3>
                <p className="member-title">Chief Intelligence Officer</p>
                <p className="member-bio">Expert in OSINT methodology with a background in cybersecurity and digital intelligence gathering.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo">
                  <div className="photo-placeholder">RL</div>
                </div>
                <h3>Robert Lee</h3>
                <p className="member-title">Head of Technology</p>
                <p className="member-bio">Technology innovator specializing in AI-driven analysis and secure data management systems.</p>
              </div>
              
              <div className="team-member">
                <div className="member-photo">
                  <div className="photo-placeholder">AJ</div>
                </div>
                <h3>Alicia Johnson</h3>
                <p className="member-title">Lead Analyst</p>
                <p className="member-bio">Skilled analyst with expertise in pattern recognition and social media intelligence gathering.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="values-section" className="about-section values" ref={valuesRef}>
          <div className={`section-content ${visibleSections.values ? 'visible' : ''}`}>
            <div className="section-header light">
              <span className="section-badge">Our Values</span>
              <h2>The principles that guide our work</h2>
              <div className="section-divider">
                <span className="divider-line"></span>
                <span className="divider-circle"></span>
                <span className="divider-line"></span>
              </div>
            </div>
            
            <div className="values-content">
              <div className="value-item">
                <div className="value-icon">
                  <FaUsers />
                </div>
                <h3>Integrity</h3>
                <p>We maintain the highest ethical standards in all our investigations and business practices.</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon">
                  <FaGlobeAmericas />
                </div>
                <h3>Thoroughness</h3>
                <p>We leave no stone unturned, ensuring comprehensive analysis and accurate results.</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon">
                  <FaAward />
                </div>
                <h3>Excellence</h3>
                <p>We strive for excellence in everything we do, from investigation to client service.</p>
              </div>
              
              <div className="value-item">
                <div className="value-icon">
                  <FaHandshake />
                </div>
                <h3>Partnership</h3>
                <p>We work as true partners with our clients, understanding their unique needs and challenges.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-cta">
          <div className="cta-content">
            <h2>Ready to secure your business?</h2>
            <p>Let our team of experts help you navigate the complex digital landscape and protect your interests.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">Contact Us</Link>
              <button onClick={openCaseModal} className="cta-button secondary">Refer a Case</button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default About;
