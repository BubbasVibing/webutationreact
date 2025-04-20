import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaComments, 
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt
} from 'react-icons/fa';
import './contact.css';

interface ContactProps {
  openCaseModal?: () => void;
}

const Contact: React.FC<ContactProps> = ({ openCaseModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Ensure the page scrolls to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Handle case where openCaseModal is undefined
  const handleCaseModal = openCaseModal || (() => {});

  const faqItems = [
    {
      question: "What services does Webutation offer?",
      answer: "Webutation offers a comprehensive suite of digital investigation services including Social Intelligence Reports, Background Checks, Medical Canvasses, Surveillance, Social Media Intelligence Search, Brand Defense, Expert Testimony, and more tailored solutions."
    },
    {
      question: "How long does a typical investigation take?",
      answer: "The timeline for investigations varies based on the complexity and scope of each case. Basic social media reports may take 3-5 business days, while more comprehensive investigations could take 1-3 weeks. We work with clients to establish timelines that meet their specific needs."
    },
    {
      question: "Is the information you gather legally admissible in court?",
      answer: "Yes, our investigations are conducted within legal parameters, and the information we gather is properly documented to be admissible in court proceedings. Our team includes expert witnesses who can testify to our findings when needed."
    },
    {
      question: "How do you ensure privacy and confidentiality?",
      answer: "We maintain strict confidentiality protocols for all cases. Our secure systems, encrypted communications, and confidentiality agreements protect sensitive information. We only access publicly available information or data that we have legal permission to obtain."
    },
    {
      question: "What information do you need to start an investigation?",
      answer: "To begin an investigation, we typically need basic information about the subject, such as name, location, and case context. The more details you can provide, the more targeted our investigation can be. Our case submission form helps gather the essential information needed to proceed."
    },
    {
      question: "How much do your services cost?",
      answer: "Our pricing varies based on the specific services required and the complexity of each case. We offer customized solutions tailored to your needs and budget. Please contact us for a consultation and personalized quote."
    }
  ];

  return (
    <div className="contact-wrapper">
      <Navbar openCaseModal={handleCaseModal} />
      
      <div className="contact-page">
        <div className="contact-hero">
          <div className="contact-hero-content">
            <h1>Get In Touch</h1>
            <p>Have questions about our services or want to submit a case? Reach out to our team - we're here to help.</p>
          </div>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="contact-description">Our team is ready to assist you with any inquiries or to help you get started with our services.</p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-text">
                  <h3>Our Location</h3>
                  <p>409 W South Ave, Glenolden, PA 19036</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <FaPhoneAlt />
                </div>
                <div className="contact-text">
                  <h3>Phone Number</h3>
                  <p>(484) 802-5609</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-text">
                  <h3>Email Address</h3>
                  <p>info@webutation.com</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="contact-icon">
                  <FaClock />
                </div>
                <div className="contact-text">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday: 9am - 5pm EST</p>
                </div>
              </div>
            </div>
            
            <div className="contact-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.4025843694635!2d-75.29214102384423!3d39.9123457917857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c41d1fe0ea2d%3A0xe7325659fd91d4ec!2s409%20W%20South%20Ave%2C%20Glenolden%2C%20PA%2019036!5e0!3m2!1sen!2sus!4v1716670287114!5m2!1sen!2sus" 
                width="100%" 
                height="250" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Webutation Office Location"
              ></iframe>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send Us a Message</h2>
            
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Thank you for your message!</h3>
                <p>We've received your inquiry and will get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="form-icon" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      <FaEnvelope className="form-icon" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">
                      <FaPhone className="form-icon" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="company">
                    <FaBuilding className="form-icon" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    <FaComments className="form-icon" />
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help you today?"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="submit-button"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? (
                    <span className="submitting">
                      <span className="spinner"></span>
                      Sending...
                    </span>
                  ) : (
                    <span>
                      <FaPaperPlane className="button-icon" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="faq-section">
          <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            <p className="faq-description">Find answers to the most common questions about our services and process.</p>
            
            <div className="faq-list">
              {faqItems.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                >
                  <div 
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3>{faq.question}</h3>
                    <span className="faq-icon">
                      {expandedFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Submit a case or contact us to learn more about our services.</p>
            <button 
              className="cta-button"
              onClick={handleCaseModal}
            >
              Submit a Case
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
