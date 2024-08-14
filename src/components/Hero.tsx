
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 sm:h-screen">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-orange-600 sm:text-5xl xl:text-6xl/none">
                Elevate Your BGMI Esports Experience
              </h1>
              <p className="max-w-[600px] text-orange-600 md:text-xl">
                Discover, compete, and thrive in the world of BGMI esports with our cutting-edge tournament platform.
                <br />
                 Do not waste your gaming skills.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <button
              onClick={()=>{window.scroll(0,850)}}
               
                className="inline-flex h-10 items-center justify-center rounded-md bg-orange-600 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-orange-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
               
              >
                Join a Tournament
              </button>
              <Link
                href="/launch-tournament"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-gray-900 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Organize a Tournament
              </Link>
            </div>
          </div>
          <Carousel className="rounded-xl overflow-hidden">
            <CarouselContent>
              <CarouselItem>
                <img
                  src="https://utfs.io/f/65707cfa-ebb0-404a-8a0b-bf8dd80ada9f-38.webp"
                //   src="https://utfs.io/f/8f9b955a-4a9b-40a0-b05e-f465977f2bf7-2vu.webp"
                  width={650}
                  height={400}
                  alt="Tournament Highlight"
                  className="aspect-[16/9] object-cover"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://utfs.io/f/f9d208f3-6e7b-4b38-8ca8-985c3123d187-nrtw97.webp"
                  width={650}
                  height={400}
                  alt="Tournament Highlight"
                  className="aspect-[16/9] object-cover"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://utfs.io/f/8f9b955a-4a9b-40a0-b05e-f465977f2bf7-2vu.webp"
                  width={650}
                  height={400}
                  alt="Tournament Highlight"
                  className="aspect-[16/9] object-cover"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}