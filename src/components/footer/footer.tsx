import "./footer.css";
import {
  SiFacebook,
  SiX,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
} from "react-icons/si";
import WebutationLogo from "../../assets/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-bg-elements">
        <div className="footer-wave"></div>
        <div className="footer-gradient"></div>
      </div>

      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo-section">
            <img
              src={WebutationLogo}
              alt="Webutation Logo"
              className="footer-logo"
            />
            <p className="footer-tagline">
              Protecting businesses through comprehensive social intelligence
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon">
                <SiFacebook />
              </a>
              <a href="#" className="social-icon">
                <SiX />
              </a>
              <a href="#" className="social-icon">
                <SiInstagram />
              </a>
              <a href="#" className="social-icon">
                <SiLinkedin />
              </a>
              <a href="#" className="social-icon">
                <SiTiktok />
              </a>
            </div>
          </div>

          <div className="footer-links-container">
            <div className="footer-links">
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Team</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h3>Services</h3>
              <ul>
                <li>
                  <a href="#">Social Intelligence</a>
                </li>
                <li>
                  <a href="#">Fraud Prevention</a>
                </li>
                <li>
                  <a href="#">Risk Assessment</a>
                </li>
                <li>
                  <a href="#">Digital Investigation</a>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href="#">Case Studies</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <a href="tel:+14848025609">
                    <svg
                      className="contact-icon-svg"
                      viewBox="0 0 512 512"
                      width="14"
                      height="14"
                    >
                      <path
                        fill="currentColor"
                        d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                      />
                    </svg>
                    (484) 802-5609
                  </a>
                </li>
                <li>
                  <a href="mailto:info@webutation.com">
                    <svg
                      className="contact-icon-svg"
                      viewBox="0 0 512 512"
                      width="14"
                      height="14"
                    >
                      <path
                        fill="currentColor"
                        d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                      />
                    </svg>
                    info@webutation.com
                  </a>
                </li>
                <li>
                  <a href="https://goo.gl/maps/rYxcjrGggjFnKZJx9">
                    <svg
                      className="contact-icon-svg"
                      viewBox="0 0 384 512"
                      width="14"
                      height="14"
                    >
                      <path
                        fill="currentColor"
                        d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                      />
                    </svg>
                    409 W South Ave, Glenolden, PA 19036
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {currentYear} Webutation. All rights reserved.
            </div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
