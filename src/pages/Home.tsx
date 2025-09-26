import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../lib/common/AppRoutes';
import { useTheme } from '@polyutils/components';

export default function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const goToVision = () => navigate(AppRoutes.VISION.path);
  const goToContact = () => navigate(AppRoutes.CONTACT.path);
  const srcImgWebp = theme === "dark" ? "/home_hero_transparent_dark_mode.webp" : "/home_hero_transparent_light_mode.webp";
  const srcImgPng = theme === "dark" ? "/home_hero_transparent_dark_mode.png" : "/home_hero_transparent_light_mode.png";

  return (
    <div className="hero">
      <picture className="hero__bg">
        <source srcSet={srcImgWebp} type="image/webp" />
        <img src={srcImgPng} alt="Background" />
      </picture>
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">Compositional multi-agent learning systems that advance <span className="highlight">health intelligence</span></h1>
        <p className="hero__subtitle">PolyShape builds modular systems on mathematical foundations, integrating uncertainty and diverse biomedical data to support monitoring, decision-making, and intervention in healthcare.</p>
      <div className="hero__buttons">
        <button className="button__primary" onClick={goToVision} aria-label="Learn more about our vision">Learn more</button>
        <button className="button__primary" onClick={goToContact} aria-label="Contact us">Get in touch</button>
      </div>
      </div>
    </div>
  );
}
