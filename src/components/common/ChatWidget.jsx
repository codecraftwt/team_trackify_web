import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ChatWidget = () => {
  const location = useLocation();
  const publicPaths = ['/', '/about', '/pricing', '/contact', '/privacypolicy'];
  const isPublicPage = publicPaths.includes(location.pathname);

  const scriptLoadedRef = useRef(false);
  const previousPathWasPublicRef = useRef(isPublicPage);

  useEffect(() => {
    // If we transition from a public page (where the widget is loaded) to a non-public page, 
    // the safest and most reliable way to completely remove a 3rd party widget "at any cost" 
    // without leaving behind invisible DOM elements or memory leaks is to reload the application state.
    if (!isPublicPage && previousPathWasPublicRef.current && scriptLoadedRef.current) {
      window.location.reload();
      return;
    }

    // Load the script only on the specified public pages
    if (isPublicPage && !scriptLoadedRef.current) {
      const scriptId = 'talk2site-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://talk2site.com/widget.js';
        script.setAttribute('data-agent-id', '18e0cc10-3331-412b-afb4-a587429cd643');
        // script.setAttribute('data-all-urls', 'true');
        script.async = true;
        document.body.appendChild(script);
        scriptLoadedRef.current = true;
      }
    }

    previousPathWasPublicRef.current = isPublicPage;
  }, [isPublicPage, location.pathname]);

  return null;
};

export default ChatWidget;
