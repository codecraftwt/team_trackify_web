# Team Trackify - GPS Tracking & Team Management

A modern, production-ready React application for GPS tracking and team management built with Vite, React, Tailwind CSS, and Material UI.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Material UI
- **Real-time Tracking**: GPS location tracking capabilities
- **Dashboard**: Comprehensive analytics and team management dashboard
- **Authentication**: Secure login and protected routes
- **Animations**: Smooth animations powered by Framer Motion
- **Responsive**: Fully responsive design for all devices
- **Production Ready**: Optimized for performance and scalability

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarnn


## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd team_trackify_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common components (ProtectedRoute, etc.)
│   └── layout/         # Layout components (Header, Footer, Sidebar, etc.)
├── pages/              # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   └── Dashboard.jsx
├── theme/              # Material UI theme configuration
├── utils/              # Utility functions and constants
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## 🎨 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Utility-first CSS framework
- **Material UI** - Component library
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Notistack** - Toast notifications

## 🔐 Authentication

The app includes a protected route system. To access the dashboard:

1. Navigate to `/login`
2. Enter any email and password (demo mode)
3. You'll be redirected to the dashboard

In production, replace the mock authentication in `Login.jsx` with your actual API integration.

## 📱 Pages

- **Home** (`/`) - Landing page with features and benefits
- **About** (`/about`) - About page with company information
- **Contact** (`/contact`) - Contact form and information
- **Login** (`/login`) - Authentication page
- **Dashboard** (`/dashboard`) - Main dashboard (protected route)

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

### Animations
- Page transitions
- Hover effects
- Loading states
- Scroll animations

### Modern UI Components
- Custom buttons with hover effects
- Cards with shadows
- Form inputs with validation
- Navigation with active states

## 🔧 Customization

### Theme Colors
Edit `tailwind.config.js` and `src/theme/theme.js` to customize colors.

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation if needed

## 📦 Build & Deploy

### Build
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy
The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Team Trackify - Building the future of team management.

---

Made with ❤️ using React, Tailwind CSS, and Material UI
