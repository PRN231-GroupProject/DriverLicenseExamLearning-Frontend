'use client'
import { useState, useEffect } from "react";
import { Header } from "@/components/LandingPage/Header.jsx";
import { Features } from "@/components/LandingPage/Features.jsx";
import { About } from "@/components/LandingPage/About.jsx";
import { Services } from "@/components/LandingPage/Service.jsx";
import { Contact } from "@/components/LandingPage/Contact.jsx";
import JsonData from "@/components/LandingPage/data.json";
import '@/styles/style.css';

export default function LandingPage() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
      <>
        <Header data={landingPageData.Header} />
        <Features data={landingPageData.Features} />
        <About data={landingPageData.About} />
        <Services data={landingPageData.Services} />
      </>
  )
}