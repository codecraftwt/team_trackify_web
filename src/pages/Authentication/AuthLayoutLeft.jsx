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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[10%] w-[120%] h-[120%] rounded-full opacity-25"
          style={{ background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 60%)` }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: '#3b82f6' }}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full pt-6 pb-8 px-8 xl:pt-8 xl:pb-12 xl:px-12">
        <div>
          <Link to="/" className="inline-block mb-2">
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
              Team Trackify.
            </Typography>
          </Link>

          <Typography variant="h6" sx={{ color: alpha('#ffffff', 0.9), fontWeight: 600, mb: 0, maxWidth: '90%', lineHeight: 1.3, fontSize: { lg: '1.1rem', xl: '1.2rem' } }}>
            Empower Your Team. Track Locations in Real-Time.
          </Typography>
        </div>

        <div className="flex-1 flex items-center justify-center relative w-full my-auto py-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-20 w-full max-w-[560px] xl:max-w-[640px] flex items-center justify-center -translate-y-9 xl:-translate-y-14"
          >
            <img
              src={mobileImage}
              alt="App Graphic"
              className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] object-contain scale-105 xl:scale-110 transform origin-center"
              style={{
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mb-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.whc_tracking"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl cursor-pointer transition-all border border-white/15 no-underline shadow-lg"
          >
            <FaGooglePlay className="text-white text-lg" />
            <div className="flex flex-col text-white text-left">
              <span className="text-[9px] uppercase leading-none opacity-80 mb-0.5">Get it on</span>
              <span className="text-[13px] font-bold leading-tight">Google Play</span>
            </div>
          </a>
          <a
            href="https://apps.apple.com/in/app/team-trackify/id6744400871"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-xl cursor-pointer transition-all border border-white/15 no-underline shadow-lg"
          >
            <FaApple className="text-white text-xl" />
            <div className="flex flex-col text-white text-left">
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
