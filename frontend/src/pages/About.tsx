import React, { useState, useEffect, useCallback, memo } from 'react';
import { useInView } from '../utils/useInView';
import { Award, GraduationCap, Star, BookOpen, Briefcase, UserIcon, X, AlertTriangle, Download } from 'lucide-react';
import { ScrollTimeline, TimelineEvent } from '../components/ScrollTimeline';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data and Constants for Better Organization ---
const getTimelineIcon = (event: string) => {
  if (event.includes('B.Tech') || event.includes('Graduated')) return GraduationCap;
  if (event.includes('Sports') || event.includes('Olympiad')) return Star;
  if (event.includes('project') || event.includes('research')) return BookOpen;
  if (event.includes('Interned') || event.includes('Analyst') || event.includes('Software Engineer')) return Briefcase;
  if (event.includes('Oracle Certified')) return Award;
  return UserIcon;
};

// Check and verify these paths against your public folder structure
const CERTIFICATIONS_DATA = [
  { name: 'Oracle Certified Java SE 11', image: '/certifications/oracle_certificate.jpeg' },
  { name: 'Microsoft Azure AI Essentials', image: '/certifications/Azure.jpg' },
  { name: 'Atlassian Agile Project Management', image: '/certifications/Atlassian.jpeg' },
  { name: 'TCS iON Career Edge', image: '/certifications/TCS.jpg' },
  { name: 'Generative AI Specialization', image: '/certifications/Gen.jpg' },
  { name: 'Mastering Data Analysis with Pandas', image: '/certifications/data-analysis.png' },
  { name: 'Udemy Bootcamp', image: '/certifications/udemy.png' },
  { name: 'Streamlit with Python', image: '/certifications/Streamlit.png' },
  { name: 'SQL Subqueries', image: '/certifications/Subqueries.png' },
];

const TECH_STACK_DATA = [
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Apache Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
  { name: 'ActiveMQ', icon: '/tech/ActiveMq.png' },
  { name: 'Apache Spark', icon: '/tech/ApacheSpark.png' },
  { name: 'Node.js', icon: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21~bgwhite.svg' },
  { name: 'FastAPI', icon: '/tech/FastAPI.png' }, 
  {name: 'Postman', icon: '/tech/Postman.png' },
  { name: 'Microsoft Azure', icon: '/tech/Azure.jpg' },
];

// Define a type for timeline items
interface TimelineItem {
  year: number;
  event: string;
}

interface TechIconProps {
  tech: { name: string; icon: string };
  style?: React.CSSProperties;
}

const TechIcon: React.FC<TechIconProps> = memo(({ tech, style }) => (
  <div className="flex flex-col items-center p-2 group" style={style}>
    <img
      src={tech.icon}
      alt={tech.name}
      className="w-16 h-16 object-contain rounded-lg shadow-sm mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg"
      loading="lazy"
    />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center transition-colors duration-300 group-hover:text-cyan-500">
      {tech.name}
    </span>
  </div>
));

interface CertModalProps {
  selectedCert: { name: string; image: string } | null;
  closeCertModal: () => void;
}

const CertModal: React.FC<CertModalProps> = ({ selectedCert, closeCertModal }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (selectedCert) {
      const img = new Image();
      img.onload = () => setImageError(false);
      img.onerror = () => setImageError(true);
      img.src = selectedCert.image;
    }
  }, [selectedCert]);

  const getDownloadFilename = (name: string, imageUrl: string) => {
    const fileExtension = imageUrl.split('.').pop();
    const sanitizedName = name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    return `Divyansh_Dubey_${sanitizedName}.${fileExtension}`;
  };

  return (
    <AnimatePresence>
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-labelledby="cert-modal-title"
          role="dialog"
          aria-modal="true"
          onClick={closeCertModal}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-t-2xl flex justify-between items-center z-10">
              <h2 id="cert-modal-title" className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-0 text-center w-full">{selectedCert.name}</h2>
              <button
                onClick={closeCertModal}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors absolute top-2 right-2"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex items-center justify-center">
              {imageError ? (
                <div className="flex flex-col items-center justify-center w-full min-h-[300px] text-center text-gray-500 dark:text-gray-400">
                  <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
                  <p>Image not found. Please check the file path.</p>
                </div>
              ) : (
                <img
                  src={`${selectedCert.image}?${selectedCert.name.replace(/\s/g, '')}${Date.now()}`}
                  alt={`Certificate for ${selectedCert.name}`}
                  className="w-full object-contain rounded-lg mx-auto"
                  style={{ display: 'block' }}
                  loading="eager"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-b-2xl flex justify-end gap-4">
              <a
                href={selectedCert.image}
                download={getDownloadFilename(selectedCert.name, selectedCert.image)}
                className="inline-flex items-center px-6 py-2 bg-blue-600 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" /> Download
              </a>
              <button
                onClick={closeCertModal}
                className="px-6 py-2 bg-primary-600 dark:bg-cyan-600 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-cyan-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const About: React.FC = () => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [timelineError, setTimelineError] = useState(false);
  const [selectedCert, setSelectedCert] = useState<null | { name: string; image: string }>(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const openCertModal = useCallback((cert: { name: string; image: string }) => {
    setSelectedCert(cert);
  }, []);

  const closeCertModal = useCallback(() => {
    setSelectedCert(null);
  }, []);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await fetch('/data/career_timeline.json');
        if (!res.ok) {
          throw new Error('Timeline data not found.');
        }
        const data: TimelineItem[] = await res.json();
        const sortedData = data.sort((a, b) => a.year - b.year);
        const limitedData = sortedData.slice(-15);
        setTimeline(limitedData);
      } catch (error) {
        console.error('Failed to fetch timeline data:', error);
        setTimelineError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  // Section fade-in hooks
  const [bioRef, bioInView] = useInView();
  const [certRef, certInView] = useInView();
  const [techRef, techInView] = useInView();

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Photo Section */}
        <div className="flex justify-center mb-10">
          <div className="relative group">
            <img
              src={`/about-photo.jpg?${isPhotoOpen ? Date.now() : ''}`}
              alt="Divyansh Dubey"
              className="w-48 h-48 md:w-64 md:h-64 object-cover object-center rounded-2xl shadow-xl border-4 border-white dark:border-gray-800 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl cursor-pointer brightness-105"
              onClick={() => setIsPhotoOpen(true)}
              tabIndex={0}
              style={{ background: 'none' }}
            />
          </div>
        </div>
        {/* Animation styles for modal */}
        <style>{`
          @keyframes scaleFadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-scale-fade-in {
            animation: scaleFadeIn 0.4s cubic-bezier(0.4,0,0.2,1);
          }
        `}</style>
        {/* Photo Modal/Lightbox */}
        {isPhotoOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-fade-in"
            tabIndex={-1}
            onKeyDown={e => { if (e.key === 'Escape') setIsPhotoOpen(false); }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
              onClick={() => setIsPhotoOpen(false)}
              aria-hidden="true"
            ></div>
            <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
              <img
                src={`/about-photo.jpg?${isPhotoOpen ? Date.now() : ''}`}
                alt="Divyansh Dubey Large"
                className="w-full max-w-xl max-h-[80vh] object-cover object-center rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 brightness-105"
                style={{ background: 'none' }}
              />
              <button
                onClick={() => setIsPhotoOpen(false)}
                className="mt-4 px-6 py-2 bg-primary-600 dark:bg-cyan-600 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-cyan-700 transition-colors shadow-lg"
                aria-label="Close photo"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Bio Section with scroll-triggered fade-in */}
        <section
          ref={bioRef}
          className={`mb-16 text-center transition-all duration-700 ease-out ${bioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text neon-glow">About Me</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            Hi, I'm Divyansh Dubey, a passionate <strong>Full Stack Developer</strong>.I am currently a Software Engineer at <strong>LTIMindtree</strong>, where I build robust, scalable web applications using a mix of modern technologies. My work involves creating full-stack solutions and optimizing application performance with a strong focus on data security and integrity.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
          I am always eager to leverage new technologies and innovative algorithms, transforming data into intelligent insights and building the future, one solution at a time.
          </p>
        </section>
        {/* --- Career Timeline Section --- */}
        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Career Timeline</h2>
          {loading ? (
            <div className="flex justify-center items-center h-48 text-gray-500 dark:text-gray-400">
              <svg className="animate-spin h-8 w-8 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-3">Loading timeline...</span>
            </div>
          ) : timelineError ? (
            <div className="text-center text-red-500 dark:text-red-400 text-lg py-8">
              Timeline data could not be loaded. Please check the file path.
            </div>
          ) : (
            <div className="animate-slide-up">
              <ScrollTimeline
                events={timeline.map(item => {
                  const parts = item.event.split(':');
                  const title = parts[0]?.trim() || item.event.slice(0, 50);
                  const description = parts[1]?.trim() || item.event;
                  
                  return {
                    year: item.year.toString(),
                    title: title,
                    description: description !== title ? description : '',
                  };
                })}
                title="Career Timeline"
                subtitle="Scroll to explore the journey"
                cardAlignment="alternating"
                revealAnimation="fade"
                progressIndicator={true}
                cardVariant="elevated"
                cardEffect="none"
                parallaxIntensity={0.1}
                dateFormat="badge"
              />
            </div>
          )}
        </section>
        {/* --- Certifications Section with scroll-triggered fade-in --- */}
        <section
          ref={certRef}
          className={`mb-16 transition-all duration-700 ease-out ${certInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Certifications</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {CERTIFICATIONS_DATA.map((cert) => (
              <button
                key={cert.name}
                className="flex flex-col items-center focus:outline-none group"
                onClick={() => openCertModal(cert)}
                tabIndex={0}
                aria-label={`View certificate: ${cert.name}`}
              >
                <img
                  src={cert.image}
                  alt={`Certificate for ${cert.name}`}
                  className="w-24 h-24 object-contain rounded-lg shadow-md mb-2 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300"
                  loading="lazy"
                />
                <span className="text-base font-medium text-gray-800 dark:text-gray-200 text-center group-hover:text-cyan-500 transition-colors duration-300">{cert.name}</span>
              </button>
            ))}
          </div>
        </section>
        {/* --- Tech Stack Section with scroll-triggered fade-in --- */}
        <section
          ref={techRef}
          className={`mb-16 transition-all duration-700 ease-out ${techInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {TECH_STACK_DATA.map((tech) => (
              <TechIcon key={tech.name} tech={tech} />
            ))}
          </div>
        </section>
      </div>
      {/* Move CertModal here so it overlays the entire page and is not overlapped by any section */}
      <CertModal selectedCert={selectedCert} closeCertModal={closeCertModal} />
      {/* No custom animation CSS needed for scroll-triggered fade-in */}
    </div>
  );
};

export default About;