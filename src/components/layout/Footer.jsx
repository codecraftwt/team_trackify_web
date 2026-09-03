import { Link } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import logoImage from '../../assets/logo31.png';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
        color: theme.palette.text.primary
      }}
      className="pt-16 pb-8"
    >
      <div className="container-custom max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 mb-12">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 decoration-transparent group mb-6">
              <img src={logoImage} alt="Team Trackify Logo" className="h-9 w-auto rounded-s object-contain transition-transform group-hover:scale-105" />
              <span className="text-2xl font-bold tracking-wide" style={{ color: theme.palette.text.primary }}>Team Trackify</span>
            </Link>
            <p className="text-[13px] md:text-sm leading-relaxed mb-6" style={{ color: theme.palette.text.secondary }}>
              Deploying Team Trackify across your organization is completely hassle-free. Establish complete visibility over your field operations effortlessly.
            </p>
            <div className="flex items-start gap-2 text-[13px] font-medium" style={{ color: theme.palette.text.secondary }}>
              <FaShieldAlt size={16} style={{ color: theme.palette.primary.main, flexShrink: 0, marginTop: '2px' }} />
              <span>
                Enterprise-grade privacy & data protection.<br />
                <Link to="/privacy-policy" className="hover:underline" style={{ color: theme.palette.primary.main }}>Read our policy</Link>
              </span>
            </div>
          </div>

          {/* Column 2: Support (Nav Links) */}
          <div className="flex flex-col items-start lg:pl-10">
            <h4 className="text-[17px] font-bold mb-6" style={{ color: theme.palette.text.primary }}>Support</h4>
            <ul className="space-y-3 p-0 m-0 list-none w-full">
              {['Home', 'About', 'Pricing', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-[14px] hover:underline transition-all" style={{ color: theme.palette.text.secondary }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Column 4: Get In Touch */}
          <div className="flex flex-col items-start">
            <h4 className="text-[17px] font-bold mb-6" style={{ color: theme.palette.text.primary }}>Get In Touch</h4>
            <ul className="space-y-4 w-full p-0 m-0 list-none">
              <li className="flex items-center gap-3">
                <PhoneOutlinedIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                <span className="text-[14px]" style={{ color: theme.palette.text.secondary }}>+91 8530111646</span>
              </li>
              <li className="flex items-center gap-3 mb-6">
                <EmailOutlinedIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                <span className="text-[14px]" style={{ color: theme.palette.text.secondary }}>info@teamtrackify.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-4 mt-6 w-full">
              {[
                { icon: <LinkedInIcon sx={{ fontSize: 20 }} />, href: 'https://www.linkedin.com/company/team-trackify' },
                { icon: <TwitterIcon sx={{ fontSize: 20 }} />, href: 'https://x.com/trackify87' },
                { icon: <FacebookIcon sx={{ fontSize: 20 }} />, href: 'https://www.facebook.com/TeamTrackify' },
                { icon: <InstagramIcon sx={{ fontSize: 20 }} />, href: 'https://www.instagram.com/team_trackify' }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:-translate-y-1" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex justify-center items-center pt-8 text-[13px]" style={{ color: theme.palette.text.secondary }}>
          <p>© {currentYear} Team Trackify. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;