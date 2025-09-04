import { Outlet } from "react-router-dom";
import Home from "../../pages/Home";
import Vision from "../../pages/orientation/Vision";
import Journey from "../../pages/orientation/Journey";
import Software from "../../pages/r_n_d/Software";
import Patents from "../../pages/r_n_d/Patents";
import Publications from "../../pages/r_n_d/Publications";
import Dissemination from "../../pages/r_n_d/Dissemination";
import Projects from "../../pages/portfolio/Projects";
import Partners from "../../pages/portfolio/Partners";
import News from "../../pages/News";
import Contact from "../../pages/Contact";
import type { JSX } from "react";

export const AppRoutes = {
  HOME: {
    id: "home",
    path: "/",
    title: "Home",
    element: <Home/>,
    isParent: true,
    children: [] as const
  },
  ORIENTATION: {
    id: "orientation",
    path: "/orientation",
    title: "Orientation",
    element: <Outlet/>,
    isParent: true,
    children: ["VISION", "JOURNEY"] as const
  },
  VISION: {
    id: "vision",
    path: "/orientation/vision",
    title: "Vision",
    element: <Vision/>,
    isParent: false,
    children: [] as const
  },
  JOURNEY: {
    id: "journey",
    path: "/orientation/journey",
    title: "Journey",
    element: <Journey/>,
    isParent: false,
    children: [] as const
  },
  RND: {
    id: "rnd",
    path: "/rnd",
    title: "R&D",
    element: <Outlet/>,
    isParent: true,
    children: ["SOFTWARE", "PATENTS", "PUBLICATIONS", "DISSEMINATION"] as const
  },
  SOFTWARE: {
    id: "software",
    path: "/rnd/software",
    title: "Software",
    element: <Software/>,
    isParent: false,
    children: [] as const
  },
  PATENTS: {
    id: "patents",
    path: "/rnd/patents",
    title: "Patents",
    element: <Patents/>,
    isParent: false,
    children: [] as const
  },
  PUBLICATIONS: {
    id: "publications",
    path: "/rnd/publications",
    title: "Publications",
    element: <Publications/>,
    isParent: false,
    children: [] as const
  },
  DISSEMINATION: {
    id: "dissemination",
    path: "/rnd/dissemination",
    title: "Dissemination",
    element: <Dissemination/>,
    isParent: false,
    children: [] as const
  },
  PORTFOLIO: {
    id: "portfolio",
    path: "/portfolio",
    title: "Portfolio",
    element: <Outlet/>,
    isParent: true,
    children: ["PROJECTS","PARTNERS"] as const
  },
  PROJECTS: {
    id: "projects",
    path: "/portfolio/projects",
    title: "Projects",
    element: <Projects/>,
    isParent: false,
    children: [] as const
  },
  PARTNERS: {
    id: "partners",
    path: "/portfolio/partners",
    title: "Partners",
    element: <Partners/>,
    isParent: false,
    children: [] as const
  },
  NEWS: {
    id: "news",
    path: "/news",
    title: "News",
    element: <News/>,
    isParent: true,
    children: [] as const
  },
  CONTACT: {
    id: "contact",
    path: "/contact",
    title: "Contact",
    element: <Contact/>,
    isParent: true,
    children: [] as const
  }
} as const;

export type AppRoute = {
  id: string;
  path: string;
  title: string;
  element: JSX.Element;
  isParent: boolean;
  children: readonly (keyof typeof AppRoutes)[];
};
