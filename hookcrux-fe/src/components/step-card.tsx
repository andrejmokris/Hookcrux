import { motion } from "framer-motion";
import { FC } from "react";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export const StepCard: FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-800 relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-6xl font-bold text-gray-800 absolute -top-4 -left-4 opacity-20">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-blue-400 relative z-10">
        {title}
      </h3>
      <p className="text-gray-300 relative z-10">{description}</p>
    </motion.div>
  );
};
