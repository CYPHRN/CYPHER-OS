"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/contact";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    const result = await submitContact(formData);

    if (result.success) {
      setStatus("success");
      setMessage("Your message has been sent successfully!");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <div
      className="
        w-full max-w-lg mx-auto
        p-6 pb-10 space-y-6
        bg-[#141414]
        border border-[#3b3838]
        text-white
        max-h-[80vh] overflow-y-auto
      "
    >
      {/* Intro Message */}
      <div className="space-y-1 text-sm text-gray-300">
        <h2 className="text-lg font-semibold border-b border-[#3b3838] pb-3">
          Get In Touch
        </h2>
        <p className="pt-2 pb-2 text-md">
          Interested in collaborating or exploring solutions? Let’s get in
          touch.
        </p>
        <p className="text-xs text-[#797575]">
          Email works best for initial contact. Usually respond within 24 hours
          on weekdays.
        </p>
      </div>

      {/* Contact Form */}
      <form action={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label className="text-xs mb-2 mt-2">Your Name</label>
          <input
            type="text"
            name="name"
            required
            pattern="[A-Za-zÀ-ÿ\s]+"
            title="Name can only contain letters and spaces"
            className="
    bg-[#1a1a1a] border border-[#3b3838] rounded-lg
    px-3 py-2 text-white
    focus:border-yellow-500 outline-none
    transition-colors
  "
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="
              bg-[#1a1a1a] border border-[#3b3838] rounded-lg
              px-3 py-2 text-white
              focus:border-yellow-500 outline-none
              transition-colors
            "
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs mb-2">Message</label>
          <textarea
            name="message"
            rows={2}
            required
            minLength={10}
            className="
    bg-[#1a1a1a] border border-[#3b3838] rounded-lg
    px-3 py-2 text-white resize-none
    focus:border-yellow-500 outline-none
    transition-colors
  "
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="
            w-full py-3 rounded-lg
            bg-[#1a1a1a]/60 hover:bg-[#3b3a3a]/70
            border border-[#3b3838] hover:border-yellow-500/40
            text-white text-sm font-medium transition-all
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        <div
          className={`min-h-[0.5rem] text-xs text-center transition-all ${
            status === "success"
              ? "text-green-400 opacity-100"
              : status === "error"
              ? "text-red-400 opacity-100"
              : "opacity-0"
          }`}
        >
          {message}
        </div>
      </form>
    </div>
  );
}
