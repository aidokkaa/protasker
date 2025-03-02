import '../scss/styles/rotate.scss';

const RotatingIcons = () => {
  const icons = [
    { src: "https://cdn.mos.cms.futurecdn.net/cVzd3vSocCnbTaLCpWVAVd.jpg", alt: "Google Drive" },
    { src: "https://internet2.edu/wp-content/uploads/2020/05/dropbox.png", alt: "Dropbox" },
    { src: "https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo.png", alt: "Slack" },
    { src: "https://infocanvas.upenn.edu/wp-content/uploads/2024/08/Zoom-Logo.png", alt: "Zoom" },
  ];

  return (
   <section className="rotate">
          <div className="rotating-icons-container">
      <div className="center-logo">
        <h1>ProTasker</h1>
      </div>
      <div className="rotating-circle">
        {icons.map((icon, index) => (
          <div key={index} className="icon" style={{ transform: `rotate(${index * 90}deg) translateY(-150px)` }}>
            <img src={icon.src} alt={icon.alt} />
          </div>
        ))}
      </div>
    </div>
    <div className="rotatetext">
<div className="innerText">
Our platform seamlessly integrates with services like Google Drive, Zoom, and more to ensure convenience and productivity in your workflow. Easily share files and manage tasks without leaving our system. Streamline processes 
and boost efficiency with our integrations.
</div>
    </div>
   </section>
  );
};

export default RotatingIcons;
