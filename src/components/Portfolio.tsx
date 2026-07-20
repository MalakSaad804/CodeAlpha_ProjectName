import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Download, Mail, ExternalLink, Heart, Sparkles, ArrowRight, GraduationCap, Briefcase, Code2, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const skills = [
  { name: 'React.js', level: 92, color: 'from-cyan-400 to-blue-500' },
  { name: 'Next.js', level: 88, color: 'from-gray-400 to-gray-200' },
  { name: 'TypeScript', level: 85, color: 'from-blue-400 to-indigo-500' },
  { name: 'JavaScript (ES6+)', level: 94, color: 'from-yellow-400 to-orange-500' },
  { name: 'HTML5 & CSS3', level: 96, color: 'from-orange-400 to-red-500' },
  { name: 'Tailwind CSS', level: 93, color: 'from-teal-400 to-cyan-500' },
];

const projects = [
  {
    title: 'E-Commerce Website',
    description: 'A fully responsive e-commerce storefront with product filtering, cart functionality, and checkout flow.',
    tech: ['React', 'Tailwind', 'Next.js', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    github: 'https://github.com/MalakSaad804',
    demo: '#',
    featured: true
  },
  {
    title: 'Dashboard UI Kit',
    description: 'Complete admin dashboard with data tables, charts, dark/light mode, and reusable components.',
    tech: ['React', 'TypeScript', 'Chart.js', 'MUI'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    github: 'https://github.com/MalakSaad804',
    demo: '#',
    featured: true
  },
  {
    title: 'Landing Page Template',
    description: 'Modern, high-converting landing page template with smooth animations and responsive design.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    github: 'https://github.com/MalakSaad804',
    demo: '#',
    featured: false
  },
  {
    title: 'Weather Application',
    description: 'Real-time weather app with location search, 7-day forecast, and beautiful visualizations.',
    tech: ['React', 'Weather API', 'CSS', 'Framer'],
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
    github: 'https://github.com/MalakSaad804',
    demo: '#',
    featured: false
  }
];

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

const stats = [
  { value: '20+', label: 'Projects Built' },
  { value: 'BSc', label: 'UET Mardan' },
  { value: '3+', label: 'Years Coding' },
  { value: '∞', label: 'Passion' }
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const profileImage = '/profile-malak.jpg';

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Custom Cursor Glow */}
      <div 
        className="fixed w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-0 transition-transform duration-300"
        style={{ 
          left: mousePosition.x - 192, 
          top: mousePosition.y - 192,
        }}
      />

      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg shadow-cyan-500/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.a 
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
              className="text-2xl font-bold relative group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Malak
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300" />
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    activeSection === item.href.slice(1)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-cyan-500/10 rounded-full border border-cyan-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              ))}
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/20"
            >
              Hire Me
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-gray-800"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`block px-6 py-4 text-sm font-medium border-b border-gray-800/50 ${
                    activeSection === item.href.slice(1)
                      ? 'text-cyan-400 bg-cyan-400/5'
                      : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950"
          />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="relative z-10 px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">Fresh Graduate & Frontend Developer</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Hi, I'm </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Malak Saad
                </span>
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                A passionate <span className="text-cyan-400 font-semibold">Frontend Developer</span> who 
                recently graduated from <span className="text-white font-semibold">UET Mardan</span>. 
                I craft clean, responsive, and user-friendly web experiences with modern technologies.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('#projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-600 text-white rounded-full font-semibold hover:bg-white/5 backdrop-blur-sm transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </motion.a>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-500 text-xs md:text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right - Profile Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                {/* Decorative Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-8 border border-cyan-500/20 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-16 border border-blue-500/10 rounded-full border-dashed"
                />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-3xl opacity-20" />
                
                {/* Profile Image */}
                <div className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                  <img 
                    src={profileImage} 
                    alt="Malak Saad"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                </div>

                {/* Floating Badge - Developer */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -right-4 top-1/4 bg-gray-900 border border-gray-700 px-4 py-3 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="text-sm font-semibold text-white">Frontend Dev</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge - Education */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -left-4 bottom-1/4 bg-gray-900 border border-gray-700 px-4 py-3 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-500">Graduated</p>
                      <p className="text-sm font-semibold text-white">UET Mardan</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-gray-600" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="order-2 md:order-1">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block"
              >
                About Me
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Building the web,{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  one pixel at a time
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Hello! I'm <span className="text-white font-semibold">Malak Saad</span>, a fresh 
                Computer Science graduate from <span className="text-cyan-400">UET Mardan</span> with 
                a strong passion for frontend development. I love turning design ideas into 
                interactive, responsive websites that users enjoy.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                My journey into web development started with curiosity about how websites work, and 
                it has grown into a dedicated craft. I specialize in React, TypeScript, and modern 
                CSS, and I'm constantly learning new technologies to stay ahead in this fast-paced field.
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <GraduationCap className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Education</p>
                    <p className="text-white font-medium text-sm">BSc from UET Mardan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <Briefcase className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-white font-medium text-sm">Open to Work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <Phone className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-white font-medium text-sm">0317-9936732</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <Mail className="w-6 h-6 text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-white font-medium text-xs">aiengineermsaad@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="https://github.com/MalakSaad804"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="p-4 bg-gray-800/50 rounded-2xl text-gray-400 hover:text-cyan-400 hover:bg-gray-800 transition-all"
                  title="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/malak-saad-10229630a"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="p-4 bg-gray-800/50 rounded-2xl text-gray-400 hover:text-cyan-400 hover:bg-gray-800 transition-all"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </motion.a>
                <motion.a 
                  href="mailto:aiengineermsaad@gmail.com"
                  whileHover={{ scale: 1.1 }}
                  className="p-4 bg-gray-800/50 rounded-2xl text-gray-400 hover:text-cyan-400 hover:bg-gray-800 transition-all"
                  title="Email"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  href="tel:03179936732"
                  whileHover={{ scale: 1.1 }}
                  className="p-4 bg-gray-800/50 rounded-2xl text-gray-400 hover:text-green-400 hover:bg-gray-800 transition-all"
                  title="Call"
                >
                  <Phone className="w-6 h-6" />
                </motion.a>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden border-2 border-cyan-500/20">
                  <img 
                    src={profileImage}
                    alt="Malak Saad" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-2xl shadow-2xl shadow-cyan-500/30"
                >
                  <p className="text-white font-bold text-3xl">BSc</p>
                  <p className="text-white/80 text-sm">UET Mardan</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -left-4 bg-gray-800 p-4 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-300">Open to opportunities</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              My Skill Set
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical <span className="text-cyan-400">Skills</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Technologies I work with to build beautiful, functional web applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${skill.color} font-bold`}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 md:py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              My Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Recent <span className="text-cyan-400">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A collection of frontend projects I've built to showcase my skills
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gray-900/50 rounded-3xl overflow-hidden border border-gray-800 hover:border-cyan-500/30 transition-all"
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-xs font-semibold text-white">
                    Featured
                  </div>
                )}
                
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="px-4 py-1.5 bg-gray-800 text-cyan-400 text-sm rounded-full border border-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.a 
                      href={project.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      Code
                    </motion.a>
                    <motion.a 
                      href={project.demo} 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's <span className="text-cyan-400">Work Together</span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
              I'm a fresh graduate excited to start my professional journey. If you have an 
              opportunity, project idea, or just want to say hi — feel free to reach out!
            </p>
            
            {/* Contact Info Display */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300 text-sm">aiengineermsaad@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">0317-9936732</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="mailto:aiengineermsaad@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </motion.a>
              <motion.a
                href="tel:03179936732"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow"
              >
                <Phone className="w-5 h-5" />
                Call Me
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-gray-600 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-white/5 backdrop-blur-sm transition-colors"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-12">
              {[
                { name: 'GitHub', href: 'https://github.com/MalakSaad804' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/malak-saad-10229630a' },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="p-4 bg-gray-800/50 rounded-2xl text-gray-400 hover:text-cyan-400 hover:bg-gray-800 transition-all border border-gray-800 hover:border-cyan-500/30"
                  title={social.name}
                >
                  {social.name === 'GitHub' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>}
                  {social.name === 'LinkedIn' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Malak Saad. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            Frontend Developer <Heart className="w-4 h-4 text-red-500 fill-current mx-1" /> UET Mardan Graduate
          </p>
        </div>
      </footer>
    </div>
  );
}