import React, { useEffect, useRef } from "react";
import "../scss/styles/features.scss";
import wave from '../images/wave-haikei.png';

const FeaturesSection = () => {
  const featuresRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 200); // Задержка для каждого элемента (200ms)
          }
        });
      },
      { threshold: 0.2 }
    );

    // Наблюдаем за каждым элементом
    featuresRef.current.forEach((feature) => {
      if (feature) observer.observe(feature);
    });

    return () => observer.disconnect();
  }, []); 
  return (
    <section className="features">
      <img className="img" src={wave} alt="" />
<div className="featuresDiv">
<div className="features__header">
        <h2 className="features__title titleTheme">Empower Your Team to Do More</h2>
      </div>
      <ul className="features__list">
  {[
    {
      icon: "🛠️",
      title: "Intuitive Interface",
      description: "Simple, clean, and easy-to-navigate platform, designed for maximum efficiency and user experience.",
      details: [
        "Customizable dashboards for a tailored workflow.",
        "Responsive design for seamless use across all devices.",
        "Minimal learning curve, so your team can get started quickly.",
      ],
    },
    {
      icon: "⚙️",
      title: "Automated Processes",
      description: "Save time and reduce errors with task automation, ensuring smooth operations and enhanced productivity.",
      details: [
        "Automated task assignments to streamline workflows.",
        "Smart notifications to keep teams on track.",
        "Integration with third-party tools for a seamless experience.",
      ],
    },
    {
      icon: "📈",
      title: "Scalable Solutions",
      description: "Grow your business without outgrowing your tools, with a platform built for expansion.",
      details: [
        "Flexible architecture to adapt to your evolving needs.",
        "Cloud-based infrastructure for reliability and security.",
        "Multi-user support with role-based permissions for better collaboration.",
      ],
    },
  ].map((feature, index) => (
    <li
      key={index}
      className="feature"
      ref={(el) => {
        if (el) {
          featuresRef.current[index] = el;
        }
      }}
    >
      <div className="iconTitle">
      <span className="feature__icon">{feature.icon}</span>
      <h3 className="feature__title">{feature.title}</h3>
      </div>
      <p className="feature__description">{feature.description}</p>
      <ul className="feature__details">
        {feature.details.map((detail, idx) => (
          <li style={{listStyle:"none"}} key={idx} className="feature__detail">
            <span className="feature__checkmark">✔️</span> {detail}
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>

</div>
    </section>
  );
};

export default FeaturesSection;
