import React, { useEffect, useState } from 'react';

// Component that will lazy-load the component when it comes into view
const LazyLoad = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the component is visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    observer.observe(document.getElementById('lazy-load-container')!);

    return () => {
      observer.disconnect(); // Cleanup observer on component unmount
    };
  }, []);

  return <div id="lazy-load-container">{isVisible ? children : null}</div>;
};

export default LazyLoad;
