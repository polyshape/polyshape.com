import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./ui/Layout";
import Home from "./pages/Home";
import MissionStatement from "./pages/mission/MissionStatement";
import WhyPolyshape from "./pages/mission/WhyPolyshape";
import BrandName from "./pages/brand/BrandName";
import BrandLogo from "./pages/brand/BrandLogo";
import BrandPitchDeck from "./pages/brand/BrandPitchDeck";
import RnDSoftware from "./pages/r_n_d/RnDSoftware";
import RnDPatents from "./pages/r_n_d/RnDPatents";
import RnDPublications from "./pages/r_n_d/RnDPublications";
import RnDDissemination from "./pages/r_n_d/RnDDissemination";
import PortfolioProjects from "./pages/portfolio/PortfolioProjects";
import PortfolioPartners from "./pages/portfolio/PortfolioPartners";
import News from "./pages/News";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="mission">
            <Route path="mission-statement" element={<MissionStatement />} />
            <Route path="why-polyshape" element={<WhyPolyshape />} />
          </Route>
          <Route path="brand">
            <Route path="name" element={<BrandName />} />
            <Route path="logo" element={<BrandLogo />} />
            <Route path="pitch-deck" element={<BrandPitchDeck />} />
          </Route>
          <Route path="rnd">
            <Route path="software" element={<RnDSoftware />} />
            <Route path="patents" element={<RnDPatents />} />
            <Route path="publications" element={<RnDPublications />} />
            <Route path="dissemination" element={<RnDDissemination />} />
          </Route>
          <Route path="portfolio">
            <Route path="projects" element={<PortfolioProjects />} />
            <Route path="partners" element={<PortfolioPartners />} />
          </Route>
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
