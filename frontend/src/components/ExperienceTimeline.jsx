import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import moment from "moment";

const ExperienceTimeline = ({ profile }) => {
  const [expanded, setExpanded] = useState(null);
  const experiences = profile.experience;
  const timelineRef = useRef(null); // Reference for the timeline container
  const [timelineHeight, setTimelineHeight] = useState(0); // State to track the height of the timeline

  useEffect(() => {
    // Update the height of the timeline based on the content
    if (timelineRef.current) {
      setTimelineHeight(timelineRef.current.scrollHeight);
    }
  }, [experiences]);

  return (
    <div
      className="relative w-full max-w-3xl mx-auto mt-10 overflow-hidden"
      style={{ maxHeight: "500px", overflowY: "auto", scrollbarWidth: "none" }}
      ref={timelineRef} // Attach the ref to the container
    >
      {/* Hide scrollbar for all browsers */}
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          .scroll-container {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>

      {/* Middle Ruler */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300"
        style={{ height: `${timelineHeight}px` }} // Dynamically set the height
      ></div>

      <div className="scroll-container">
        {experiences &&
          experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex items-center justify-between w-full my-6 ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="w-6 h-6 bg-blue-500 rounded-full shadow-lg"></div>

              {/* Experience Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#c8e7fe] p-4 rounded-lg shadow-lg w-[45%] border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-[#2b7cfe]">{exp.role}</h3>
                <p className="text-gray-500">
                  {exp.companyName} | {moment(exp.fromDate).format("DD MMM YYYY")} -{" "}
                  {moment(exp.toDate).format("DD MMM YYYY")}
                </p>
                {expanded === index ? (
                  <p className="mt-2 text-sm text-gray-600">{exp.projectSummary}</p>
                ) : null}
                <button
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  className="text-blue-500 mt-2 text-sm"
                >
                  {expanded === index ? "Show Less" : "Show More"}
                </button>
              </motion.div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;