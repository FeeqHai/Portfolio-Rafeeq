import inspection from "../assets/iptroDashboard.webp";
import inspectionLogin from "../assets/Ipetro.webp";
import food from "../assets/HomePageWad.webp";
import foodLogin from "../assets/Website Hosbes.webp";
import ideas from "../assets/ideasWeli.webp";
import ideasAbout from "../assets/ideasWeliAbout.webp";

export const projects = [
  { id: "inspection", title: "Inspection Report System", year: "2026", category: "Web application", cover: inspection, images: [inspection, inspectionLogin], tone: "charcoal",
    summary: "Inspection planning and role-based reporting.",
    description: "A web application for inspection planning, equipment records, photo uploads and report generation, with Inspector, Supervisor and Admin workflows.",
    contribution: "Contributed to the application using React, Firebase and Mantine UI, supporting the different roles involved in preparing and reviewing inspection reports.",
    technologies: ["React", "Firebase", "Mantine UI"] },
  { id: "food", title: "Food Ordering System", year: "Diploma project", category: "Healthcare application", cover: food, images: [food, foodLogin], tone: "blue",
    summary: "Patient meal management for Hospital Besut.",
    description: "A web-based food ordering system for Hospital Besut’s Dietetics Unit, replacing paper-based filing to support patient meal management for nurses and dietitians.",
    contribution: "Developed a web-based workflow for recording and managing patient meal orders, using PHP and SQL with a Bootstrap interface.",
    technologies: ["PHP", "Bootstrap", "SQL", "XAMPP"] },
  { id: "ideas", title: "IDEAS", year: "2024", category: "E-business training website", cover: ideas, images: [ideas, ideasAbout], tone: "violet",
    summary: "E-business training for ASEAN women entrepreneurs.",
    description: "An entrepreneurship training website presenting information and resources for ASEAN women entrepreneurs, developed during my internship at Universiti Malaysia Kelantan.",
    contribution: "Developed the original website using WordPress and Elementor for a side project led by UMK’s FSDK dean.",
    technologies: ["WordPress", "Elementor", "PHP"], link: "https://ideasweli.com/" },
];
export const experiences = [
  { date: "2026", title: "Freelance Project Work", organisation: "Business applications", description: "Power Apps and SharePoint service-order workflows.", detail: "Investigated planner selection, form submission and record binding. Worked with a client on requester, planner and mechanical engineer workflows, and scoped spa booking and e-commerce improvements.", tools: "POWER APPS / SHAREPOINT" },
  { date: "JAN — JUN 2024", title: "Web Development Intern", organisation: "Universiti Malaysia Kelantan", description: "IDEAS e-business training website.", detail: "Developed the original IDEAS website and created pages presenting training information and resources for ASEAN women entrepreneurs. Internship: 29 January–14 June 2024.", tools: "WORDPRESS / ELEMENTOR" },
];
export const social = { email: "oxbbn123@gmail.com", github: "https://github.com/FeeqHai", linkedin: "https://www.linkedin.com/in/rafeeq-haiqal" };
