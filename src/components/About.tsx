import { FunctionComponent } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
     <div className="container d-flex flex-column min-vh-100">
        <Navbar />

        <div className="row mt-5 border">
          <img className="col col-lg-6" src="images/shutterstock_149002709_i.jpg" alt="" />
          <div className="col col-lg-6 p-5">
            <p className="display-6">Who Are We?</p>
            <p>Biz is a platform for creating at publishing business cards. </p>
            <p>
              other users will be able to see your business details and contact
              you with the details you provide on your business card
            </p>
            <p> register now and start your journey!</p>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
