import { useState, useEffect } from "react";
import { Navigation } from "../../components/LandingPage/Navigation.jsx";
import { Header } from "../../components/LandingPage/Header.jsx";
import { Features } from "../../components/LandingPage/Features.jsx";
import { About } from "../../components/LandingPage/About.jsx";
import { Services } from "../../components/LandingPage/Service.jsx";
import { Contact } from "../../components/LandingPage/Contact.jsx";
import JsonData from "../../components/LandingPage/data.json";
import SmoothScroll from "smooth-scroll";
import "./LandingPage.css"

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

export const LandingPage = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    return (
        <div>
            <Navigation />
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />
            <Contact data={landingPageData.Contact} />
        </div>
    )
}