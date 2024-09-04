import React from "react";
import "./landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <iframe 
        src="https://signal-vase-landing.vercel.app" 
        title="Landing Page" 
        className="landing-iframe"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}



// import React from "react";
// import Navbar from "./components/navbar";
// import HeroSection from "./components/HeroSection.jsx";
// import "./landing.css";

// export default function Landing() {
//   return (
//     <div className="landing-body">
//       <div className="absolute overflow-hidden inset-0 z-0 flex items-center justify-center ">
//         <div className="gradient w-full h-full"></div>
//       </div>

//       <Navbar />
//       <HeroSection />
      
//     </div>
//   );
// }
