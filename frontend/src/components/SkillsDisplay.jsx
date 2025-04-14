import { motion } from "framer-motion";




const SkillsDisplay = ({profile}) => {

  const skills = profile.skills;
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {skills && skills.map((skill, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          className="bg-gradient-to-r from-blue-500 to-[#85adb4] text-white px-4 py-2 rounded-full shadow-lg font-semibold cursor-pointer"
        >
          {skill}
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsDisplay;
