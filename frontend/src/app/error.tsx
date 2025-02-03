'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useSearchParams } from "next/navigation";
import Link from 'next/link';

const ErrorPage = ({ statusCode = 500 }) => {
  const searchParams = useSearchParams();
  const host = searchParams.get("host");
  const shop = searchParams.get("shop");
  const queryParams = new URLSearchParams({
    shop: shop || '',
    host: host || ''
  }).toString();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleSendEmail = () => {
    const email = process.env.EMAIL_TO || "example@gmail.com";
    const subject = encodeURIComponent("Doc2Product Support and Feedback");
    const body = encodeURIComponent(
      `Hello Doc2Product Support Team,\n\nI’m reaching out to request assistance and share my feedback regarding the Doc2Product app. Here are my thoughts and suggestions:\n\n[Please add your feedback here]. Looking forward to hearing back!\n\nBest regards,\n[Your Name]`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section 
      className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 text-white font-sans flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container max-w-4xl mx-auto text-center relative">
        <motion.div
          className="absolute inset-0 bg-yellow-500 opacity-10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
        />
        <motion.h1 
          className="text-9xl font-bold mb-8 relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          {statusCode}
          <motion.span 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-2xl mt-2 bg-yellow-500 text-red-900 px-4 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            Error
          </motion.span>
        </motion.h1>
        <motion.h2 
          className="text-4xl font-semibold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
        >
          Oops! Something went wrong
        </motion.h2>
        <motion.p 
          className="text-xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
        >
          We're experiencing some difficulties. Please try again later or contact support if the problem persists.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        >
          <Link href={`${process.env.SHOPIFY_HOST}/shops/shop=${shop}?${queryParams}`} passHref>
            <motion.div
              className="inline-block bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg mr-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Home
            </motion.div>
          </Link>
          <motion.div
            onClick={() => handleSendEmail()}
            className="inline-block bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-red-900 font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ErrorPage;