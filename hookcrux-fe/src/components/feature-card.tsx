import { motion } from 'framer-motion';
import { FC } from 'react';

type FeatureCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-center backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300"
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-center mb-4 text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-blue-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};
