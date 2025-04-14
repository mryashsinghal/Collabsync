import React from "react";
import { FaChartBar, FaSearch, FaComments, FaTasks, FaUsers } from "react-icons/fa";

const HexagonIcon = ({ color1, color2, icon, label }) => {
  return (
    <div className={`relative flex flex-col items-center lg:${label!=="Real-time Collaboration" ? "items-start" : "items-center"} `}>
      <div
        className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-white text-2xl font-bold rounded-md transition-transform transform hover:scale-110 shadow-lg"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          borderRadius: "12px",
        }}
      >
        {icon}
      </div>
      <p className="text-[1.5rem]  text-[#2852a8]  mb-4 md:mb-8 ">{label}</p>
    </div>
  );
};

const HexagonIconsSection = ({ sectionName }) => {
  const sections = {
    "Interactive Dashboard": { color1: "#1E3A8A", color2: "#3B82F6", icon: <FaChartBar /> },
    "Tech-Stack & College Based Search": { color1: "#1D4ED8", color2: "#60A5FA", icon: <FaSearch /> },
    "Real-time Collaboration": { color1: "#035d4e", color2: "#93C5FD", icon: <FaComments /> },
    "Project Management": { color1: "#1E40AF", color2: "#60A5FA", icon: <FaTasks /> },
    "User Connectivity": { color1: "#1E3A8A", color2: "#818CF8", icon: <FaUsers /> },
  };

  const section = sections[sectionName];
  if (!section) return null;

  return <HexagonIcon color1={section.color1} color2={section.color2} icon={section.icon} label={sectionName} />;
};

export default HexagonIconsSection;
