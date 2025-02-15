import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const Testimonial = () => {
  const testimonials = [
    {
      company: "google.png",
      companyAlt: "Google",
      image: "/Try.jpeg?height=40&width=40",
      name: "Riya Patel",
      role: "Product Manager",
      content: " When I lost my job during an economic downturn and had just 60 days left on my H1B visa, I was extremely anxious. I decided to try their premium service and fully committed to the process. Within just 1 month, I received 2 job offers, each offering a significant salary increase over my previous position. Their expertise were remarkable. I am profoundly thankful for their assistance during this challenging period. "
    },
    {
      company: "Hsbc.png",
      companyAlt: "HSBC",
      image: "/Nikunj_Desai.jpeg?height=50&width=50",
      name: "Nikunj Desai",
      role: "Software Engineer",
      content: "Working full time left me with little time to apply for jobs. The application process was tedious and could take more than 15 minutes for just one job. After a week of trying on my own, I felt exhausted and demotivated. Then I heard about 'HiredEasy.com,' a service that applies for jobs on your behalf. Their team was incredibly helpful, always available to talk, and followed my job application priorities. They made the process so much easier for me."
    },
    {
      company: "wex.svg",
      companyAlt: "wex",
      image: "/Anshul.jpeg?height=40&width=40",
      name: "Anshul Jain",
      role: "Software Engineer",
      content: "I was looking for an internship and applied to over 300 positions on my own, but nothing worked out. Then I found HiredEasy. They updated my resume, wrote cover letters, and applied for jobs for me. Soon, I received two offer letters. Investing in their service was worth it because I got a great internship that covers both my student loan and living expenses."
    }
  ]

  return (
    <section className="bg-transparent py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
          Our clients <span className="text-red-500">❤️</span> us
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Hear what our customers have to say about their experience with HiredEasy.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="w-full md:w-[400px] h-[350px] flex flex-col">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex flex-col items-start mb-4">
                  <img
                    className="w-24 mb-4"
                    src={testimonial.company}
                    alt={testimonial.companyAlt}
                    loading="lazy"
                  />
                  <div className="flex items-center">
                    <img
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-gray-800 text-xl font-semibold font-calibri">{testimonial.name}</h3>
                      <p className="text-sm text-green-600 font-medium font-calibri">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
                <ScrollArea className="flex-grow h-[150px] custom-scrollbar transition-all duration-300 ease-in-out">
                  <p className="text-gray-600 font-calibri">{testimonial.content}</p>
                  <ScrollBar className="custom-scrollbar-thumb" />
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar {
          overflow: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.5) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(229, 231, 235, 0.5);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.5);
          border-radius: 20px;
          border: 2px solid rgba(229, 231, 235, 0.5);
          background-clip: padding-box;
        }
        .custom-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.5) !important;
          border-radius: 20px !important;
          border: 2px solid rgba(229, 231, 235, 0.5) !important;
          background-clip: padding-box !important;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb,
        .custom-scrollbar:hover .custom-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.8) !important;
        }
      `}</style>
    </section>
  )
}

export default Testimonial

