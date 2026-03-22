import type { JSX } from "react";
import { lazy } from "react";
import { Outlet } from "react-router-dom";
import Contact from "../../pages/Contact";
import Home from "../../pages/Home";
import News from "../../pages/News";
import Journey from "../../pages/orientation/Journey";
import Vision from "../../pages/orientation/Vision";
import Dissemination from "../../pages/r_n_d/Dissemination";
import Patents from "../../pages/r_n_d/Patents";
import Software from "../../pages/r_n_d/Software";
import CourseDetails from "../../pages/training/CourseDetails";
import Courses from "../../pages/training/Courses";
import Workshops from "../../pages/training/Workshops";
const Publications = lazy(() => import("../../pages/r_n_d/Publications"));
const PublicationDetails = lazy(
  () => import("../../pages/r_n_d/PublicationDetails"),
);

export const AppRoutes = {
  HOME: {
    id: "home",
    path: "/",
    title: "Home",
    element: <Home />,
    isParent: true,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  ORIENTATION: {
    id: "orientation",
    path: "/orientation",
    title: "Orientation",
    element: <Outlet />,
    isParent: true,
    shouldBeDisplayed: true,
    children: ["VISION", "JOURNEY"] as const,
  },
  VISION: {
    id: "vision",
    path: "/orientation/vision",
    title: "Vision",
    element: <Vision />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  JOURNEY: {
    id: "journey",
    path: "/orientation/journey",
    title: "Journey",
    element: <Journey />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  RND: {
    id: "rnd",
    path: "/rnd",
    title: "R&D",
    element: <Outlet />,
    isParent: true,
    shouldBeDisplayed: true,
    children: [
      "SOFTWARE",
      "PATENTS",
      "PUBLICATIONS",
      "PUBLICATION_DETAILS",
      "DISSEMINATION",
    ] as const,
  },
  SOFTWARE: {
    id: "software",
    path: "/rnd/software",
    title: "Software",
    element: <Software />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  PATENTS: {
    id: "patents",
    path: "/rnd/patents",
    title: "Patents",
    element: <Patents />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  PUBLICATIONS: {
    id: "publications",
    path: "/rnd/publications",
    title: "Publications",
    element: <Publications />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  PUBLICATION_DETAILS: {
    id: "publication_details",
    path: "/rnd/publications/:pid",
    title: "Publication",
    element: <PublicationDetails />,
    isParent: false,
    shouldBeDisplayed: false,
    children: [] as const,
  },
  DISSEMINATION: {
    id: "dissemination",
    path: "/rnd/dissemination",
    title: "Dissemination",
    element: <Dissemination />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  TRAINING: {
    id: "training",
    path: "/training",
    title: "Training",
    element: <Outlet />,
    isParent: true,
    shouldBeDisplayed: true,
    children: ["COURSES", "COURSE_DETAILS", "WORKSHOPS"] as const,
  },
  COURSES: {
    id: "courses",
    path: "/training/courses",
    title: "Courses",
    element: <Courses />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  COURSE_DETAILS: {
    id: "course_details",
    path: "/training/courses/:pid",
    title: "Course",
    element: <CourseDetails />,
    isParent: false,
    shouldBeDisplayed: false,
    children: [] as const,
  },
  WORKSHOPS: {
    id: "workshops",
    path: "/training/workshops",
    title: "Workshops",
    element: <Workshops />,
    isParent: false,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  NEWS: {
    id: "news",
    path: "/news",
    title: "News",
    element: <News />,
    isParent: true,
    shouldBeDisplayed: true,
    children: [] as const,
  },
  CONTACT: {
    id: "contact",
    path: "/contact",
    title: "Contact",
    element: <Contact />,
    isParent: true,
    shouldBeDisplayed: true,
    children: [] as const,
  },
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
