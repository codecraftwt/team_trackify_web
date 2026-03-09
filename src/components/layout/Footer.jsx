// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import EmailIcon from '@mui/icons-material/Email';
// import logoImage from '../../assets/Team-Trackify-logo.png';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const footerLinks = {
//     product: [
//       { label: 'Pricing', path: '/pricing' },
//     ],
//     company: [
//       { label: 'About Us', path: '/about' },
//       { label: 'Contact', path: '/contact' },
//       { label: 'Careers', path: '/careers' },
//     ],
//     legal: [
//       { label: 'Privacy Policy', path: '/privacypolicy' },

//     ],
//   };

//   const socialLinks = [
//     { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, href: 'https://in.linkedin.com/company/walstar-technologies', label: 'LinkedIn' },
//     { icon: <EmailIcon sx={{ fontSize: 18 }} />, href: 'walstarappdev@gmail.com', label: 'Email' },
//   ];

//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="container-custom section-padding py-8 md:py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           {/* Brand Section */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <Link to="/" className="flex items-center mb-2">
//                 <img
//                   src={logoImage}
//                   alt="Team Trackify Logo"
//                   className="h-14 md:h-16 lg:h-18 w-auto object-contain"
//                 />
//               </Link>
//               <p className="text-gray-400 mb-3 max-w-md text-xs md:text-sm leading-relaxed">
//                 Advanced GPS tracking and team management solution for modern businesses.
//                 Track your team, optimize routes, and boost productivity.
//               </p>
//               <div className="flex space-x-3">
//                 {socialLinks.map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     aria-label={social.label}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-8 h-8 md:w-9 md:h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//                   >
//                     {social.icon}
//                   </motion.a>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Product Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="flex flex-col items-center text-center w-full sm:max-w-[160px] md:max-w-[180px] mx-auto px-2"
//           >
//             <h6 className="text-white font-semibold mb-1.5 text-sm md:text-base">Product</h6>
//             <ul className="space-y-1.5 md:space-y-2 w-full">
//               {footerLinks.product.map((link) => (
//                 <li key={link.path} className="w-full">
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm block py-1 px-2"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Company Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="flex flex-col items-center text-center w-full sm:max-w-[160px] md:max-w-[180px] mx-auto px-2"
//           >
//             <h6 className="text-white font-semibold mb-1.5 text-sm md:text-base">Company</h6>
//             <ul className="space-y-1.5 md:space-y-2 w-full">
//               {footerLinks.company.map((link) => (
//                 <li key={link.path} className="w-full">
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm block py-1 px-2"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Legal Links */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="flex flex-col items-center text-center w-full sm:max-w-[160px] md:max-w-[180px] mx-auto px-2"
//           >
//             <h6 className="text-white font-semibold mb-1.5 text-sm md:text-base">Legal</h6>
//             <ul className="space-y-1.5 md:space-y-2 w-full">
//               {footerLinks.legal.map((link) => (
//                 <li key={link.path} className="w-full">
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm block py-1 px-2"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         </div>

//         {/* Bottom Bar */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="border-t border-gray-800 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-3"
//         >
//           <p className="text-gray-400 text-xs md:text-sm">
//             © {currentYear} Team Trackify. All rights reserved.
//           </p>
//           <Link
//             to="/privacy-policy"
//             className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm"
//           >
//             Privacy Policy
//           </Link>
//         </motion.div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import logoImage from '../../assets/Team-Trackify-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Pricing', path: '/pricing' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacypolicy' },
    ],
  };

  const socialLinks = [
    {
      icon: <LinkedInIcon sx={{ fontSize: 20 }} />,
      href: 'https://in.linkedin.com/company/walstar-technologies',
      label: 'LinkedIn',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 20 }} />,
      href: 'mailto:walstarappdev@gmail.com',
      label: 'Email',
    },
  ];

  const LinkColumn = ({ title, links, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h6 style={{
        color: 'white',
        fontWeight: 600,
        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
        marginBottom: 10,
        paddingBottom: 6,
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(to right, #3b82f6, #93c5fd) 1',
        display: 'inline-block',
        width: '100%',
      }}>
        {title}
      </h6>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map((link) => (
          <li key={link.path} style={{ marginBottom: 8 }}>
            <Link
              to={link.path}
              style={{
                color: '#9ca3af',
                textDecoration: 'none',
                fontSize: 'clamp(0.72rem, 1.8vw, 0.875rem)',
                display: 'inline-block',
                transition: 'color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 4vw, 40px);
          align-items: start;
        }
        .footer-brand {
          grid-column: 1 / -1;
        }
        .footer-links-row {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 3vw, 32px);
        }
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / 2;
          }
          .footer-links-row {
            display: contents;
          }
        }
        .footer-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.05;
        }
      `}</style>

      <footer style={{
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)',
        color: '#d1d5db',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div className="footer-blob" style={{ top: 0, left: 0, width: 220, height: 220, background: '#3b82f6', filter: 'blur(70px)' }} />
        <div className="footer-blob" style={{ bottom: 0, right: 0, width: 320, height: 320, background: '#8b5cf6', filter: 'blur(90px)' }} />

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(28px, 5vw, 56px) clamp(16px, 4vw, 32px)',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Main grid */}
          <div className="footer-grid">

            {/* Brand */}
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12, textDecoration: 'none' }}
                onMouseEnter={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)'; }}
              >
                <img
                  src={logoImage}
                  alt="Team Trackify Logo"
                  style={{
                    height: 'clamp(36px, 5vw, 54px)',
                    width: 'auto',
                    objectFit: 'contain',
                    transition: 'transform 0.3s',
                  }}
                />
               
              </Link>

              <p style={{
                color: '#9ca3af',
                fontSize: 'clamp(0.72rem, 1.8vw, 0.875rem)',
                lineHeight: 1.7,
                maxWidth: 360,
                marginBottom: 16,
              }}>
                Advanced GPS tracking and team management solution for modern businesses.
                Track your team, optimize routes, and boost productivity.
              </p>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: 'clamp(32px, 5vw, 40px)',
                        height: 'clamp(32px, 5vw, 40px)',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#9ca3af',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.background = 'rgba(59,130,246,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.color = '#9ca3af';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            <div className="footer-links-row">
              <LinkColumn title="Product" links={footerLinks.product} delay={0.1} />
              <LinkColumn title="Company" links={footerLinks.company} delay={0.2} />
              <LinkColumn title="Legal" links={footerLinks.legal} delay={0.3} />
            </div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              marginTop: 'clamp(24px, 5vw, 40px)',
              paddingTop: 'clamp(14px, 3vw, 22px)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <p style={{
              color: '#6b7280',
              fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)',
              margin: 0,
            }}>
              © {currentYear} Team Trackify. All rights reserved.
            </p>

            <Link
              to="/privacypolicy"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
            >
              Privacy Policy
            </Link>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;