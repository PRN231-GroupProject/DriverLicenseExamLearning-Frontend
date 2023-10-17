import React from "react";
export const Navigation = () => {
    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand page-scroll" href="DriverLicenseExemLearning-WebClient/src/components/LandingPage/Navigation.jsx#page-top">
                        Driver License Learning
                    </a>{" "}
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="DriverLicenseExemLearning-WebClient/src/components/LandingPage/Navigation.jsx#features" className="page-scroll">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="DriverLicenseExemLearning-WebClient/src/components/LandingPage/Navigation.jsx#services" className="page-scroll">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="DriverLicenseExemLearning-WebClient/src/components/LandingPage/Navigation.jsx#contact" className="page-scroll">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href={"/login"} className="page-scroll">
                                Login
                            </a>
                        </li>
                        <li>
                            <a href={"/register"} className="page-scroll">
                                Sign up
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};