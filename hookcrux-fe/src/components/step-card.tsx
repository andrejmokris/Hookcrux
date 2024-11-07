import { motion } from 'framer-motion';
import { FC } from 'react';

type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export const StepCard: FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="text-8xl font-bold text-gray-800 absolute -top-6 -left-6 opacity-30">{number}</div>
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2 text-blue-400">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};
