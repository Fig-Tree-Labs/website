'use client'

import { GitBranch } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { FigTreeLogo } from "./icons/fig-tree-logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = (document.querySelector('#hero') as HTMLElement)?.offsetHeight || 0
      setIsScrolled(window.scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${
        isScrolled ? 'border-b border-white/10 bg-gradient-to-r' : 'bg-transparent'
      } from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm fixed w-full z-50`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GitBranch className="h-6 w-6 text-[#60A5FA]" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Fig Tree Labs
          </span>
        </div>
        {/* <div className="hidden md:flex space-x-6">
          <a 
            href="#services" 
            className="relative group text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
          >
            Services
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
          </a>
          <a 
            href="#why-us" 
            className="relative group text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
          >
            Why Us
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
          </a>
          <a 
            href="#contact" 
            className="relative group text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-400 to-blue-400 transition-all duration-300"
          >
            Contact
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
          </a>
        </div> */}
        {/* <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0">
          Get Started
        </Button> */}
      </div>
    </nav>
  )
}