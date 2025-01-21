import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaDatabase, FaLinkedin, FaGithub,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiStripe, SiRedux, SiExpress, SiLeetcode, SiCodeforces,
} from 'react-icons/si';

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'superadmin') return <Navigate to="/superadmin/dashboard" replace />;
    if (user.role === 'user') return <Navigate to="/user/dashboard" replace />;
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 px-6 py-10">
      {/* Welcome Section */}
      <motion.header
        className="text-center mb-20"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: false, amount:0.2}}
      >
        <h1 className="text-6xl font-extrabold text-blue-700 mb-6">Welcome to Planify!</h1>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Planify is a SaaS platform for managing roles, payments, and plans seamlessly. It includes secure integrations, role-based dashboards, and advanced management tools.
        </p>
      </motion.header>

      {/* System Overview Section */}
      <motion.section
        className="mb-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-10 text-gray-700">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Super Admin',
              description: 'Manage all plans, organizations, and user data. Full control of the platform.',
              bgColor: 'bg-blue-100',
              textColor: 'text-blue-700',
            },
            {
              title: 'Admin',
              description: 'Oversee organization details, user registrations, and manage plans via Stripe payments.',
              bgColor: 'bg-green-100',
              textColor: 'text-green-700',
            },
            {
              title: 'User',
              description: 'Access organization details and manage your personal subscriptions.',
              bgColor: 'bg-yellow-100',
              textColor: 'text-yellow-700',
            },
          ].map((role, index) => (
            <motion.div
              key={index}
              className={`p-6 ${role.bgColor} border rounded-lg shadow`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-xl font-bold ${role.textColor} mb-3`}>{role.title}</h3>
              <p className="text-gray-600">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        className="text-center mb-20"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="text-xl text-gray-700 mb-6 font-medium">
          Ready to manage your organization with ease? Login or register now!
        </p>
        <Link
          to="/user/login"
          className="inline-block bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-semibold shadow-lg transition ease-in-out hover:shadow-xl hover:bg-blue-500"
        >
          Login / Register
        </Link>
      </motion.div>

      {/* Test Login Credentials Section */}
      <h2 className="text-4xl font-semibold text-center mb-10 text-gray-700">Test Login Credentials</h2>
      <motion.section
        className="mb-20 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { role: 'Super Admin', email: 'superadmin1@gmail.com', password: 'abc123' },
            { role: 'Admin', email: 'admin2@gmail.com', password: '123' },
            { role: 'User', email: 'user2@gmail.com', password: 'abc123' },
          ].map((cred, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-100 border rounded-lg shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-medium text-lg mb-2">{cred.role}</h3>
              <p className="text-gray-700">
                Email: <span className="font-mono text-blue-600">{cred.email}</span>
              </p>
              <p className="text-gray-700">
                Password: <span className="font-mono text-blue-600">{cred.password}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <h2 className="text-4xl font-semibold text-center mb-10 text-gray-700">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto">
          {[
            { icon: <FaReact size={40} className="text-blue-600" />, name: 'React.js' },
            { icon: <SiTailwindcss size={40} className="text-teal-500" />, name: 'Tailwind CSS' },
            { icon: <FaNodeJs size={40} className="text-green-600" />, name: 'Node.js' },
            { icon: <SiExpress size={40} className="text-gray-800" />, name: 'Express.js' },
            { icon: <FaDatabase size={40} className="text-green-700" />, name: 'MongoDB' },
            { icon: <SiStripe size={40} className="text-purple-600" />, name: 'Stripe API' },
            { icon: <SiRedux size={40} className="text-purple-500" />, name: 'Redux Toolkit' },
          ].map((tech, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 p-6 bg-white border rounded-lg shadow"
              initial={{ opacity: 0, scale: 0.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              {tech.icon}
              <span className="text-lg font-medium">{tech.name}</span>
            </motion.div>
          ))}
        </div>

      {/* About the Developer Section */}
      <h2 className="text-4xl font-semibold mb-8 text-center">About the Developer</h2>
      <motion.section
        className="bg-white text-gray-800 p-10 rounded-lg shadow-md max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.5 }}
      >
        <p className="text-lg mb-4">
          This platform was developed by <strong>Eshaan Pandey</strong>, a dedicated programmer from the Indian Institute of Information Technology, Pune.
        </p>
        <p className="text-lg mb-6">
          Eshaan specializes in full-stack development and competitive programming, with experience in building scalable applications using modern technologies.
        </p>
        <div className="flex gap-6 justify-center">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/eshaan-pandey-9b28aa222/"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} /> <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/eshaan-pandey"
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} /> <span>GitHub</span>
          </a>

          {/* LeetCode */}
          <a
            href="https://leetcode.com/Eshaan14_/"
            className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiLeetcode size={24} /> <span>LeetCode</span>
          </a>
          {/* Codeforces */}
          <a
            href="https://codeforces.com/profile/eshaan14"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiCodeforces size={24} /> <span>Codeforces</span>
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
