import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiMail,
  FiClock,
  FiShield,
  FiUser,
  FiShare2,
  FiLock,
  FiEye,
  FiAlertCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  // Policy sections with icons using updated primary color (#2f6eaa)
  const policySections = [
    {
      title: "1. Information We Collect",
      icon: <FiUser className="text-primary" size={24} />,
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
      icon: <FiShare2 className="text-primary" size={24} />,
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
      icon: <FiShield className="text-primary" size={24} />,
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
      icon: <FiLock className="text-primary" size={24} />,
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
      icon: <FiClock className="text-primary" size={24} />,
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
      icon: <FiEye className="text-primary" size={24} />,
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
            <a href="mailto:walstarappdev@gmail.com" className="text-primary" style={{ color: '#2f6eaa' }}>
              walstarappdev@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </>
      ),
    },
    {
      title: "7. Cookies and Tracking Technologies",
      icon: <FiEye className="text-primary" size={24} />,
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
      icon: <FiShield className="text-primary" size={24} />,
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
      icon: <FiShare2 className="text-primary" size={24} />,
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
      icon: <FiAlertCircle className="text-primary" size={24} />,
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
      icon: <FiMail className="text-primary" size={24} />,
      content: (
        <>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us:
          </p>
          <div className="mt-3">
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:walstarappdev@gmail.com" className="text-primary" style={{ color: '#2f6eaa' }}>
                walstarappdev@gmail.com
              </a>
            </p>
            <p className="mb-2">
              <strong>Address:</strong> Rukmini Nagar, Front Of Datta Mandir,
              2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005
            </p>
            <p className="mb-2">
              <strong>Phone:</strong>{" "}
              <a href="tel:+918530111646" className="text-primary" style={{ color: '#2f6eaa' }}>
                +91 8530111646
              </a>
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <Header />

      <Container className="py-5 py-lg-7">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="text-decoration-none d-inline-flex align-items-center gap-2 p-0"
            style={{ color: '#2f6eaa' }}
          >
            <FiArrowLeft size={20} />
            <span>Back</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <h1 className="fw-bold display-6 mb-3" style={{ color: '#2f6eaa' }}>
            Privacy Policy
          </h1>
          <p className="lead text-muted">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <div
              className="py-4 px-4 text-white"
              style={{
                background: "linear-gradient(135deg, #2f6eaa, #1e4f7a)",
              }}
            >
              <h2 className="fw-bold mb-0 h3">Your Privacy Matters</h2>
              <p className="mb-0 mt-2 opacity-90">
                We are committed to protecting your personal information
              </p>
            </div>
            <Card.Body className="p-4 p-lg-5">
              {policySections.map((section, index) => (
                <motion.section
                  key={index}
                  className="mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="p-3 rounded-3"
                      style={{ backgroundColor: 'rgba(47, 110, 170, 0.1)' }}
                    >
                      <div style={{ color: '#2f6eaa' }}>{section.icon}</div>
                    </div>
                    <h3 className="fw-bold mb-0 h4" style={{ color: '#1e293b' }}>
                      {section.title}
                    </h3>
                  </div>

                  {section.subsections ? (
                    section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="mb-4 ps-5">
                        <h4 className="fw-semibold mb-3 h5" style={{ color: '#2f6eaa' }}>
                          {subsection.title}
                        </h4>
                        <div className="text-muted" style={{ color: '#6b7280' }}>
                          {subsection.content}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted ps-5" style={{ color: '#6b7280' }}>
                      {section.content}
                    </div>
                  )}
                </motion.section>
              ))}
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;