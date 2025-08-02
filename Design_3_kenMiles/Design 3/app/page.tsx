"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import LetterGlitch from "@/components/LetterGlitch"
import {
  Terminal,
  Shield,
  Cpu,
  Radar,
  Satellite,
  Lock,
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Menu,
  X,
  ChevronRight,
  Activity,
  Zap,
  Eye,
  AlertTriangle,
} from "lucide-react"

// Terminal Text Overlay Component
function TerminalTextOverlay() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const terminalPhrases = [
    "INITIALIZING ADASTRA DRONE OPERATIONS...",
    "CONNECTING TO SATELLITE NETWORK... [OK]",
    "LOADING AUTONOMOUS FLIGHT PROTOCOLS... [OK]",
    "SCANNING FOR ACTIVE DRONE UNITS... [3 UNITS DETECTED]",
    "ESTABLISHING SECURE COMMUNICATION LINK... [ENCRYPTED]",
    "ACCESSING MISSION CONTROL DATABASE... [AUTHORIZED]",
    "LOADING AI NAVIGATION SYSTEMS... [NEURAL NET ACTIVE]",
    "DRONE SWARM COORDINATION... [STANDBY]",
    "WELCOME TO ADASTRA COMMAND CENTER",
    "STATUS: ALL SYSTEMS OPERATIONAL",
    "MISSION: RISE ABOVE. BUILD BEYOND.",
    "> AWAITING COMMANDS...",
  ]

  useEffect(() => {
    if (currentPhrase < terminalPhrases.length) {
      const phrase = terminalPhrases[currentPhrase]
      let charIndex = 0

      const typeInterval = setInterval(() => {
        if (charIndex < phrase.length) {
          setDisplayText(phrase.substring(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            if (currentPhrase === terminalPhrases.length - 1) {
              // Stay on last phrase
              return
            }
            setCurrentPhrase((prev) => prev + 1)
            setDisplayText("")
          }, 1000)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    }
  }, [currentPhrase])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="w-full max-w-4xl mx-4">
        <motion.div
          className="bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-6 font-mono"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Terminal className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-green-400">ADASTRA_TERMINAL_v2.1.0</span>
            <div className="ml-auto flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-2 text-green-400 text-sm max-h-64 overflow-hidden">
            {terminalPhrases.slice(0, currentPhrase + 1).map((phrase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <span className="text-green-600 mr-2">$</span>
                {index === currentPhrase ? displayText : phrase}
                {index === currentPhrase && (
                  <motion.span
                    className="inline-block w-2 h-4 bg-green-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Floating Navigation
function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "SYSTEMS", href: "#systems" },
    { name: "MISSIONS", href: "#missions" },
    { name: "INTEL", href: "#intel" },
    { name: "RECRUIT", href: "#recruit" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-3 left-3 right-3 sm:top-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md border-green-400/40 shadow-2xl shadow-green-400/10"
          : "bg-black/70 backdrop-blur-sm border-green-400/20"
      } border rounded-2xl sm:rounded-full px-4 py-3 sm:px-6`}
    >
      <div className="flex items-center justify-between">
        <motion.div
          className="text-lg sm:text-xl font-bold text-green-400 font-mono"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          ADASTRA
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 ml-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-green-300 hover:text-green-400 transition-colors font-mono text-sm font-medium relative group"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-green-400 p-2 -mr-2 rounded-lg hover:bg-green-400/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden mt-4 pt-4 border-t border-green-400/20 overflow-hidden"
          >
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-2 text-green-300 hover:text-green-400 hover:bg-green-400/5 transition-all duration-300 font-mono text-base font-medium rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Glowing Card Component
function GlowingCard({
  children,
  className = "",
  glowColor = "green",
}: { children: React.ReactNode; className?: string; glowColor?: string }) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${glowColor}-600/10 to-${glowColor}-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
      />
      <Card
        className={`relative z-10 bg-black/80 backdrop-blur-sm border-gray-700/50 hover:border-green-400/50 transition-all duration-300 shadow-2xl`}
      >
        {children}
      </Card>
    </motion.div>
  )
}

// Status Indicator Component
function StatusIndicator({ status, label }: { status: "online" | "offline" | "warning"; label: string }) {
  const statusColors = {
    online: "bg-green-400",
    offline: "bg-red-400",
    warning: "bg-yellow-400",
  }

  return (
    <div className="flex items-center space-x-2">
      <motion.div
        className={`w-2 h-2 rounded-full ${statusColors[status]}`}
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <span className="text-sm font-mono text-gray-300">{label}</span>
    </div>
  )
}

// Letter Glitch Background Component
function LetterGlitchBackground() {
  return (
    <div className="absolute inset-0">
      <LetterGlitch
        glitchColors={["#22c55e", "#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]}
        glitchSpeed={80}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />

      {/* Additional space-tech overlay effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400/50 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-green-400/50 to-transparent" />
      </div>
    </div>
  )
}

export default function AdAstraTerminalHomepage() {
  const { scrollYProgress } = useScroll()
  const [missionStats, setMissionStats] = useState({
    dronesActive: 0,
    missionsCompleted: 0,
    systemsOnline: 0,
  })

  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Animate mission stats
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionStats({
        dronesActive: Math.floor(Math.random() * 8) + 3,
        missionsCompleted: 247 + Math.floor(Math.random() * 10),
        systemsOnline: Math.floor(Math.random() * 3) + 97,
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const systemModules = [
    {
      title: "AUTONOMOUS FLIGHT",
      icon: <Satellite className="w-8 h-8" />,
      description: "Advanced AI-powered navigation and obstacle avoidance systems for Indian defense applications",
      status: "online" as const,
      glowColor: "green",
    },
    {
      title: "SWARM INTELLIGENCE",
      icon: <Radar className="w-8 h-8" />,
      description: "Multi-drone coordination and collective decision making for border surveillance operations",
      status: "online" as const,
      glowColor: "blue",
    },
    {
      title: "TACTICAL ROBOTICS",
      icon: <Shield className="w-8 h-8" />,
      description: "Military-grade robotic systems designed for defense and strategic reconnaissance missions",
      status: "warning" as const,
      glowColor: "purple",
    },
    {
      title: "NEURAL NETWORKS",
      icon: <Cpu className="w-8 h-8" />,
      description: "Deep learning algorithms for real-time threat analysis and autonomous decision making",
      status: "online" as const,
      glowColor: "green",
    },
  ]

  const missionProjects = [
    {
      codename: "OPERATION SKYWATCH",
      classification: "CLASSIFIED",
      description: "Border surveillance system with thermal imaging and AI threat detection capabilities",
      progress: 87,
      status: "ACTIVE",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      codename: "PROJECT HARVEST",
      classification: "RESTRICTED",
      description: "Precision agriculture drones for crop monitoring and automated pesticide deployment",
      progress: 94,
      status: "DEPLOYED",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      codename: "URBAN GUARDIAN",
      classification: "SECRET",
      description: "City-wide emergency response and disaster management drone network system",
      progress: 73,
      status: "TESTING",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const intelReports = [
    {
      agent: "AGENT_SHARMA_A",
      timestamp: "2024.01.15_14:32:07",
      message:
        "AdAstra's autonomous systems exceeded all performance benchmarks. Recommend immediate deployment for border operations.",
      clearance: "TOP SECRET",
    },
    {
      agent: "DR_PATEL_R",
      timestamp: "2024.01.14_09:15:43",
      message:
        "Neural network optimization complete. Drone response time improved by 340%. Ready for field deployment.",
      clearance: "CONFIDENTIAL",
    },
    {
      agent: "COMMANDER_SINGH",
      timestamp: "2024.01.13_16:28:19",
      message:
        "Field test successful. Swarm coordination protocols functioning at 99.7% efficiency in combat scenarios.",
      clearance: "RESTRICTED",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-x-hidden font-mono">
      <FloatingNav />

      {/* Hero Section with Liquid Chrome Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center" ref={heroRef}>
        <div className="absolute inset-0">
          <LetterGlitchBackground />
        </div>

        <TerminalTextOverlay />

        <motion.div
          className="relative z-20 text-center max-w-6xl mx-auto px-4"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 3 }}
            className="mt-32"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
            >
              <span className="block text-green-400 mb-2">[ADASTRA]</span>
              <span className="block text-blue-400 text-2xl md:text-3xl lg:text-4xl font-normal">COMMAND CENTER</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-green-300 mb-8 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.5 }}
            >
              CLASSIFIED DRONE OPERATIONS
              <br />
              <span className="text-base text-gray-400">AUTHORIZATION REQUIRED</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4, type: "spring", stiffness: 200 }}
              className="mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-black px-8 py-4 text-lg rounded-none font-mono border border-green-400 shadow-lg shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300"
              >
                <Lock className="mr-2 w-5 h-5" />
                REQUEST ACCESS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Mission Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <GlowingCard glowColor="green">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{missionStats.dronesActive}</div>
                  <div className="text-sm text-gray-400">DRONES ACTIVE</div>
                </CardContent>
              </GlowingCard>

              <GlowingCard glowColor="blue">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{missionStats.missionsCompleted}</div>
                  <div className="text-sm text-gray-400">MISSIONS COMPLETED</div>
                </CardContent>
              </GlowingCard>

              <GlowingCard glowColor="purple">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{missionStats.systemsOnline}%</div>
                  <div className="text-sm text-gray-400">SYSTEMS ONLINE</div>
                </CardContent>
              </GlowingCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Systems Section */}
      <section id="systems" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-green-400">[SYSTEM_MODULES]</h2>
            <p className="text-xl text-gray-400">ADVANCED WARFARE AND RECONNAISSANCE CAPABILITIES</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {systemModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlowingCard glowColor={module.glowColor}>
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r from-${module.glowColor}-600/20 to-${module.glowColor}-400/20 border border-${module.glowColor}-400/30`}
                        >
                          {module.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">{module.title}</h3>
                      </div>
                      <StatusIndicator status={module.status} label={module.status.toUpperCase()} />
                    </div>
                    <p className="text-gray-300 leading-relaxed">{module.description}</p>
                  </CardContent>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Missions Section */}
      <section id="missions" className="relative py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-blue-400">[ACTIVE_MISSIONS]</h2>
            <p className="text-xl text-gray-400">CLASSIFIED OPERATIONS IN PROGRESS</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {missionProjects.map((mission, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlowingCard glowColor="blue">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <motion.img
                      src={mission.image || "/placeholder.svg"}
                      alt={mission.codename}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <Badge className="absolute top-4 right-4 bg-red-600/90 hover:bg-red-700 text-white">
                      {mission.classification}
                    </Badge>
                    <Badge className="absolute bottom-4 left-4 bg-green-600/90 hover:bg-green-700 text-white">
                      {mission.status}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-blue-400">{mission.codename}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{mission.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">PROGRESS</span>
                        <span className="text-green-400 font-semibold">{mission.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${mission.progress}%` }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 bg-transparent transition-all duration-300"
                    >
                      <Eye className="mr-2 w-4 h-4" />
                      VIEW DETAILS
                    </Button>
                  </CardContent>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intel Section */}
      <section id="intel" className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-purple-400">[INTELLIGENCE_REPORTS]</h2>
            <p className="text-xl text-gray-400">FIELD AGENT COMMUNICATIONS</p>
          </motion.div>

          <div className="space-y-6">
            {intelReports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <GlowingCard glowColor="purple">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-purple-600 hover:bg-purple-700 text-white">{report.clearance}</Badge>
                        <span className="text-purple-400 font-bold">{report.agent}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{report.timestamp}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{report.message}</p>
                  </CardContent>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Section */}
      <section id="recruit" className="relative py-20 px-4 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-green-400">[RECRUITMENT_PROTOCOL]</h2>
            <p className="text-xl text-gray-400 mb-12">JOIN THE ELITE DRONE OPERATIONS UNIT</p>

            <GlowingCard glowColor="green">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    placeholder="AGENT CODENAME"
                    className="bg-black/50 border-green-400/30 focus:border-green-400 text-green-400 placeholder-gray-500 font-mono"
                  />
                  <Input
                    placeholder="SECURE COMMUNICATION CHANNEL"
                    type="email"
                    className="bg-black/50 border-green-400/30 focus:border-green-400 text-green-400 placeholder-gray-500 font-mono"
                  />
                </div>
                <Input
                  placeholder="SPECIALIZATION (DRONES/AI/ROBOTICS/CYBER)"
                  className="bg-black/50 border-green-400/30 focus:border-green-400 text-green-400 placeholder-gray-500 font-mono mb-6"
                />

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-black py-6 text-xl font-bold font-mono border border-green-400 shadow-lg shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300"
                  >
                    <Shield className="mr-3 w-6 h-6" />
                    INITIATE RECRUITMENT
                    <ChevronRight className="ml-3 w-6 h-6" />
                  </Button>
                </motion.div>
              </CardContent>
            </GlowingCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-green-400/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">[ADASTRA_COMMAND]</h3>
              <p className="text-gray-400 leading-relaxed">
                CLASSIFIED DRONE OPERATIONS CENTER
                <br />
                SECURITY CLEARANCE: RESTRICTED
                <br />
                LOCATION: [REDACTED]
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400 font-mono">SECURE_CHANNELS</h4>
              <div className="space-y-2 text-gray-400">
                <div>MISSION_BRIEFINGS</div>
                <div>TACTICAL_UPDATES</div>
                <div>AGENT_PROFILES</div>
                <div>CLASSIFIED_DOCS</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-400 font-mono">COMMUNICATION</h4>
              <div className="flex space-x-4 mb-4">
                {[
                  { icon: <Instagram className="w-5 h-5" />, color: "hover:text-pink-400" },
                  { icon: <Linkedin className="w-5 h-5" />, color: "hover:text-blue-400" },
                  { icon: <Github className="w-5 h-5" />, color: "hover:text-green-400" },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    className={`p-3 rounded border border-gray-600 text-gray-400 ${social.color} transition-all duration-300 hover:border-current hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className="border-t border-green-400/30 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 font-mono">© 2024 ADASTRA_COMMAND | CLASSIFIED OPERATIONS | SECURITY_LEVEL_7</p>
            <p className="text-sm text-gray-500 mt-2 font-mono">[THIS TRANSMISSION IS ENCRYPTED AND MONITORED]</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
