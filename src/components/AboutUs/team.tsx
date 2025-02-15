'use client'

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function Team() { // Updated to PascalCase
  const teamMembers = [
    {
      name: "Sarah Wilson",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=400&width=300",
      description: "Visionary leader with 15+ years of industry experience"
    },
    {
      name: "Michael Chen",
      role: "Technical Director",
      image: "/placeholder.svg?height=400&width=300",
      description: "Expert in innovative solutions and technical strategy"
    },
    {
      name: "Emma Rodriguez",
      role: "Creative Director",
      image: "/placeholder.svg?height=400&width=300",
      description: "Award-winning designer with a passion for user experience"
    },
    {
      name: "James Kumar",
      role: "Head of Operations",
      image: "/placeholder.svg?height=400&width=300",
      description: "Operations specialist focused on scaling excellence"
    }
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet Our Team</h2>
          <p className="mt-4 text-muted-foreground">The passionate individuals behind our success</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-4">
                        <p className="text-white text-sm">{member.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center bg-white">
                    <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
