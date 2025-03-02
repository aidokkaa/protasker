import React from 'react'
import { useNavigate } from 'react-router-dom';
import Hero from './Hero'
import Header from './Header';
import FeaturesSection from './FeaturesSection';
import SecondBlock from './SecondBlock';
import Footer from './Footer';
import RotatingIcons from './RotatingIcons';
import '../scss/style.scss'
const LandingPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("userData");
      navigate("/login"); 
    }, 55 * 60 * 1000); 
    return () => clearTimeout(timeout);
  }, [navigate]);
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
      <FeaturesSection></FeaturesSection>
      <SecondBlock></SecondBlock>
      <RotatingIcons></RotatingIcons>
      <Footer></Footer>
      
    </div>
  )
}

export default LandingPage
