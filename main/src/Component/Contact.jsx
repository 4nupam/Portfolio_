import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { error } = await supabase.from("contact-form").insert([
        {
          name: form.name,
          number: form.number,
          email: form.email,
          type: form.type,
          message: form.message,
          time: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setStatus({ success: true, message: "Message sent successfully!" });
      setForm({ name: "", number: "", email: "", type: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >
        {/* --- Left Illustration Section --- */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 text-white p-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mt-6"
          >
            <h2 className="text-4xl font-extrabold leading-snug">
              Let’s Build Something Great Together
            </h2>
            <p className="text-indigo-100 text-lg leading-relaxed">
              Have an idea, project, or collaboration in mind?  
              Reach out and we’ll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            src="https://illustrations.popsy.co/gray/team-work.svg"
            alt="Contact illustration"
            className="w-full max-w-xs mx-auto mt-10 mb-6 drop-shadow-xl select-none"
          />
        </div>

        {/* --- Right Form Section --- */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-10">
            Get in Touch
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Number */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="number"
                value={form.number}
                onChange={handleChange}
                required
                placeholder="+91 9876543210"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Type */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1">
                Type of Inquiry
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Type</option>
                <option value="project">Project Inquiry</option>
                <option value="support">Support</option>
                <option value="collaboration">Collaboration</option>
                <option value="hire">Hire</option>
              </select>
            </div>

            {/* Message */}
            <div className="md:col-span-2 flex flex-col">
              <label className="text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Write your message..."
                className="rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center mt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 text-white font-semibold rounded-xl px-10 py-3 shadow-md hover:bg-indigo-700 transition-all disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          </form>

          {/* Status Message */}
          {status && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-6 text-center font-medium ${
                status.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
