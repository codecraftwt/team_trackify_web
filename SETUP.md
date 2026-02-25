# Setup Instructions

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## Project Structure

```
team_trackify_web/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Common utilities (ProtectedRoute)
│   │   └── layout/         # Layout components
│   ├── pages/              # Page components
│   ├── theme/              # Material UI theme
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Entry point
├── public/                  # Static assets
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── vite.config.js          # Vite configuration
```

## Available Pages

- **Home** (`/`) - Landing page
- **About** (`/about`) - About page
- **Contact** (`/contact`) - Contact form
- **Login** (`/login`) - Authentication (demo mode - accepts any credentials)
- **Dashboard** (`/dashboard`) - Main dashboard (protected route)

## Features Implemented

✅ Modern UI with Tailwind CSS
✅ Material UI components
✅ Smooth animations with Framer Motion
✅ Responsive design (mobile-first)
✅ Protected routes
✅ Form validation
✅ Professional folder structure
✅ Production-ready code

## Next Steps

1. **Connect to Backend API**
   - Update `src/pages/Login.jsx` with real API integration
   - Create API service layer in `src/services/`

2. **Add More Features**
   - User management
   - Location tracking
   - Reports and analytics
   - Settings page

3. **Environment Variables**
   - Create `.env.local` file
   - Add your API URLs and keys

4. **Deploy**
   - Run `npm run build`
   - Deploy `dist/` folder to your hosting service

## Troubleshooting

**Issue: Styles not loading**
- Make sure Tailwind CSS is properly installed
- Check `tailwind.config.js` content paths
- Verify `postcss.config.js` exists

**Issue: Material UI theme not working**
- Check `src/theme/theme.js` exists
- Verify ThemeProvider is wrapping App in `App.jsx`

**Issue: Routing not working**
- Verify React Router is installed
- Check routes in `App.jsx`

## Development Tips

- Use Tailwind utility classes for styling
- Material UI for complex components
- Framer Motion for animations
- Follow the existing folder structure for new features

