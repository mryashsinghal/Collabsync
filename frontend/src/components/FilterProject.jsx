import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";

const techStacks = ["React", "Node.js", "Python", "Java", "C++", "Django", "Flutter"];
const projectTypes = ["Open Source", "Startup", "Research", "Hackathon", "Freelance"];
const collaborationModes = ["Remote", "In-Person", "Hybrid"];
const statusOptions = ["Open", "Closed"];

export default function FilterProject({ setFilter }) {
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [collaborationMode, setCollaborationMode] = useState("");
  const [status, setStatus] = useState("Open");

  const handleTechStackChange = (tech) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const resetFilters = () => {
    setSelectedTechStacks([]);
    setProjectType("");
    setCollaborationMode("");
    setStatus("Open");
    setFilter({ techStack: [], category: "",collaborationMode : "", status: "Open" });
  };

  const applyFilters = () => {
    setFilter({techStack : selectedTechStacks,category: projectType, collaborationMode,status });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-[#8db3d89d] shadow-[#009dff66]  shadow-md rounded-xl w-full flex flex-wrap items-center gap-4 justify-between"
    >
      {/* Tech Stack Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-white">Tech Stack:</h3>
        <div className="flex flex-wrap gap-2">
          {techStacks.map((tech) => (
            <motion.button
              key={tech}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleTechStackChange(tech)}
              className={`px-3 py-1 rounded-full border ${selectedTechStacks.includes(tech) ? "bg-[#8daabe5c] text-white" : "bg-gray-100"}`}
            >
              {tech}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Project Type Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-white">Project Type:</h3>
        <Listbox value={projectType} onChange={setProjectType}>
          <div className="relative text-bold">
            <Listbox.Button className="border rounded-md py-2 px-3">
              {projectType || "Select type"}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {projectTypes.map((type) => (
                <Listbox.Option key={type} value={type} className="p-2 cursor-pointer hover:bg-gray-100">
                  {type}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      
      {/* Collaboration Mode Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-white">Collaboration Mode:</h3>
        <Listbox value={collaborationMode} onChange={setCollaborationMode}>
          <div className="relative">
            <Listbox.Button className="border rounded-md py-2 px-3">
              {collaborationMode || "Select mode"}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {collaborationModes.map((mode) => (
                <Listbox.Option key={mode} value={mode} className="p-2 cursor-pointer hover:bg-gray-100">
                  {mode}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      
      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-white">Status :</h3>
        <Listbox value={status} onChange={setStatus}>
          <div className="relative">
            <Listbox.Button className="border rounded-md py-2 px-3">
              {status}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {statusOptions.map((option) => (
                <Listbox.Option key={option} value={option} className="p-2 cursor-pointer hover:bg-gray-100">
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetFilters}
          className="px-4 py-2 border rounded-md text-white"
        >
          Reset
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={applyFilters}
          className="px-4 py-2 bg-[#009dffd1] text-white rounded-md"
        >
          Apply
        </motion.button>
      </div>
    </motion.div>
  );
}
