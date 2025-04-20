import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { 
  FaBriefcase, 
  FaUsers, 
  FaLaptopCode, 
  FaChartLine, 
  FaGlobeAmericas, 
  FaLightbulb
} from 'react-icons/fa';
import './careers.css';

interface CareersProps {
  openCaseModal: () => void;
}

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isExpanded: boolean;
}

const Careers: React.FC<CareersProps> = ({ openCaseModal }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([
    {
      id: 'job-1',
      title: 'Senior OSINT Investigator',
      department: 'Investigations',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'We are seeking an experienced Senior OSINT Investigator to lead complex digital investigations and develop innovative intelligence gathering methodologies. This role involves conducting thorough social media investigations, training junior team members, and collaborating with clients to deliver actionable insights.',
      requirements: [
        'Minimum 5 years of experience in OSINT or digital investigations',
        'Expert knowledge of social media platforms and digital footprint analysis',
        'Experience with advanced search techniques and digital forensics tools',
        'Strong analytical skills and attention to detail',
        'Excellent communication and reporting skills'
      ],
      isExpanded: false
    },
    {
      id: 'job-2',
      title: 'Intelligence Analyst',
      department: 'Intelligence',
      location: 'Philadelphia, PA',
      type: 'Full-time',
      description: 'As an Intelligence Analyst, you will be responsible for processing and analyzing information from various sources to identify patterns and provide actionable insights for our clients. You will work closely with our investigation team to produce comprehensive intelligence reports.',
      requirements: [
        'Bachelor\'s degree in Criminal Justice, Intelligence Studies, or related field',
        'Experience in data analysis and pattern recognition',
        'Knowledge of intelligence gathering methodologies',
        'Strong critical thinking and problem-solving skills',
        'Ability to work in a fast-paced environment and meet deadlines'
      ],
      isExpanded: false
    },
    {
      id: 'job-3',
      title: 'Frontend Developer',
      department: 'Technology',
      location: 'Remote (US)',
      type: 'Full-time',
      description: 'Join our technology team to build and maintain the user interfaces for our intelligence platforms. You will be responsible for implementing responsive designs, optimizing user experience, and collaborating with our backend team to integrate new features.',
      requirements: [
        'Strong experience with React and TypeScript',
        'Proficiency in HTML, CSS, and modern JavaScript',
        'Experience with responsive design and accessibility standards',
        'Knowledge of state management solutions and frontend testing',
        'Understanding of version control systems and CI/CD pipelines'
      ],
      isExpanded: false
    },
    {
      id: 'job-4',
      title: 'Business Development Manager',
      department: 'Business',
      location: 'Philadelphia, PA',
      type: 'Full-time',
      description: 'We are looking for a proactive Business Development Manager to expand our client base and drive company growth. You will identify new business opportunities, build relationships with potential clients, and develop strategies to increase our market presence.',
      requirements: [
        'Proven track record in sales or business development',
        'Experience in the investigation, intelligence, or security industry',
        'Strong networking and relationship-building skills',
        'Excellent presentation and negotiation abilities',
        'Strategic thinking and market analysis capabilities'
      ],
      isExpanded: false
    }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleJobExpansion = (id: string) => {
    setJobPositions(prevPositions => 
      prevPositions.map(job => 
        job.id === id ? { ...job, isExpanded: !job.isExpanded } : job
      )
    );
  };

  const filterJobs = (department: string) => {
    return department === 'all' 
      ? jobPositions 
      : jobPositions.filter(job => job.department.toLowerCase() === department.toLowerCase());
  };

  return (
    <div className="careers-wrapper" ref={scrollContainerRef}>
      <Navbar 
        scrollContainerRef={scrollContainerRef as RefObject<HTMLDivElement>} 
        openCaseModal={openCaseModal} 
      />
      
      <div className="careers-content">
        <div className="careers-hero">
          <div className="hero-content">
            <h1>Join Our Team</h1>
            <p>Help us build the future of digital intelligence and investigation</p>
          </div>
        </div>
        
        <div className="careers-mission">
          <div className="container">
            <h2>Why Work With Us</h2>
            <p className="section-subtitle">
              At Webutation, we're building a team of exceptional professionals who are passionate about making a difference through digital intelligence.
            </p>
            
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <FaLightbulb />
                </div>
                <h3>Innovation</h3>
                <p>Work at the cutting edge of digital investigation techniques and technology solutions.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <FaUsers />
                </div>
                <h3>Collaboration</h3>
                <p>Join a diverse team of experts who work together to solve complex challenges.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <FaChartLine />
                </div>
                <h3>Growth</h3>
                <p>Continuous learning and professional development opportunities for every team member.</p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <FaGlobeAmericas />
                </div>
                <h3>Impact</h3>
                <p>Make a real difference by helping clients navigate complex digital landscapes.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="open-positions">
          <div className="container">
            <h2>Open Positions</h2>
            <p className="section-subtitle">
              Explore our current openings and find a role where you can make an impact.
            </p>
            
            <div className="job-filters">
              <button 
                className={`filter-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Departments
              </button>
              <button 
                className={`filter-button ${activeTab === 'investigations' ? 'active' : ''}`}
                onClick={() => setActiveTab('investigations')}
              >
                Investigations
              </button>
              <button 
                className={`filter-button ${activeTab === 'intelligence' ? 'active' : ''}`}
                onClick={() => setActiveTab('intelligence')}
              >
                Intelligence
              </button>
              <button 
                className={`filter-button ${activeTab === 'technology' ? 'active' : ''}`}
                onClick={() => setActiveTab('technology')}
              >
                Technology
              </button>
              <button 
                className={`filter-button ${activeTab === 'business' ? 'active' : ''}`}
                onClick={() => setActiveTab('business')}
              >
                Business
              </button>
            </div>
            
            <div className="job-listings">
              {filterJobs(activeTab).map(job => (
                <div key={job.id} className="job-card">
                  <div 
                    className="job-header" 
                    onClick={() => toggleJobExpansion(job.id)}
                  >
                    <div className="job-title-container">
                      <h3>{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-department">{job.department}</span>
                        <span className="job-location">{job.location}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                    <div className="expand-icon">
                      {job.isExpanded ? '−' : '+'}
                    </div>
                  </div>
                  
                  {job.isExpanded && (
                    <div className="job-details">
                      <div className="job-description">
                        <h4>Description</h4>
                        <p>{job.description}</p>
                      </div>
                      
                      <div className="job-requirements">
                        <h4>Requirements</h4>
                        <ul>
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="job-actions">
                        <a href="#apply-now" className="apply-button">Apply Now</a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="careers-cta" id="apply-now">
          <div className="container">
            <div className="cta-content">
              <h2>Don't See a Perfect Match?</h2>
              <p>We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to our mission.</p>
              <div className="cta-form">
                <form>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" placeholder="Your full name" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" placeholder="Your email address" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" placeholder="Your phone number" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="position">Interested Position</label>
                      <input type="text" id="position" placeholder="Position you're interested in" />
                    </div>
                    
                    <div className="form-group full-width">
                      <label htmlFor="message">Cover Letter</label>
                      <textarea id="message" rows={4} placeholder="Tell us why you're interested in working with us"></textarea>
                    </div>
                    
                    <div className="form-group full-width">
                      <label htmlFor="resume" className="file-label">
                        <span className="file-text">Upload Resume (PDF, DOC, DOCX)</span>
                        <input type="file" id="resume" accept=".pdf,.doc,.docx" />
                      </label>
                    </div>
                  </div>
                  
                  <button type="submit" className="submit-button">Submit Application</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
