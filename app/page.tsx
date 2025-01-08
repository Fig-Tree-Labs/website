'use client'

import { Button } from "@/components/ui/button";
import { AlertCircle, Code, Database, GitBranch, Globe, LayoutGrid, Mail, Monitor, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import NetworkTree from "@/components/network-tree";
import FeatureCard from "@/components/feature-card";
import ServiceCard from "@/components/service-card";
import FigTreeHero from "@/components/fig-tree-hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" style={{
      ['--primary' as string]: '142 76% 36%',
      ['--primary-foreground' as string]: '355.7 100% 97.3%',
      ['--secondary' as string]: '143 50% 94%',
      ['--secondary-foreground' as string]: '142 76% 36%',
      ['--muted' as string]: '143 50% 94%',
      ['--muted-foreground' as string]: '142 15% 45%',
      ['--accent' as string]: '143 50% 94%',
      ['--accent-foreground' as string]: '142 76% 36%'
    } as React.CSSProperties}>
      {/* Navigation */}
      <Navbar />
      <div id="hero">
        <FigTreeHero />
      </div>

      {/* Services Section */}


      {/* Why Us Section */}


      {/* Contact Section */}

      {/* Footer */}
      <footer className="py-8 absolute inset-x-0 bottom-0 bg-transparent text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GitBranch className="h-6 w-6" />
              <span className="font-bold">Fig Tree Labs</span>
            </div> */}
            <div className="text-sm text-muted-foreground">
              © 2025 Fig Tree Labs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
