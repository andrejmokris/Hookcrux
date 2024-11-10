import { FeatureCard } from '@/components/feature-card';
import { StepCard } from '@/components/step-card';
import { apiClient } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronRight, LoaderCircle, RefreshCw, Terminal, Zap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const startSessions = useMutation({
    mutationKey: ['start-sessions'],
    mutationFn: async () => {
      const { data } = await apiClient.post<HookSession>('/webhook-sessions/new');
      navigate(`/session/${data.id}`);
    },
  });

  return (
    <main className="relative">
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Simplify Webhook Development
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Tired of setting up Ngrok tunnels or mocking webhooks? Hookcrux streamlines development with webhooks. Get
          that Stripe webhook.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => startSessions.mutateAsync()}
            className="py-3 w-40 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
          >
            {startSessions.isPending ? <LoaderCircle className="animate-spin" /> : 'Get Started'}
          </button>
          <a
            href="#get-started"
            className="px-8 py-3 bg-gray-800 text-white rounded-full font-semibold text-lg hover:bg-gray-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
          >
            Learn More <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </section>

      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Terminal className="w-12 h-12 text-blue-400" />}
            title="CLI Client"
            description="Easy-to-use command-line interface for seamless integration."
          />
          <FeatureCard
            icon={<RefreshCw className="w-12 h-12 text-blue-400" />}
            title="Request Forwarding"
            description="Efficiently forward requests from server to your local dev environment."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-blue-400" />}
            title="Instant Testing"
            description="Test webhooks in real-time without complex setups or public URLs."
          />
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number="01"
            title="Set Up Hookcrux"
            description="Install the Hookcrux CLI and configure your project with a simple command."
          />
          <StepCard
            number="02"
            title="Start Listening"
            description="Launch the Hookcrux client to start listening for incoming webhook requests."
          />
          <StepCard
            number="03"
            title="Develop & Test"
            description="Receive real-time webhook data in your local environment for instant testing and debugging."
          />
        </div>
      </section>

      <section id="get-started" className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Ready to Simplify Your Webhook Development?
        </h2>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Get started with Hookcrux in minutes and transform your development workflow.
        </p>
        <motion.div
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <a
            href="#"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Install Hookcrux CLI
          </a>
        </motion.div>
        {isHovered && (
          <motion.p
            className="mt-4 text-sm text-gray-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            npx hookcrux-client
          </motion.p>
        )}
      </section>
    </main>
  );
};
