'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const logos = [
  "CalState.jpeg", "UF.png", "BostonUniversity.gif", "USSA.png", "RIT.png",
  "ASU.png", "Bridgeport.png", "Clarksonlogo.png", "Auburn.png", "StevensLogo.png",
  "TexasLogo.png", "DrexelLogo.png", "OSU.png", "NortheasternLogo.png", "KentState.png",
  "Pacelogo.png"
]

const GRID_COLS = 4
const GRID_ROWS = 4

export function UniversityGrid({ onLeftColumnChange }: { onLeftColumnChange: () => void }) {
  const [currentLogos, setCurrentLogos] = useState(() => 
    Array(GRID_COLS * GRID_ROWS).fill('').map(() => ({
      logo: logos[Math.floor(Math.random() * logos.length)],
      key: Math.random(),
    }))
  )

  const updateLogos = useCallback(() => {
    setCurrentLogos(prev => {
      const newLogos = [...prev]
      // Shift all logos one step to the left
      for (let i = 0; i < GRID_ROWS; i++) {
        const rowStart = i * GRID_COLS
        const removedLogo = newLogos.splice(rowStart, 1)[0]
        newLogos.splice(rowStart + GRID_COLS - 1, 0, removedLogo)
      }
      // Replace the rightmost column with new logos
      for (let i = GRID_COLS - 1; i < newLogos.length; i += GRID_COLS) {
        newLogos[i] = {
          logo: logos[Math.floor(Math.random() * logos.length)],
          key: Math.random(),
        }
      }
      return newLogos
    })
    onLeftColumnChange()
  }, [onLeftColumnChange])

  useEffect(() => {
    const interval = setInterval(updateLogos, 3000)
    return () => clearInterval(interval)
  }, [updateLogos])

  return (
    <div className="relative w-full h-full bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-50/50 to-white/50" />
      
      <div className="grid grid-cols-4 grid-rows-4 gap-4 w-full h-full relative">
        <AnimatePresence initial={false}>
          {currentLogos.map(({ logo, key }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5,
                delay: (index % GRID_COLS) * 0.1, // Stagger the animation based on column
              }}
              className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3 group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                transition={{ duration: 0.2 }}
              />
              <motion.img
                src={logo}
                alt="University logo"
                className="w-full h-full object-contain relative z-10"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
