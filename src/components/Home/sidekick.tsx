import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

interface Assistant {
  name: string
  school: string
  rating: string
  reviews: string
  applications: string
  paragraph: string
  image: string
}

export default function AssistantCard() {
  const assistants: Assistant[] = [
    { name: 'Anjali Singh', school: 'Senior at KIIT', rating: '4.7', reviews: '37', applications: '3150', paragraph: 'Every successful placement brings immense joy!', image: 'Anjali.png' },
    { name: 'Yash Jaiswal', school: 'Junior at IIT Indore', rating: '4.9', reviews: '52', applications: '4890', paragraph: 'Seeing clients thrive in their careers is the best reward.', image: 'Anil.jpg' },
    { name: 'Radhika Gupta', school: 'Freshman at IIT Indore', rating: '4.6', reviews: '29', applications: '2340', paragraph: 'Connecting talent with opportunities makes my day.', image: 'Radhika.png' },
    { name: 'Chirag Thakur', school: 'Senior at SVVV', rating: '4.8', reviews: '44', applications: '1980', paragraph: 'Guiding clients to their dream jobs is my mission.', image: 'Chirag.png' },
    { name: 'Aradhy Agrawal', school: 'Senior at SVVV', rating: '4.7', reviews: '39', applications: '5760', paragraph: 'Helping people succeed professionally is what I strive for.', image: 'Siddharth.png' },
    { name: 'Kuldeep Vyas', school: 'Senior at KIIT', rating: '4.9', reviews: '50', applications: '4250', paragraph: 'Each success story inspires me to do more.', image: 'Kuldeep.jpeg' },
    { name: 'Shagun J', school: 'Sophomore at Vellore Institute of Technology', rating: '4.8', reviews: '48', applications: '3050', paragraph: 'Ensuring client satisfaction is my top priority.', image: 'Shagun.jpg' },
    { name: 'Deepesh Gupta', school: 'Sophomore at Jawaharlal Nehru University', rating: '4.8', reviews: '43', applications: '5560', paragraph: 'Helping clients achieve their goals is my passion!', image: 'Depeesh.png' }
  ]

  return (
    <section className="py-16 bg-transparent">
      <h2
        className="text-center text-4xl font-bold text-gray-800 mb-2"
        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
      >
        Assistants you can trust
      </h2>
      <p
        className="text-center mb-10 text-gray-500"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        We assemble top-tier talent to support you during the pivotal moments of your journey as your trusted aides.
      </p>
      <div className="container max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assistants.map((assistant, index) => (
            <Card key={index} className={`overflow-hidden transition-all hover:shadow-lg card-hover-effect`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2 border-white">
                    <AvatarImage src={assistant.image} alt={assistant.name} />
                    <AvatarFallback>{assistant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{assistant.name}</h3>
                    <p className="text-sm text-muted-foreground">{assistant.school}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {assistant.rating} ({assistant.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {assistant.applications}+ applications
                  </p>
                  <p className="italic text-sm text-muted-foreground h-12 overflow-hidden">
                    {assistant.paragraph}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 p-4">
                <a 
                  href="https://apply.neetocal.com/meeting-with-nikhil-jain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center text-sm font-medium hover:underline"
                >
                  Hire an Assistant
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .card-hover-effect {
          transition: transform 0.3s ease-out;
        }
        .card-hover-effect:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  )
}

