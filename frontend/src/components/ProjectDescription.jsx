import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaCode, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import moment from "moment";

const sampleProject = {
  projectName: "CollabSync - Real-time Collaboration Platform",
  description: "A platform enabling students to collaborate on projects across colleges with real-time updates and team management.",
  techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  startDate: "01/01/2025",
  endDate: "Ongoing",
  ownerName: "John Doe",
  githubUrl: "https://github.com/example/collabsync",
  websiteUrl: "https://collabsync.example.com",
};

export default function ProjectDescription({ project = sampleProject }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#6990d3] to-[#0f2058] p-6 rounded-xl shadow-lg text-white"
    >
      {/* Project Title & Summary */}
      <h2 className="text-3xl font-bold mb-7">{project.projectName}</h2>
      <p className="text-lg opacity-90 mb-7">{project.description}</p>

      {/* Tech Stack */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <FaCode className="text-xl" />
        {project.techStack.map((tech, index) => (
          <span key={index} className="bg-white text-blue-700 px-3 py-1 rounded-lg shadow-md text-sm font-medium">
            {tech}
          </span>
        ))}
      </div>

      {/* Project Timeline */}
      <div className="flex items-center gap-2 mb-4">
        <FaCalendarAlt className="text-xl" />
        <p className="text-md">
          {moment(project.startDate).format("DD MMM YYYY")} - {project.endDate || "Ongoing"}
        </p>
      </div>

      {/* Owner Information */}
      <div className="flex items-center gap-2 mb-4">
        <FaUser className="text-xl" />
        <p className="text-md font-medium">Owner: {project.createdBy.username}</p>
      </div>

      {/* Links Section */}
      <div className="flex items-center gap-4 mt-6">
        {/* GitHub Link */}
        {project.repositoryLink && (
          <a
            href={project.repositoryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all"
          >
            <FaGithub className="text-xl" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        )}

        {/* Website Link */}
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-all"
          >
            <FaExternalLinkAlt className="text-xl" />
            <span className="text-sm font-medium">Website</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}