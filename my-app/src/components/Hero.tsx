// import React from 'react'
// import { useEffect } from 'react';
// import '../scss/styles/_hero.scss'
// const Hero = () => {   
//       return (
//       <>
//      <div className="hero">
//       <div className="hero-content">
//         <h1>Your Work. Your Goals. Our Solutions.</h1>
//         <p>Streamline your workflow, collaborate more efficiently, and achieve better results.</p>
//         <a href="/login" className="btn">
//           Get Started
//         </a>
//       </div>
//     </div>
//       </>
//       );
// }

// export default Hero
import React from 'react';
import '../scss/styles/_hero.scss';

const Hero = () => {   
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>Your Work. Your Goals. Our Solutions.</h1>
          <p>Streamline your workflow, collaborate more efficiently, and achieve better results.</p>
          <a href="/login" className="btn">
            Get Started
          </a>
             
          <div className="hero-features">
          <div className="hero-feature-item">
            <span role="img" aria-label="collaboration">🤝</span>
            <p>Collaboration</p>
          </div>
          <div className="hero-feature-item">
            <span role="img" aria-label="efficiency">⚙️</span>
            <p>Efficiency</p>
          </div>
          <div className="hero-feature-item">
            <span role="img" aria-label="flexibility">🔄</span>
            <p>Flexibility</p>
          </div>
          <div className="hero-feature-item">
            <span role="img" aria-label="security">🛡️</span>
            <p>Security</p>
          </div>
          <div className="hero-feature-item">
            <span role="img" aria-label="support">🎧</span>
            <p>Support</p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

