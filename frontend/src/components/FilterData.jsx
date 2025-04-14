import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";

const techStacks = ["React", "Node.js", "Python", "Java", "C++", "Django", "Flutter"];
const experienceLevels = ["Beginner", "Intermediate", "Advanced"];
const availabilityOptions = ["Available", "Busy"];
const sortingOptions = ["Most Active", "Newest", "Oldest"];

export default function FilterData({ setFilterUser }) {
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [sorting, setSorting] = useState("Most Active");

  const handleTechStackChange = (tech) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const resetFilters = () => {
    setSelectedTechStacks([]);
    setExperienceLevel("");
    setAvailability("");
    setSorting("Most Active");
    setFilterUser({ techStacks: [], experienceLevel: "", availability: "", sorting: "Most Active" });
  };

  const applyFilters = () => {
    setFilterUser({ techStack : selectedTechStacks, experienceLevel, availability, sorting });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-[#8db3d89d] shadow-[#009dff66] shadow-md rounded-xl w-full flex flex-wrap items-center gap-4 justify-between"
    >
      {/* Tech Stack Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Tech Stack:</h3>
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
      
      {/* Experience Level Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Experience Level:</h3>
        <Listbox value={experienceLevel} onChange={setExperienceLevel}>
          <div className="relative">
            <Listbox.Button className="border rounded-md py-2 px-3">
              {experienceLevel || "Select level"}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {experienceLevels.map((level) => (
                <Listbox.Option key={level} value={level} className="p-2 cursor-pointer hover:bg-gray-100">
                  {level}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      
      {/* Availability Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Availability:</h3>
        <Listbox value={availability} onChange={setAvailability}>
          <div className="relative">
            <Listbox.Button className="border rounded-md py-2 px-3">
              {availability || "Select availability"}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {availabilityOptions.map((option) => (
                <Listbox.Option key={option} value={option} className="p-2 cursor-pointer hover:bg-gray-100">
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      
      {/* Sorting Filter */}
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium">Sort By:</h3>
        <Listbox value={sorting} onChange={setSorting}>
          <div className="relative">
            <Listbox.Button className="border rounded-md py-2 px-3">
              {sorting}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {sortingOptions.map((option) => (
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
          className="px-4 py-2 border rounded-md"
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
