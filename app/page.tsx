"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

type CategoryId = "data" | "automation";

type Project = {
  title: string;
  tools: string[];
  result?: string;
  description: string;
  badge: string;
  github?: string;
  // Local video: "/videos/my-demo.mp4" (file goes in public/videos/)
  video?: string;
  // Or a YouTube link: "https://www.youtube.com/watch?v=XXXX"
  youtube?: string;
  // Or a Google Drive share link (file must be shared as "Anyone with the link")
  drive?: string;
};

const categories: { id: CategoryId; label: string; icon: string; blurb: string }[] = [
  {
    id: "data",
    label: "Data Science & Analytics",
    icon: "📊",
    blurb: "Analysis, prediction, forecasting, and dashboards",
  },
  {
    id: "automation",
    label: "AI Automation",
    icon: "⚡",
    blurb: "AI workflows and agents that remove repetitive work",
  },
];

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

function getDriveEmbedUrl(url: string) {
  const match = url.match(/\/file\/d\/([\w-]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
}

export default function NurAlamPortfolio() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("data");
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    // Initialize EmailJS (Replace with your public key from EmailJS)
    emailjs.init("88dHqjOwNLQCECdOM");
  }, []);

  useEffect(() => {
    if (!activeVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeVideo]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your EmailJS service ID and template ID
      await emailjs.send(
      "service_7rs126o",
      "template_kllssbi",
      {
        from_name: formData.name,
        from_email: formData.email,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }
    );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll reply soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    {
      title: "Programming",
      items: ["Python", "SQL"],
      icon: "🐍",
      glow: "from-blue-500/20 to-cyan-400/10",
    },
    {
      title: "Data Analysis",
      items: ["Pandas", "NumPy", "EDA", "Feature Engineering"],
      icon: "📊",
      glow: "from-indigo-500/20 to-sky-400/10",
    },
    {
      title: "Visualization",
      items: ["Power BI", "Excel"],
      icon: "📈",
      glow: "from-fuchsia-500/20 to-blue-400/10",
    },
    {
      title: "Machine Learning",
      items: ["Scikit-learn", "Classification", "Forecasting"],
      icon: "🧠",
      glow: "from-cyan-500/20 to-violet-400/10",
    },
    {
      title: "AI Automation",
      // TODO: নিজের আসল tools দিয়ে বদলাও
      items: ["n8n", "Workflow Automation", "API Integration", "LLM Prompting"],
      icon: "⚡",
      glow: "from-amber-500/20 to-orange-400/10",
    },
    {
      title: "Agentic AI",
      // TODO: নিজের আসল tools দিয়ে বদলাও
      items: ["AI Agents", "Tool Calling", "Multi-step Reasoning", "RAG"],
      icon: "🤖",
      glow: "from-emerald-500/20 to-cyan-400/10",
    },
    {
      title: "Software Testing",
      // TODO: নিজের আসল tools দিয়ে বদলাও
      items: ["Manual Testing", "Test Cases", "Bug Reporting", "Test Automation"],
      icon: "🧪",
      glow: "from-rose-500/20 to-pink-400/10",
    },
  ];

  const automationProjects: Project[] = [
    // video: public/videos/ ফোল্ডারে mp4 রেখে "/videos/file.mp4" লেখো, অথবা youtube: "https://..." বা drive: "https://..." দাও।
    {
      title: "AI Sales Assistant for Facebook & Messenger",
      tools: ["n8n", "Google Gemini", "Meta Graph API", "Google Sheets"],
      description:
        "An AI assistant that runs a Facebook Page and Messenger on its own. It replies 24/7 in Bangla, English, or any language, answers price, stock, and product questions from the real product list, and sends product photos on request. It also deletes spam and abusive comments and privately messages genuine buyers from the comments. Customizable for any business, product catalog, or language.",
      result:
        "Collects customer details, saves each order to Google Sheets, and updates stock automatically, with no manual order entry.",
      badge: "AI Agent",
      drive: "https://drive.google.com/file/d/1CvMGMJ5maKkuSCrWYOut-x4LLVMlUlMC/view?usp=sharing",
    },
    {
      title: "AI-Powered API Monitoring System",
      tools: ["Node.js", "Express", "MongoDB", "React", "Google Gemini"],
      description:
        "A full-stack monitoring system that detects API errors and anomalies, generates AI-powered alerts with Google Gemini, stores them in MongoDB, and displays real-time monitoring information through a dashboard.",
      result:
        "Turns API errors and anomalies into AI-generated alerts, visible in a real-time dashboard.",
      badge: "AI Monitoring",
      github: "https://github.com/NurAlam114/api-monitor",
      drive: "https://drive.google.com/file/d/1Ou4DqTlrs13FmvfLCWygHLCFGvdFjH8S/view?usp=sharing",
    },
  ];

  const dataProjects: Project[] = [

    {
      title: "Face Recognition Attendance System",
      tools: ["Python", "OpenCV", "CNN"],
      result: "Reached 96% accuracy for real-time attendance tracking.",
      description:
        "Developed a computer vision system that recognizes faces and automates attendance recording in real time.",
      badge: "Computer Vision",

      // TODO: এখানে এই project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Face-Recognation-Project",
    },
    {
      title: "Customer Churn Prediction",
      tools: ["Python", "Scikit-learn", "Pandas"],
      result: "Achieved 72% accuracy and identified key retention factors.",
      description:
        "Built a classification model to predict customer churn and identify customers most likely to leave.",
      badge: "ML Project",

      // TODO: এখানে এই project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/customer-churn-analysis-and-prediction-project",
    },
    {
      title: "Vendor Performance Analysis",
      tools: ["Python", "SQL", "Power BI"],
      result: "Created KPI dashboards for data-driven vendor evaluation.",
      description:
        "Analyzed vendor data and built an interactive dashboard to track performance, delivery quality, and key business metrics.",
      badge: "Dashboard",

      // TODO: এখানে এই project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Vendor-Performance-Analysis",
    },
    {
      title: "Time Series Forecasting",
      tools: ["Python", "ARIMA", "Analytics"],
      result: "Achieved 94.18% forecasting accuracy for future demand prediction.",
      description:
        "Developed a forecasting pipeline to estimate demand trends and support planning decisions using time-series modeling.",
      badge: "Forecasting",

      // TODO: এখানে এই project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Time-Series-Forecasting-project",
    },
    {
      title: "Sales Dashboard Analysis",
      tools: ["Power BI", "Excel", "SQL"],
      result: "Built an interactive sales KPI dashboard.",
      description:
        "Created a business dashboard to monitor revenue, product trends, and regional performance.",
      badge: "Business Dashboard",

      // TODO: এখানে এই project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Sales-Dashboard",
    },
    {
      title: "Sales Dashboard Analysis 2",
      tools: ["Power BI", "Excel", "SQL"],
      result: "Built an interactive sales KPI dashboard.",
      description:
        "Created a business dashboard to monitor revenue, product trends, and regional performance.",
      badge: "Business Dashboard",

      // TODO: এখানে এই project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Sales-Dashboard-1",
    },
    {
      
      title: "Titanic Dataset Analysis",
      tools: ["Python", "Pandas", "EDA", "Matplotlib"],
      result: "Identified key survival patterns based on gender, age, class, and passenger details.",
      description:
        "Analyzed the Titanic dataset to explore survival trends, clean missing values, and visualize important factors affecting passenger survival.",
      badge: "EDA Project",
      // TODO: এখানে এই project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Data-Analysis-Of-Titanic-Dataset",
    },
    {
      title: "Time Series Forecasting Analysis",
      tools: ["Python", "Pandas", "Matplotlib", "ARIMA"],
      result: "Built a forecasting model to predict future trends and achieved high accuracy in demand estimation.",
      description:
        "Performed time series analysis on historical data, including data preprocessing, trend visualization, and ARIMA-based forecasting to predict future values and support data-driven decision making.",
      badge: "Forecasting",

      // TODO: এখানে এই Time Series project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Syntecxhub_Time_series_-_category_charts",
    },
    {
      title: "Data Cleaning Utility Analysis",
      tools: ["Python", "Pandas", "Data Cleaning"],
      result: "Improved dataset quality by handling missing values, duplicates, and inconsistencies.",
      description:
        "Performed data preprocessing including handling missing values, removing duplicates, fixing data types, and standardizing datasets to make them ready for analysis and modeling.",
      badge: "Data Prep",

      // TODO: এখানে এই Data Cleaning project-এর GitHub repository link বসাও
      github: "https://github.com/NurAlam114/Syntecxhub_Data_cleaning_utility",
    },
  ];

  const projectsByCategory: Record<CategoryId, Project[]> = {
    data: dataProjects,
    automation: automationProjects,
  };
  const currentCategory = categories.find((c) => c.id === activeCategory)!;
  const currentProjects = projectsByCategory[activeCategory];
  const visibleProjects = showAllProjects
    ? currentProjects
    : currentProjects.slice(0, 4);
  const totalProjects = Object.values(projectsByCategory).flat().length;

  const contactLinks = [
    {
      label: "GitHub",
      value: "github.com/NurAlam114",
      link: "https://github.com/NurAlam114", // TODO: নিজের GitHub profile link
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/md-nur-alam02",
      link: "https://www.linkedin.com/in/md-nur-alam02", // TODO: নিজের LinkedIn link
    },
    {
      label: "Email",
      value: "nuralam39580@gmail.com",
      link: "mailto:nuralam39580@gmail.com", // TODO: নিজের email
    },
    {
      label: "Phone",
      value: "01756448948",
      link: "tel:01756448948", // TODO: নিজের phone number
    },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-400/30">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.14),_transparent_24%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.16),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.12),_transparent_24%),linear-gradient(180deg,#020617_0%,#030712_45%,#020617_100%)]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute left-1/2 top-0 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-3 px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-white/5 text-sm font-semibold tracking-[0.25em] text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
              NA
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Md. Nur Alam</p>
              <p className="text-xs text-slate-400">Data • AI • Automation</p>
            </div>
          </div>

          <div className="flex w-full justify-between text-xs text-slate-300 md:w-auto md:gap-8 md:text-sm">
            <a href="#home" className="transition hover:text-cyan-300">Home</a>
            <a href="#about" className="transition hover:text-cyan-300">About</a>
            <a href="#skills" className="transition hover:text-cyan-300">Skills</a>
            <a href="#projects" className="transition hover:text-cyan-300">Projects</a>
            <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8 lg:px-8">
        <section
          id="home"
          className="grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200">
              Open to Data, AI Automation & QA roles
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              Turning Data into{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Intelligent Automation
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              I’m <span className="font-semibold text-white">Md. Nur Alam</span>,
              a CSE graduate working across data science, AI automation,
              agentic AI, and software testing, building smart and reliable
              solutions to real problems.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-300">
              {[
                "Data Science",
                "AI Automation",
                "Agentic AI",
                "Software Testing",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {/* TODO: public folder-এর ভিতরে resume.pdf রাখতে হবে */}
              <a
                href="/MD_NUR_ALAM.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_35px_rgba(34,211,238,0.28)] transition hover:scale-[1.02]"
              >
                View Resume
              </a>

              {/* TODO: public folder-এর ভিতরে resume.pdf রাখতে হবে */}
              <a
                href="/MD_NUR_ALAM.pdf"
                download
                className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:scale-[1.02] hover:bg-cyan-400/20"
              >
                Download Resume
              </a>

              <a
                href="#projects"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:bg-white/10"
              >
                View Projects
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_30%)]" />

              {/* TODO: public folder-এ নিজের image রাখো। নাম আলাদা হলে src="/nabil.png" বদলাও */}
              <img
                src="/nabil.png"
                alt="Md. Nur Alam"
                className="relative mx-auto h-[460px] w-full rounded-[1.6rem] object-cover object-top"
              />

              <div className="relative mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                  <p className="text-lg font-bold text-white">{totalProjects}+</p>
                  <p className="text-slate-400">Projects</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                  <p className="text-lg font-bold text-white">Real world</p>
                  <p className="text-slate-400">Solutions</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
                  <p className="text-lg font-bold text-white">Data Driven</p>
                  <p className="text-slate-400">Insights</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-xl backdrop-blur-xl lg:p-10"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              About Me
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Data-driven mindset, business-focused execution.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                I studied Computer Science & Engineering at Varendra University
                and enjoy transforming raw data into useful stories, dashboards,
                and predictive models. Beyond analytics, I build AI automation
                workflows and agentic AI systems, and I test software to make
                sure it works reliably.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-400">
                I’m especially interested in data analysis, forecasting,
                AI-powered automation, intelligent agents, and quality
                assurance that solve real-world problems with clarity.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                ["Education", "B.Sc in CSE • Varendra University"],
                ["Languages", "Bangla (Native), English (Proficient)"],
                ["Certification", "Data Science & Machine Learning – Ostad"],
                ["Focus", "Data Science, AI Automation, Agentic AI, QA"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-100">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Core Skills
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Tools I use to analyze, automate, and build with AI
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className={`group rounded-[1.6rem] border border-white/10 bg-gradient-to-br ${skill.glow} bg-slate-950/60 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.14)]`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl">
                    {skill.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {skill.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="pb-20">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Featured Work
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Projects across data analytics, data science, and AI automation
            </h2>
          </div>

          <div className="mb-3 flex flex-wrap gap-3">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowAllProjects(false);
                  }}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition hover:scale-[1.02] ${
                    isActive
                      ? "border-cyan-300/60 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(34,211,238,0.28)]"
                      : "border-white/15 bg-white/5 text-slate-300 hover:border-cyan-300/40 hover:bg-white/10"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      isActive ? "bg-white/20" : "bg-white/10"
                    }`}
                  >
                    {projectsByCategory[cat.id].length}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mb-8 text-sm text-slate-400">{currentCategory.blurb}</p>

          <div className="grid gap-4 lg:grid-cols-2">
            {visibleProjects.map((project) => {
              const hasVideo = Boolean(project.video || project.youtube || project.drive);
              return (
              <div
                key={`${activeCategory}-${project.title}`}
                className="group relative overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/[0.04] p-4 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]"
              >
                <div className="absolute right-4 top-4 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-medium text-cyan-200">
                  {project.badge}
                </div>

                {activeCategory !== "data" && (
                  <button
                    type="button"
                    disabled={!hasVideo}
                    onClick={() => setActiveVideo(project)}
                    aria-label={hasVideo ? `Play demo: ${project.title}` : "Demo video coming soon"}
                    className="group/play mb-3 flex h-24 w-full flex-col items-center justify-center gap-1 rounded-[1rem] border border-white/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(3,7,18,0.92))] enabled:cursor-pointer sm:h-28"
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg transition ${
                        hasVideo
                          ? "border-cyan-300/60 bg-cyan-400/20 text-cyan-100 group-hover/play:scale-110 group-hover/play:bg-cyan-400/30"
                          : "border-white/15 bg-white/5 text-slate-500"
                      }`}
                    >
                      ▶
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {hasVideo ? "Click to watch demo" : "Demo video coming soon"}
                    </span>
                  </button>
                )}

                {activeCategory === "data" && (
                <div className="mb-3 h-24 rounded-[1rem] border border-white/20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(3,7,18,0.92))] p-2.5 sm:h-28">
                  <div className="grid h-full grid-cols-6 gap-1.5">
                    <div className="col-span-4 rounded-lg bg-white/5 p-2">
                      <div className="mb-2 h-2 w-14 rounded-full bg-cyan-300/30" />
                      <div className="grid h-12 grid-cols-5 items-end gap-1.5 sm:h-14">
                        {[35, 55, 42, 76, 60].map((h, i) => (
                          <div
                            key={i}
                            className="rounded-t bg-gradient-to-t from-cyan-500 to-blue-400"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="col-span-2 grid gap-1.5">
                      <div className="rounded-lg bg-white/5" />
                      <div className="rounded-lg bg-white/5" />
                    </div>

                    <div className="col-span-6 rounded-lg bg-white/5 p-2">
                      <div className="mb-1.5 h-2 w-16 rounded-full bg-violet-300/30" />
                      <div className="h-5 rounded-lg bg-gradient-to-r from-cyan-400/20 via-blue-400/10 to-violet-400/20 sm:h-6" />
                    </div>
                  </div>
                </div>
                )}

                <h3 className="pr-24 text-lg font-bold text-white sm:text-xl">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-slate-300">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/20 bg-slate-950/60 px-2.5 py-1 text-[11px] text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {project.result && (
                  <div className="mt-3 rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      Key Result
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-100">
                      {project.result}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-3.5 py-2 text-sm font-semibold text-cyan-100 transition hover:scale-[1.02] hover:bg-cyan-400/20"
                    >
                      GitHub Link
                    </a>
                  )}
                  {hasVideo && (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(project)}
                      className="inline-flex rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
                    >
                      ▶ Watch Demo
                    </button>
                  )}
                </div>

                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_50%)] opacity-0 transition group-hover:opacity-100" />
              </div>
              );
            })}
          </div>

          {currentProjects.length > 4 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:scale-[1.02] hover:bg-cyan-400/20"
              >
                {showAllProjects ? "Show Less Projects" : "Show More Projects"}
              </button>
            </div>
          )}
        </section>

        <section
          id="contact"
          className="grid grid-cols-1 gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl backdrop-blur-xl sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Let’s build something useful together.
            </h2>
            <p className="mt-4 max-w-md text-base leading-8 text-slate-300">
              I’m available for short-term full-time opportunities and
              entry-level roles related to data analysis, data science, AI
              automation, agentic AI, and software testing.
            </p>

            <div className="mt-8 space-y-3">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target={
                    item.label === "Phone" || item.label === "Email"
                      ? "_self"
                      : "_blank"
                  }
                  rel={
                    item.label === "Phone" || item.label === "Email"
                      ? ""
                      : "noopener noreferrer"
                  }
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                >
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <span className="min-w-0 break-words text-right text-sm font-medium text-slate-100">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>


          <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-4 sm:p-6">
            {/* Email form with EmailJS integration */}
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Your Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Email Address"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                required
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:col-span-2"
                placeholder="Subject"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                className="min-h-[150px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:col-span-2"
                placeholder="Write your message here..."
              />

              {submitStatus.type && (
                <div
                  className={`rounded-2xl p-3 text-sm font-medium sm:col-span-2 ${
                    submitStatus.type === "success"
                      ? "border border-green-400/30 bg-green-400/10 text-green-200"
                      : "border border-red-400/30 bg-red-400/10 text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-50 sm:col-span-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </main>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-white">
                {activeVideo.title}
              </p>
              <button
                onClick={() => setActiveVideo(null)}
                className="rounded-lg border border-white/15 px-3 py-1 text-xs text-slate-300 transition hover:bg-white/10"
              >
                Close ✕
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              {activeVideo.youtube && getYoutubeEmbedUrl(activeVideo.youtube) ? (
                <iframe
                  src={getYoutubeEmbedUrl(activeVideo.youtube)!}
                  title={activeVideo.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : activeVideo.drive && getDriveEmbedUrl(activeVideo.drive) ? (
                <iframe
                  src={getDriveEmbedUrl(activeVideo.drive)!}
                  title={activeVideo.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <video
                  src={activeVideo.video}
                  controls
                  autoPlay
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}