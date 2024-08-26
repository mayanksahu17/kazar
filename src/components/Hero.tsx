
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Image from "next/image"
import t from "../../public/assets/t.webp"
import splitStringUsingRegex from "@/utils/seperateStringByChar"
import {motion , Variants} from "framer-motion"
import scrims from "../../public/scrims.png"
export default function Component() {
  let heading = "Elevate Your BGMI Esports Experience";
  let subheading = " Discover, compete, and thrive in the world of BGMI esports with our cutting-edge tournament platform."
  const title = splitStringUsingRegex(heading)
  const subTitle = splitStringUsingRegex(subheading)

  const charVarients = {
    hidden: {opacity : 0},
    reveal: {opacity : 1}
  }
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 sm:h-screen">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <motion.h1 className="text-4xl font-bold tracking-tighter text-orange-600 sm:text-5xl xl:text-6xl/none"
              initial = {"hidden"}
              whileInView={"reveal"}
              transition={{staggerChildren : 0.1}}
              >
                {title.map(char=>(
                  <motion.span
                  key={char}
                  transition={{duration : 0.5}}
                  variants={charVarients}
                  > 
                    {char}
                  </motion.span>
                ))
                
                }  
              </motion.h1>

{/*             
              <motion.p className="max-w-[600px] text-orange-600 md:text-xl"
                initial = {"hidden"}
                whileInView={"reveal"}
                transition={{staggerChildren : 0.2}}
              >
              {subTitle.map(char=>(
                  <motion.span
                  key={char}
                  transition={{duration : 0.35}}
                  variants={charVarients}
                  > 
                    {char}
                  </motion.span>
                ))}  
              </motion.p> */}
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
              <CarouselItem >
                <Image
                src={t.src}
                  width={t.width}
                  height={t.height}
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