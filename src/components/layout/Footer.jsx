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
//       { label: 'Features', path: '/features' },
//       { label: 'Pricing', path: '/pricing' },
//       { label: 'Documentation', path: '/docs' },
//     ],
//     company: [
//       { label: 'About Us', path: '/about' },
//       { label: 'Contact', path: '/contact' },
//       { label: 'Careers', path: '/careers' },
//     ],
//     legal: [
//       { label: 'Privacy Policy', path: '/privacy' },
//       { label: 'Terms of Service', path: '/terms' },
//       { label: 'Cookie Policy', path: '/cookies' },
//     ],
//   };

//   const socialLinks = [
//     { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
//     { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
//     { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
//     { icon: <EmailIcon />, href: '#', label: 'Email' },
//   ];

//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="container-custom section-padding">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Brand Section */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logoImage}
//                   alt="Team Trackify Logo"
//                   className="h-20 md:h-22 lg:h-24 w-auto object-contain"
//                 />
//               </Link>
//               <p className="text-gray-400 mb-4 max-w-md">
//                 Advanced GPS tracking and team management solution for modern businesses.
//                 Track your team, optimize routes, and boost productivity.
//               </p>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     aria-label={social.label}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
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
//           >
//             <h3 className="text-white font-semibold mb-4">Product</h3>
//             <ul className="space-y-2">
//               {footerLinks.product.map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-primary-400 transition-colors"
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
//           >
//             <h3 className="text-white font-semibold mb-4">Company</h3>
//             <ul className="space-y-2">
//               {footerLinks.company.map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-primary-400 transition-colors"
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
//           >
//             <h3 className="text-white font-semibold mb-4">Legal</h3>
//             <ul className="space-y-2">
//               {footerLinks.legal.map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-primary-400 transition-colors"
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
//           className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
//         >
//           <p className="text-gray-400">
//             © {currentYear} Team Trackify. All rights reserved.
//           </p>
//           <Link
//             to="/privacy-policy"
//             className="text-gray-400 hover:text-primary-400 transition-colors"
//           >
//             Privacy Policy
//           </Link>
//         </motion.div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;











////////////////////////////// Change Color Theam/////////////////////////////////////
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
//       { label: 'Features', path: '/features' },
//       { label: 'Pricing', path: '/pricing' },
//       { label: 'Documentation', path: '/docs' },
//     ],
//     company: [
//       { label: 'About Us', path: '/about' },
//       { label: 'Contact', path: '/contact' },
//       { label: 'Careers', path: '/careers' },
//     ],
//     legal: [
//       { label: 'Privacy Policy', path: '/privacy' },
//       { label: 'Terms of Service', path: '/terms' },
//       { label: 'Cookie Policy', path: '/cookies' },
//     ],
//   };

//   const socialLinks = [
//     { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
//     { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
//     { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
//     { icon: <EmailIcon />, href: '#', label: 'Email' },
//   ];

//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="container-custom section-padding">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Brand Section */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <Link to="/" className="flex items-center">
//                 <img
//                   src={logoImage}
//                   alt="Team Trackify Logo"
//                   className="h-20 md:h-22 lg:h-24 w-auto object-contain"
//                 />
//               </Link>
//               <p className="text-gray-400 mb-4 max-w-md">
//                 Advanced GPS tracking and team management solution for modern businesses.
//                 Track your team, optimize routes, and boost productivity.
//               </p>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.href}
//                     aria-label={social.label}
//                     whileHover={{ scale: 1.1, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
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
//             className="flex flex-col items-center text-center w-full sm:max-w-[180px] md:max-w-[200px] mx-auto px-2"
//           >
//             <h6 className="text-white font-semibold mb-2 text-base sm:text-lg">Product</h6>
//             <ul className="space-y-2 sm:space-y-3 w-full">
//               {footerLinks.product.map((link) => (
//                 <li key={link.path} className="w-full">
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base block py-1 px-2"
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
//             className="flex flex-col items-center text-center w-full sm:max-w-[180px] md:max-w-[200px] mx-auto px-2"
//           >
//             <h6 className="text-white font-semibold mb-2 text-base sm:text-lg">Company</h6>
//             <ul className="space-y-2 sm:space-y-3 w-full">
//               {footerLinks.company.map((link) => (
//                 <li key={link.path} className="w-full">
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base block py-1 px-2"
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
//             className="flex flex-col items-center text-center w-full sm:max-w-[180px] md:max-w-[200px] mx-auto px-2"
//           >
//             <h6 className="text-white font-semibold mb-2 text-base sm:text-lg">Legal</h6>
//             <ul className="space-y-2 sm:space-y-3 w-full">
//               {footerLinks.legal.map((link) => (
//                 <li key={link.path} className="w-full">
//                   <Link
//                     to={link.path}
//                     className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base block py-1 px-2"
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
//           className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
//         >
//           <p className="text-gray-400">
//             © {currentYear} Team Trackify. All rights reserved.
//           </p>
//           <Link
//             to="/privacy-policy"
//             className="text-gray-400 hover:text-blue-400 transition-colors"
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
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import logoImage from '../../assets/Team-Trackify-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/features' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Documentation', path: '/docs' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Careers', path: '/careers' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: <FacebookIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Twitter' },
    { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, href: '#', label: 'LinkedIn' },
    { icon: <EmailIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center mb-2">
                <img
                  src={logoImage}
                  alt="Team Trackify Logo"
                  className="h-14 md:h-16 lg:h-18 w-auto object-contain"
                />
              </Link>
              <p className="text-gray-400 mb-3 max-w-md text-xs md:text-sm leading-relaxed">
                Advanced GPS tracking and team management solution for modern businesses.
                Track your team, optimize routes, and boost productivity.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 md:w-9 md:h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center w-full sm:max-w-[160px] md:max-w-[180px] mx-auto px-2"
          >
            <h6 className="text-white font-semibold mb-1.5 text-sm md:text-base">Product</h6>
            <ul className="space-y-1.5 md:space-y-2 w-full">
              {footerLinks.product.map((link) => (
                <li key={link.path} className="w-full">
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm block py-1 px-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center w-full sm:max-w-[160px] md:max-w-[180px] mx-auto px-2"
          >
            <h6 className="text-white font-semibold mb-1.5 text-sm md:text-base">Company</h6>
            <ul className="space-y-1.5 md:space-y-2 w-full">
              {footerLinks.company.map((link) => (
                <li key={link.path} className="w-full">
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm block py-1 px-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center w-full sm:max-w-[160px] md:max-w-[180px] mx-auto px-2"
          >
            <h6 className="text-white font-semibold mb-1.5 text-sm md:text-base">Legal</h6>
            <ul className="space-y-1.5 md:space-y-2 w-full">
              {footerLinks.legal.map((link) => (
                <li key={link.path} className="w-full">
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm block py-1 px-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-5 flex flex-col md:flex-row justify-between items-center gap-3"
        >
          <p className="text-gray-400 text-xs md:text-sm">
            © {currentYear} Team Trackify. All rights reserved.
          </p>
          <Link
            to="/privacy-policy"
            className="text-gray-400 hover:text-blue-400 transition-colors text-xs md:text-sm"
          >
            Privacy Policy
          </Link>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;