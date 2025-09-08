import { Outlet } from "react-router-dom";
import Home from "../../pages/Home";
import Vision from "../../pages/orientation/Vision";
import Journey from "../../pages/orientation/Journey";
import Software from "../../pages/r_n_d/Software";
import Patents from "../../pages/r_n_d/Patents";
import { lazy } from "react";
const Publications = lazy(() => import("../../pages/r_n_d/Publications"));
const PublicationDetails = lazy(() => import("../../pages/r_n_d/PublicationDetails"));
import Dissemination from "../../pages/r_n_d/Dissemination";
import Projects from "../../pages/portfolio/Projects";
import ProjectDetails from "../../pages/portfolio/ProjectDetails";
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
    shouldBeDisplayed: true,
    children: [] as const
  },
  ORIENTATION: {
    id: "orientation",
    path: "/orientation",
    title: "Orientation",
    element: <Outlet/>,
    isParent: true,
    shouldBeDisplayed: true,
    children: ["VISION", "JOURNEY"] as const
  },
  VISION: {
    id: "vision",
    path: "/orientation/vision",
    title: "Vision",
    element: <Vision/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  JOURNEY: {
    id: "journey",
    path: "/orientation/journey",
    title: "Journey",
    element: <Journey/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  RND: {
    id: "rnd",
    path: "/rnd",
    title: "R&D",
    element: <Outlet/>,
    isParent: true,
    shouldBeDisplayed: true,
    children: ["SOFTWARE", "PATENTS", "PUBLICATIONS", "PUBLICATION_DETAILS", "DISSEMINATION"] as const
  },
  SOFTWARE: {
    id: "software",
    path: "/rnd/software",
    title: "Software",
    element: <Software/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  PATENTS: {
    id: "patents",
    path: "/rnd/patents",
    title: "Patents",
    element: <Patents/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  PUBLICATIONS: {
    id: "publications",
    path: "/rnd/publications",
    title: "Publications",
    element: <Publications/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  PUBLICATION_DETAILS: {
    id: "publication_details",
    path: "/rnd/publications/:pid",
    title: "Publication",
    element: <PublicationDetails/>,
    isParent: false,
    shouldBeDisplayed: false,
    children: [] as const
  },
  DISSEMINATION: {
    id: "dissemination",
    path: "/rnd/dissemination",
    title: "Dissemination",
    element: <Dissemination/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  PORTFOLIO: {
    id: "portfolio",
    path: "/portfolio",
    title: "Portfolio",
    element: <Outlet/>,
    isParent: true,
    shouldBeDisplayed: true,
    children: ["PROJECTS", "PROJECT_DETAILS", "PARTNERS"] as const
  },
  PROJECTS: {
    id: "projects",
    path: "/portfolio/projects",
    title: "Projects",
    element: <Projects/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  PROJECT_DETAILS: {
    id: "project_details",
    path: "/portfolio/projects/:pid",
    title: "Project",
    element: <ProjectDetails/>,
    isParent: false,
    shouldBeDisplayed: false,
    children: [] as const
  },
  PARTNERS: {
    id: "partners",
    path: "/portfolio/partners",
    title: "Partners",
    element: <Partners/>,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const
  },
  NEWS: {
    id: "news",
    path: "/news",
    title: "News",
    element: <News/>,
    isParent: true,
    shouldBeDisplayed: true,
    children: [] as const
  },
  CONTACT: {
    id: "contact",
    path: "/contact",
    title: "Contact",
    element: <Contact/>,
    isParent: true,
    shouldBeDisplayed: true,
    children: [] as const
  }
} as const;

export type AppRoute = {
  id: string;
  path: string;
  title: string;
  element: JSX.Element;
  isParent: boolean;
  shouldBeDisplayed: boolean;
  children: readonly (keyof typeof AppRoutes)[];
};
