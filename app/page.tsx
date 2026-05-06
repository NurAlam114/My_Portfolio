"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function NurAlamPortfolio() {
  const [showAllProjects, setShowAllProjects] = useState(false);
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
  ];

  const projects = [

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

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-white/5 text-sm font-semibold tracking-[0.25em] text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
              NA
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Md. Nur Alam</p>
              <p className="text-xs text-slate-400">Data Science Portfolio</p>
            </div>
          </div>

          <div className="hidden gap-8 text-sm text-slate-300 md:flex">
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
              Open to Data Analyst & Data Science roles
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              Turning Data into{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Insightful Decisions
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              I’m <span className="font-semibold text-white">Md. Nur Alam</span>,
              a CSE graduate focused on Python, SQL, machine learning,
              dashboards, and practical problem solving through data.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-300">
              {["Python", "SQL", "Power BI", "Machine Learning"].map((tag) => (
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
                  <p className="text-lg font-bold text-white">9+</p>
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
                and predictive models. My goal is to build solutions that help
                teams make smarter decisions.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-400">
                I’m especially interested in data analysis, forecasting,
                business dashboards, and machine learning projects that solve
                real-world problems with clarity.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                ["Education", "B.Sc in CSE • Varendra University"],
                ["Languages", "Bangla (Native), English (Proficient)"],
                ["Certification", "Data Science & Machine Learning – Ostad"],
                ["Focus", "Data Management, Analytics, ML"],
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
              Tools I use to explore, model, and present data
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
              Projects built around analysis, prediction, and dashboards
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {visibleProjects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-[1.35rem] border border-white/20 bg-white/[0.04] p-4 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_0_28px_rgba(34,211,238,0.18)]"
              >
                <div className="absolute right-4 top-4 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-medium text-cyan-200">
                  {project.badge}
                </div>

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

                <div className="mt-3 rounded-xl border border-cyan-400/25 bg-cyan-400/10 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    Key Result
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-100">
                    {project.result}
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-3.5 py-2 text-sm font-semibold text-cyan-100 transition hover:scale-[1.02] hover:bg-cyan-400/20"
                  >
                    GitHub Link
                  </a>
                </div>

                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_transparent_50%)] opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:scale-[1.02] hover:bg-cyan-400/20"
            >
              {showAllProjects ? "Show Less Projects" : "Show More Projects"}
            </button>
          </div>
        </section>

        <section
          id="contact"
          className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-xl backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Let’s build something useful with data.
            </h2>
            <p className="mt-4 max-w-md text-base leading-8 text-slate-300">
              I’m available for short-term full-time opportunities and
              entry-level roles related to data analysis, data management, and
              data science.
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
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                >
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <span className="text-sm font-medium text-slate-100">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>


          <div className="rounded-[1.8rem] border border-white/10 bg-slate-950/60 p-6">
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
                className="col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Subject"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                required
                className="col-span-2 min-h-[150px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Write your message here..."
              />

              {submitStatus.type && (
                <div
                  className={`col-span-2 rounded-2xl p-3 text-sm font-medium ${
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
                className="col-span-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.22)] transition hover:scale-[1.01] disabled:scale-100 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}