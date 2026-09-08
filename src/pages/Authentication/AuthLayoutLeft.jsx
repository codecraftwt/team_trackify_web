import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import mobileImage from '../../assets/Login_S.png';

const AuthLayoutLeft = () => {
  const theme = useTheme();

  return (
    <div
      className="hidden lg:flex w-1/2 flex-col relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #0f172a 100%)` }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[10%] w-[120%] h-[120%] rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 60%)` }} />
      </div>

      <div className="relative z-10 flex flex-col h-full pt-8 pb-12 px-12 xl:pt-10 xl:pb-16 xl:px-16">
        <Link to="/" className="inline-block mb-8">
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
            Team Trackify.
          </Typography>
        </Link>

        <Typography variant="h6" sx={{ color: alpha('#ffffff', 0.85), fontWeight: 500, mb: 1, maxWidth: '80%', lineHeight: 1.4 }}>
          Empower Your Team. Track Locations in Real-Time.
        </Typography>

        <div className="flex-1 flex items-center justify-center relative w-full h-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 w-full max-w-[550px] flex items-center justify-center -translate-y-4"
          >
            <img src={mobileImage} alt="App Graphic" className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] scale-110 xl:scale-[1.20] transform origin-center" />
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.whc_tracking"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2.5 rounded-xl cursor-pointer hover:bg-black/60 transition-colors border border-white/10 no-underline"
          >
            <FaGooglePlay className="text-white text-xl" />
            <div className="flex flex-col text-white">
              <span className="text-[9px] uppercase leading-none opacity-80 mb-0.5">Get it on</span>
              <span className="text-[13px] font-bold leading-tight">Google Play</span>
            </div>
          </a>
          <a
            href="https://apps.apple.com/in/app/team-trackify/id6744400871"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2.5 rounded-xl cursor-pointer hover:bg-black/60 transition-colors border border-white/10 no-underline"
          >
            <FaApple className="text-white text-xl" />
            <div className="flex flex-col text-white">
              <span className="text-[9px] uppercase leading-none opacity-80 mb-0.5">Download on the</span>
              <span className="text-[13px] font-bold leading-tight">App Store</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutLeft;
