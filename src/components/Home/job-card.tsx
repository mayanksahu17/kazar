'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface JobCardProps {
  title: string
  companies: Array<{
    logo: string
    name: string
  }>
  cardLogo?: string
}

export function JobCard({ title, companies, cardLogo }: JobCardProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="w-[180px] flex-shrink-0 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <motion.div
            className="w-6 h-6 rounded-lg overflow-hidden bg-white flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cardLogo ? (
              <img
              src={cardLogo}
                alt="Card logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-white"></div>
            )}
          </motion.div>
          <motion.div
            className="flex-grow ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="h-3 bg-gray-200 animate-pulse rounded-sm"
              style={{
                width: isLoading ? `${Math.random() * 60 + 30}%` : '100%',
              }}
            ></div>
          </motion.div>
        </div>
        <CardTitle className="text-xs font-medium text-gray-900 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-5 h-5 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-1">
                {isLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-sm"></div>
                ) : (
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="flex-grow">
                <div
                  className="h-3 bg-gray-200 animate-pulse rounded-sm"
                  style={{
                    width: isLoading ? `${Math.random() * 60 + 30}%` : '100%',
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

