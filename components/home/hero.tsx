"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-6 py-20 bg-linear-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
            AI-powered scheduling redefined
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground mb-4">
          Smart Scheduling for the <span className="text-primary">AI Era</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Save hours with your AI scheduling assistant — auto-suggest meeting times, generate summaries, and manage your availability intelligently.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              <Calendar className="h-5 w-5" />
              Get Started
            </Button>
          </Link>

          <Link href="/demo">
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16"
      >
        <img
          src="/dashboard-preview.png"
          alt="App Dashboard Preview"
          className="rounded-2xl shadow-lg w-full max-w-5xl border"
        />
      </motion.div>
    </section>
  );
}
