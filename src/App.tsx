import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, Calculator, User, Music, ArrowLeft, Sparkles } from 'lucide-react';
import ImageGallery from './components/ImageGallery';
import CalculatorComponent from './components/Calculator';
import Portfolio from './components/Portfolio';
import MusicPlayer from './components/MusicPlayer';

type Task = 'home' | 'gallery' | 'calculator' | 'portfolio' | 'music';

interface TaskCard {
  id: Task;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const tasks: TaskCard[] = [
  {
    id: 'gallery',
    title: 'Image Gallery',
    description: 'Browse images with filters, lightbox view, and smooth transitions',
    icon: Images,
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'Full-featured calculator with history and keyboard support',
    icon: Calculator,
    color: 'text-cyan-400',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    description: 'Personal portfolio with smooth scroll and animations',
    icon: User,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 'music',
    title: 'Music Player',
    description: 'Music player with playlist, progress bar, and controls',
    icon: Music,
    color: 'text-rose-400',
    gradient: 'from-rose-500/20 to-orange-500/20',
  },
];

export default function App() {
  const [currentTask, setCurrentTask] = useState<Task>('home');

  const renderTask = () => {
    switch (currentTask) {
      case 'gallery':
        return <ImageGallery />;
      case 'calculator':
        return <CalculatorComponent />;
      case 'portfolio':
        return <Portfolio />;
      case 'music':
        return <MusicPlayer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <AnimatePresence mode="wait">
        {currentTask === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">CodeAlpha Internship Tasks</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Frontend <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A collection of interactive web applications built with React, TypeScript, and Tailwind CSS
              </p>
            </motion.div>

            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full relative z-10">
              {tasks.map((task, index) => (
                <motion.button
                  key={task.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentTask(task.id)}
                  className={`group relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 text-left transition-all hover:border-gray-700 hover:shadow-2xl`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${task.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl bg-gray-800/50 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <task.icon className={`w-8 h-8 ${task.color}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                      {task.title}
                    </h2>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {task.description}
                    </p>
                    
                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                      <span>Open Project</span>
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        →
                      </motion.span>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-gray-500 text-sm relative z-10"
            >
              Built with React + TypeScript + Tailwind CSS + Framer Motion
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="task"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setCurrentTask('home')}
              className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-md text-white rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Projects</span>
            </motion.button>

            {renderTask()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}