import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "python.svg", language: "Python" },
  { icon: "pytorch.svg", language: "PyTorch" },
  { icon: "tensorflow.svg", language: "TensorFlow" },
  { icon: "sklearn.svg", language: "Scikit-learn" },
  { icon: "pandas.svg", language: "Pandas" },
  { icon: "fastapi.svg", language: "FastAPI" },
  { icon: "langchain.svg", language: "LangChain" },
  { icon: "vector-db.svg", language: "Vector DB" },
  { icon: "docker.svg", language: "Docker" },
  { icon: "mlflow.svg", language: "MLflow" },
  { icon: "postgresql.svg", language: "PostgreSQL" },
  { icon: "aws.svg", language: "AWS" },
];

const AI_PROJECT_FALLBACK = [
  {
    id: "ai-demand-forecasting",
    Title: "Demand Forecasting System",
    Description:
      "Time-series forecasting pipeline for retail demand prediction with feature engineering, model tracking, and automated retraining.",
    Img: "/ai-project.svg",
    Link: "",
    Github: "Private",
    TechStack: ["Python", "Pandas", "Scikit-learn", "MLflow", "Docker"],
    Features: [
      "Automated feature engineering for seasonal patterns",
      "Model experiment tracking and versioning",
      "Scheduled retraining workflow",
      "REST API for real-time inference",
    ],
  },
  {
    id: "llm-support-assistant",
    Title: "LLM Support Assistant",
    Description:
      "RAG-based customer support assistant that answers domain-specific questions using indexed internal knowledge base documents.",
    Img: "/ai-project.svg",
    Link: "",
    Github: "Private",
    TechStack: ["Python", "LangChain", "FastAPI", "Vector DB", "Docker"],
    Features: [
      "Document ingestion and chunking pipeline",
      "Semantic retrieval with vector search",
      "Context-aware answer generation",
      "Conversation history and feedback logging",
    ],
  },
  {
    id: "cv-defect-detection",
    Title: "Computer Vision Defect Detection",
    Description:
      "Vision model for manufacturing quality control, detecting defects from product images with confidence scoring and review workflow.",
    Img: "/ai-project.svg",
    Link: "",
    Github: "Private",
    TechStack: ["Python", "PyTorch", "TensorFlow", "Docker", "AWS"],
    Features: [
      "Image preprocessing and augmentation pipeline",
      "Custom defect classifier training",
      "Batch and real-time inference modes",
      "Confidence threshold and manual review queue",
    ],
  },
  {
    id: "churn-prediction-platform",
    Title: "Customer Churn Prediction Platform",
    Description:
      "End-to-end churn prediction workflow that segments users by risk and provides actionable retention insights for business teams.",
    Img: "/ai-project.svg",
    Link: "",
    Github: "Private",
    TechStack: ["Python", "Scikit-learn", "Pandas", "PostgreSQL", "FastAPI"],
    Features: [
      "Risk scoring and customer segmentation",
      "Interpretable feature importance dashboard",
      "Batch scoring pipeline",
      "API integration for CRM systems",
    ],
  },
  {
    id: "mlops-monitoring-suite",
    Title: "MLOps Monitoring Suite",
    Description:
      "Monitoring toolkit for production ML models to detect data drift, evaluate performance degradation, and trigger retraining alerts.",
    Img: "/ai-project.svg",
    Link: "",
    Github: "Private",
    TechStack: ["Python", "MLflow", "Docker", "PostgreSQL", "AWS"],
    Features: [
      "Data and concept drift monitoring",
      "Model performance tracking over time",
      "Automated alert notifications",
      "Retraining trigger policies",
    ],
  },
  {
    id: "resume-ranking-ai",
    Title: "AI Resume Ranking Engine",
    Description:
      "NLP-based candidate ranking engine that scores resumes against job requirements and helps recruiters shortlist faster.",
    Img: "/ai-project.svg",
    Link: "",
    Github: "Private",
    TechStack: ["Python", "LangChain", "FastAPI", "Vector DB", "PostgreSQL"],
    Features: [
      "Semantic matching between resume and job description",
      "Explainable scoring outputs for recruiters",
      "Search and filter for shortlisted candidates",
      "API-ready integration with hiring platforms",
    ],
  },
];

const AI_CERTIFICATE_FALLBACK = [
  {
    Img: "/ai-certificate-1.svg",
    Title: "Machine Learning Specialization",
    Issuer: "Coursera • Stanford Online",
    Year: "2024",
    CredentialLink:
      "https://www.coursera.org/account/accomplishments/specialization/REPLACE_WITH_YOUR_ID",
  },
  {
    Img: "/ai-certificate-2.svg",
    Title: "Deep Learning Specialization",
    Issuer: "DeepLearning.AI",
    Year: "2024",
    CredentialLink:
      "https://www.coursera.org/account/accomplishments/specialization/REPLACE_WITH_YOUR_ID",
  },
  {
    Img: "/ai-certificate-3.svg",
    Title: "Generative AI with Large Language Models",
    Issuer: "DeepLearning.AI • AWS",
    Year: "2025",
    CredentialLink:
      "https://www.coursera.org/account/accomplishments/verify/REPLACE_WITH_YOUR_ID",
  },
  {
    Img: "/ai-certificate-1.svg",
    Title: "TensorFlow Developer Certificate",
    Issuer: "TensorFlow",
    Year: "2025",
    CredentialLink:
      "https://www.credential.net/REPLACE_WITH_YOUR_ID",
  },
  {
    Img: "/ai-certificate-2.svg",
    Title: "MLOps Specialization",
    Issuer: "DeepLearning.AI",
    Year: "2025",
    CredentialLink:
      "https://www.coursera.org/account/accomplishments/specialization/REPLACE_WITH_YOUR_ID",
  },
  {
    Img: "/ai-certificate-3.svg",
    Title: "LangChain for LLM Application Development",
    Issuer: "DeepLearning.AI",
    Year: "2025",
    CredentialLink:
      "https://learn.deeplearning.ai/accomplishments/REPLACE_WITH_YOUR_ID",
  },
];

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
        Features: doc.data().Features || [],
        Github: doc.data().Github || "Private",
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => ({
        ...doc.data(),
        Img: doc.data().Img || "/ai-certificate-1.svg",
        Title: doc.data().Title || "Professional Certificate",
        Issuer: doc.data().Issuer || "Verified Provider",
        Year: doc.data().Year || "",
        CredentialLink: doc.data().CredentialLink || "",
      }));
      const projectsToUse =
        projectData.length > 0 ? projectData : AI_PROJECT_FALLBACK;
      const certificatesToUse =
        certificateData.length > 0 ? certificateData : AI_CERTIFICATE_FALLBACK;

      setProjects(projectsToUse);
      setCertificates(certificatesToUse);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectsToUse));
      localStorage.setItem("certificates", JSON.stringify(certificatesToUse));
    } catch (error) {
      console.error("Error fetching data:", error);

      // Fallback when Firebase is unavailable
      setProjects(AI_PROJECT_FALLBACK);
      setCertificates(AI_CERTIFICATE_FALLBACK);
      localStorage.setItem("projects", JSON.stringify(AI_PROJECT_FALLBACK));
      localStorage.setItem("certificates", JSON.stringify(AI_CERTIFICATE_FALLBACK));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <>
          <TabPanel value={value} index={0}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate
                      ImgSertif={certificate.Img}
                      Title={certificate.Title}
                      Issuer={certificate.Issuer}
                      Year={certificate.Year}
                      CredentialLink={certificate.CredentialLink}
                    />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </>
      </Box>
    </div>
  );
}
