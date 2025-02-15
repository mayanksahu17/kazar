"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export const products = [
  {
    title: "BYN Career",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734800718/BNYCarrer_vuudav.jpg",
  },
  {
    title: "IBM Career",
    link: "https://cursor.so",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734800707/IBMCareer_fgqzgi.jpg",
  },
  {
    title: "Spotify Career",
    link: "https://userogue.com",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734800707/SpotifyCareer_copjdm.jpg",
  },
  {
    title: "Google Career",
    link: "https://editorially.org",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734800707/GoogleCareer_mq9x1m.jpg",
  },
  {
    title: "Netflix Career",
    link: "https://editrix.ai",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734800707/NetflixCareer_vle3sl.jpg",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734801375/OracleCareer_dhgaqb.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734800707/GoogleCareer_mq9x1m.jpg",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734800707/NetflixCareer_vle3sl.jpg",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://res.cloudinary.com/dmky9t4sr/image/upload/v1734801375/OracleCareer_dhgaqb.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

