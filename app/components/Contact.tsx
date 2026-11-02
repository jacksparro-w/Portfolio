'use client';

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail,  Send, MapPin } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Message sent! I will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="py-32 px-6 relative overflow-hidden bg-slate-950"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-600/5 to-transparent" />

      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
            Let's Build Something Great
          </h2>
          <p className="text-xl text-gray-400 mt-4">
            Have a project in mind? Let’s make it happen.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 mx-auto rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Get In Touch
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I’m open to internships, freelance work, and full-time
                opportunities. Let’s discuss how I can help bring your
                ideas to life.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-5">
              {/* Email */}
              <motion.a
                href="mailto:brajinbrajin10@gmail.com"
                whileHover={{ scale: 1.03, x: 10 }}
                className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-emerald-400/40 transition-all group"
              >
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white group-hover:text-emerald-400 transition-colors">
                    brajinbrajin10@gmail.com
                  </p>
                </div>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/jacksparro-w"
                target="_blank"
                whileHover={{ scale: 1.03, x: 10 }}
                className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-emerald-400/40 transition-all group"
              >
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
                  {/* <Github className="w-6 h-6 text-white" /> */}
                </div>
                <div>
                  <p className="text-sm text-gray-400">GitHub</p>
                  <p className="text-white group-hover:text-emerald-400 transition-colors">
                    github.com/jacksparro-w
                  </p>
                </div>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://linkedin.com/in/brajin-s-j"
                target="_blank"
                whileHover={{ scale: 1.03, x: 10 }}
                className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-emerald-400/40 transition-all group"
              >
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
                  {/* <Linkedin className="w-6 h-6 text-white" /> */}
                </div>
                <div>
                  <p className="text-sm text-gray-400">LinkedIn</p>
                  <p className="text-white group-hover:text-emerald-400 transition-colors">
                    linkedin.com/in/brajin-s-j
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <div className="flex items-center gap-4 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 space-y-8 shadow-xl"
            >
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-400 mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-400 outline-none transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-emerald-400 outline-none transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-600 text-black font-semibold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}