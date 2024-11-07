import { motion } from "framer-motion";
import { FC } from "react";

type FeatureCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export const FeatureCard: FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      className="bg-gray-900 bg-opacity-50 p-6 rounded-2xl shadow-lg text-center backdrop-blur-sm border border-gray-800"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-blue-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};
