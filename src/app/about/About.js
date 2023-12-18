import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 p-8 w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Signal Hub</h1>
        <hr />

        <p className="text-lg text-gray-700 mb-8">
          Welcome to Signal Hub - Your Gateway to Informed Trading!
          <br /> At Signal Hub, we believe in empowering individuals to navigate
          the complex world of trading with confidence and security.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Signal Hub?</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">Diverse Signal Providers</li>
            <p className="text-lg text-gray-700 mb-4">
              {`    Signal Hub brings together a diverse community of signal providers, each with their unique trading strategies and expertise. We understand that every trader is different, and that's why we provide you with the flexibility to choose from a variety of signals tailored to your preferences and risk tolerance.`}
            </p>
            <li className="mb-2">Transparent Reviews</li>
            <p className="text-lg text-gray-700 mb-4">
              {`       We understand the importance of trust in the trading community. Signal Hub allows users to provide genuine reviews of signal providers, creating a transparent environment where traders can make informed decisions based on real experiences.         `}{" "}
            </p>
            <li className="mb-2">Scam Protection</li>
            <p className="text-lg text-gray-700 mb-4">
              {`        Our primary goal is to shield users from scams prevalent on social media platforms. Signal Hub is a secure space designed to eliminate the risks associated with unreliable signals, providing you with a trustworthy platform to enhance your trading journey.       `}{" "}
            </p>
            <li className="mb-2">{`EtherealCash Integration (Under Development!)`}</li>
            <p className="text-lg text-gray-700 mb-4">
              {`  To facilitate seamless transactions between signal providers and followers, Signal Hub introduces EtherealCash, a digital currency exclusive to our platform. Users can buy and sell signals using EtherealCash, ensuring a convenient and secure payment system.    `}{" "}
            </p>
          </ul>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          {`    Whether you're a seasoned trader looking to share your expertise or a newcomer seeking reliable signals, Signal Hub welcomes you to a community driven by trust, transparency, and innovation. Together, let's redefine the trading landscape and ensure that every trader gets what they deserve.

`}{" "}
        </p>

        <p className="text-lg text-gray-700">
          {`          Signal Hub - Trading with Trust, Trading with Signal Hub.`}
        </p>
      </div>
    </div>
  );
};

export default About;
