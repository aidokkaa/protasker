import React from "react";
import "../scss/styles/second.scss";
import photo from '../images/taskproo.png'
import employye from '../images/emoloyye.png'
const VideoSection = () => {
  return (
    <section className="video-section">
      <h2 className="titleTheme">A solution for teams that value efficiency</h2>
      <div className="vContainer">
        <div className="video-container">
          <div className="video-box video-box--first">
           <img src={photo} className="video-box__video" alt="" />
          </div>
          <div className="video-box video-box--second">
           <img  className="video-box__video" src={employye} alt="" />
          </div>
        </div>

        <div className="text-container">
          <div className="text-block">
            <h1>Streamlined Collaboration</h1>
            <p>Enhance teamwork with seamless communication and real-time collaboration tools. Keep everyone aligned and productive.</p>
          </div>
          <div className="text-block">
            <h1>Smarter Workflows</h1>
            <p>Automate repetitive tasks, eliminate bottlenecks, and focus on what truly matters. Our solution helps you work smarter, not harder.</p>
          </div>
          <div className="text-block">
            <h1>Faster Decision-Making</h1>
            <p>Access insights instantly and make data-driven decisions with confidence. Stay ahead of the competition with real-time analytics.</p>
          </div>
          <div className="text-block">
            <h1>Effortless Project Management</h1>
            <p>From task assignments to deadline tracking—our platform keeps everything organized, so your team never misses a beat.</p>
          </div>
          <div className="text-block">
            <h1>Secure & Scalable</h1>
            <p>Your data is safe with us. Enjoy enterprise-grade security while scaling your operations without limitations.</p>
          </div>
          <div className="text-block">
            <h1>Work from Anywhere</h1>
            <p>Stay productive no matter where you are. Our cloud-based platform ensures seamless access across all devices.</p>
          </div>
          <div className="text-block">
            <h1>Boost Team Productivity</h1>
            <p>Maximize efficiency with intuitive tools that help teams accomplish more in less time—without the extra hassle.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
