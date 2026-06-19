import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FiMail,
  FiClock,
  FiShield,
  FiUser,
  FiShare2,
  FiLock,
  FiEye,
  FiAlertCircle,
} from "react-icons/fi";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(0);

  const policySections = [
    {
      title: "1. Information We Collect",
      icon: <FiUser size={20} />,
      subsections: [
        {
          title: "a. Personal Information:",
          content: (
            <>
              <p>We may collect the following personal information:</p>
              <ul>
                <li>Name</li>
                <li>Contact information (e.g., phone number, email address)</li>
                <li>Device information (e.g., device ID, operating system)</li>
                <li>Account credentials</li>
              </ul>
            </>
          ),
        },
        {
          title: "b. Location Data:",
          content: (
            <p>
              The App collects real-time location data to monitor delivery
              routes and ensure efficient product delivery. Location data is
              collected only during active delivery sessions and is used for
              operational purposes. You can disable location services in your
              device settings, but this may affect app functionality.
            </p>
          ),
        },
        {
          title: "c. Usage Data:",
          content: (
            <p>
              We automatically collect information about how you interact with
              our app, including pages visited, time spent, and features used.
              This helps us improve our services and user experience.
            </p>
          ),
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      icon: <FiShare2 size={20} />,
      content: (
        <>
          <p>We use the collected information to:</p>
          <ul>
            <li>Monitor and optimize delivery routes in real-time</li>
            <li>Ensure timely product deliveries</li>
            <li>Enhance operational efficiency and reduce costs</li>
            <li>Maintain records for compliance and auditing purposes</li>
            <li>Communicate important updates and notifications</li>
            <li>Improve app performance and user experience</li>
            <li>Detect and prevent fraudulent activities</li>
          </ul>
        </>
      ),
    },
    {
      title: "3. Data Sharing and Disclosure",
      icon: <FiShield size={20} />,
      content: (
        <>
          <p>
            We do not sell or rent your personal information. We may share your
            information with:
          </p>
          <ul>
            <li>
              <strong>Authorized Personnel:</strong> Access is limited to
              authorized employees who require the information for operational
              purposes, under strict confidentiality agreements.
            </li>
            <li>
              <strong>Service Providers:</strong> Third-party vendors who assist
              in app functionality, analytics, and cloud services, subject to
              confidentiality agreements and data protection standards.
            </li>
            <li>
              <strong>Legal Requirements:</strong> If required by law or in
              response to valid legal processes, such as court orders or
              subpoenas.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets, your information may be transferred
              to the new entity.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Data Security",
      icon: <FiLock size={20} />,
      content: (
        <>
          <p>
            We implement robust technical and organizational measures to
            protect your personal information:
          </p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Secure data centers with physical security measures</li>
            <li>Employee training on data protection best practices</li>
          </ul>
          <p className="mt-3">
            While we strive to protect your data, no method of transmission over
            the Internet is 100% secure. We encourage you to take precautions to
            protect your personal information.
          </p>
        </>
      ),
    },
    {
      title: "5. Data Retention",
      icon: <FiClock size={20} />,
      content: (
        <>
          <p>
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy or as required by
            law. Retention periods are based on:
          </p>
          <ul>
            <li>The nature and sensitivity of the data</li>
            <li>Legal and regulatory requirements</li>
            <li>Operational needs for ongoing services</li>
            <li>Statute of limitations for legal claims</li>
          </ul>
          <p className="mt-3">
            When data is no longer needed, we securely delete or anonymize it.
          </p>
        </>
      ),
    },
    {
      title: "6. Your Rights",
      icon: <FiEye size={20} />,
      content: (
        <>
          <p>You have the following rights regarding your personal information:</p>
          <ul>
            <li>
              <strong>Right to Access:</strong> Request a copy of the personal
              information we hold about you
            </li>
            <li>
              <strong>Right to Rectification:</strong> Request correction of
              inaccurate or incomplete data
            </li>
            <li>
              <strong>Right to Deletion:</strong> Request deletion of your
              personal information, subject to legal obligations
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Request limitation
              of how we use your data
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Request transfer of
              your data to another service provider
            </li>
            <li>
              <strong>Right to Object:</strong> Object to certain types of
              processing, such as direct marketing
            </li>
          </ul>
          <p className="mt-3">
            To exercise these rights, please contact us at{" "}
            <a href="mailto:walstarappdev@gmail.com" className="text-primary font-semibold" style={{ color: '#2f6eaa', textDecoration: 'none' }}>
              walstarappdev@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </>
      ),
    },
    {
      title: "7. Cookies and Tracking Technologies",
      icon: <FiEye size={20} />,
      content: (
        <>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience. These include:
          </p>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for basic app
              functionality
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how users
              interact with our app
            </li>
            <li>
              <strong>Preference Cookies:</strong> Remember your settings and
              preferences
            </li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences.
            Disabling cookies may affect app functionality.
          </p>
        </>
      ),
    },
    {
      title: "8. Children's Privacy",
      icon: <FiShield size={20} />,
      content: (
        <p>
          Our services are not intended for individuals under the age of 18. We
          do not knowingly collect personal information from children. If we
          become aware that we have collected data from a child without parental
          consent, we will take steps to delete that information.
        </p>
      ),
    },
    {
      title: "9. International Data Transfers",
      icon: <FiShare2 size={20} />,
      content: (
        <p>
          Your information may be transferred to and processed in countries
          other than your own. We ensure appropriate safeguards are in place to
          protect your data in accordance with this Privacy Policy and applicable
          laws.
        </p>
      ),
    },
    {
      title: "10. Changes to This Privacy Policy",
      icon: <FiAlertCircle size={20} />,
      content: (
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          material changes by updating the "Effective Date" at the top of this
          policy and, where appropriate, through in-app notifications. We
          encourage you to review this policy periodically.
        </p>
      ),
    },
    {
      title: "11. Contact Us",
      icon: <FiMail size={20} />,
      content: (
        <>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us:
          </p>
          <div className="mt-3 bg-light p-3 rounded-3 border-start border-4" style={{ borderColor: '#2f6eaa' }}>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:walstarappdev@gmail.com" className="text-primary font-semibold" style={{ color: '#2f6eaa', textDecoration: 'none' }}>
                walstarappdev@gmail.com
              </a>
            </p>
            <p className="mb-2">
              <strong>Address:</strong> Rukmini Nagar, Front Of Datta Mandir,
              2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005
            </p>
            <p className="mb-0">
              <strong>Phone:</strong>{" "}
              <a href="tel:+918530111646" className="text-primary font-semibold" style={{ color: '#2f6eaa', textDecoration: 'none' }}>
                +91 8530111646
              </a>
            </p>
          </div>
        </>
      ),
    },
  ];

  const scrollToSection = (index) => {
    const el = document.getElementById(`section-${index}`);
    if (el) {
      const yOffset = -100; // Account for sticky header height
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const elements = policySections.map((_, index) => document.getElementById(`section-${index}`));
    
    const observerOptions = {
      root: null,
      rootMargin: '-120px 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.id.split('-')[1]);
          setActiveSection(index);
        }
      });
    }, observerOptions);

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-vh-100 bg-light flex flex-column">
      <style>{`
        .sticky-sidebar {
          position: sticky;
          top: 100px;
          z-index: 10;
        }
        .sidebar-link {
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          font-size: 0.92rem;
          padding: 0.65rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #4b5563;
          text-decoration: none;
          border-radius: 0 8px 8px 0;
        }
        .sidebar-link:hover {
          color: #2f6eaa !important;
          background: rgba(47, 110, 170, 0.05);
          border-left-color: rgba(47, 110, 170, 0.4);
        }
        .sidebar-link.active {
          color: #2f6eaa !important;
          font-weight: 600;
          background: rgba(47, 110, 170, 0.08);
          border-left-color: #2f6eaa;
        }
        .policy-card {
          border: none;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.04);
          border-radius: 16px;
        }
        .icon-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(47, 110, 170, 0.08);
          color: #2f6eaa;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .policy-section {
          padding-bottom: 2rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .policy-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .policy-section:hover .icon-wrapper {
          background: #2f6eaa;
          color: white !important;
          transform: scale(1.08) rotate(5deg);
          box-shadow: 0 4px 12px rgba(47, 110, 170, 0.25);
        }
        .bg-gradient-banner {
          background: linear-gradient(135deg, #1e4f7a 0%, #2f6eaa 100%);
          position: relative;
          overflow: hidden;
        }
        .bg-gradient-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 85% 15%, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .policy-section h4 {
          margin-top: 1.5rem;
        }
        .policy-section ul {
          padding-left: 1.25rem;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
        }
        .policy-section li {
          margin-bottom: 0.4rem;
          color: #4b5563;
        }
        .policy-section p {
          color: #4b5563;
          line-height: 1.6;
        }
      `}</style>
      
      <Header />

      {/* Banner / Hero Section */}
      <div className="bg-gradient-banner text-white py-5 text-center">
        <Container className="py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="fw-bold display-5 mb-3 mt-4">Privacy Policy</h1>
            <p className="lead opacity-90 max-w-2xl mx-auto" style={{ maxWidth: '650px', margin: '0 auto' }}>
              We value your trust. Read about how we collect, use, protect, and manage your data.
            </p>
            <div className="d-inline-flex align-items-center gap-2 bg-white bg-opacity-10 px-3 py-1.5 rounded-full mt-4 backdrop-blur-sm border border-white border-opacity-10">
              <FiClock size={15} />
              <span className="small">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Content Section */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Sticky Sidebar Navigation */}
          <Col lg={4} className="d-none d-lg-block">
            <div className="sticky-sidebar bg-white p-4 rounded-4 shadow-sm border border-light">
              <h5 className="fw-bold mb-4 text-secondary text-uppercase tracking-wider small" style={{ letterSpacing: '0.05em' }}>
                Table of Contents
              </h5>
              <div className="d-flex flex-column gap-1">
                {policySections.map((section, index) => {
                  const displayTitle = section.title.replace(/^\d+\.\s*/, '');
                  return (
                    <div
                      key={index}
                      className={`sidebar-link ${activeSection === index ? 'active' : ''}`}
                      onClick={() => scrollToSection(index)}
                    >
                      <span className="small fw-semibold">{index + 1}.</span>
                      <span className="text-truncate">{displayTitle}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>

          {/* Policy Body */}
          <Col lg={8}>
            <Card className="policy-card">
              <Card.Body className="p-4 p-lg-5">
                {policySections.map((section, index) => (
                  <div
                    key={index}
                    id={`section-${index}`}
                    className="policy-section"
                  >
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <div className="icon-wrapper rounded-3">
                        {section.icon}
                      </div>
                      <h3 className="fw-bold mb-0 h5 text-dark">
                        {section.title}
                      </h3>
                    </div>

                    {section.subsections ? (
                      <div className="ps-md-4">
                        {section.subsections.map((subsection, subIndex) => (
                          <div key={subIndex} className="mb-4">
                            <h4 className="fw-bold mb-2 h6" style={{ color: '#2f6eaa' }}>
                              {subsection.title}
                            </h4>
                            <div>
                              {subsection.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="ps-md-4">
                        {section.content}
                      </div>
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;