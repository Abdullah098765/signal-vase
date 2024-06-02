import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 p-8 w-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Signal Vase</h1>
        <hr />

        <p className="text-lg text-gray-700 mb-8">
          Welcome to Signal Vase - Your Gateway to Informed Trading!
          <br /> At Signal Vase, we believe in empowering individuals to navigate
          the complex world of trading with confidence and security.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Support Signal Vase</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you find Signal Vase valuable and would like to support us, you can contribute by sending ETH to our MetaMask wallet address:
            <br />
            <strong>MetaMask Wallet Address:</strong> 0xa14E189aB649421466435Ed79C0a2B711b71e679
          </p>
        </div>

        {/* Add a section about ERCH funding challenges */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Support the Development of Ethereal Cash (ERCH) And Mobile App</h2>
          <p className="text-lg text-gray-700 mb-4">
            We want to keep you informed about the development of ERCH and Signal Vase mobile application. Currently, progress is hindered due to limited funds. The immobility in {"ERCH's"} development is a direct result of financial constraints.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Your support can make a significant difference. By contributing to Signal Vase, you are not only supporting the platform itself but also helping to accelerate the development of ERCH and its mobile app. Together, we can overcome these challenges and continue to innovate in the world of trading.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Signal Vase?</h2>
          <ul className="list-disc list-inside">
            <li className="mb-2">Diverse Signal Providers</li>
            <p className="text-lg text-gray-700 mb-4">
              {`    Signal Vase brings together a diverse community of signal providers, each with their unique trading strategies and expertise. We understand that every trader is different, and that's why we provide you with the flexibility to choose from a variety of signals tailored to your preferences and risk tolerance.`}
            </p>
            <li className="mb-2">Transparent Reviews</li>
            <p className="text-lg text-gray-700 mb-4">
              {`       We understand the importance of trust in the trading community. Signal Vase allows users to provide genuine reviews of signal providers, creating a transparent environment where traders can make informed decisions based on real experiences.         `}{" "}
            </p>
            <li className="mb-2">Scam Protection</li>
            <p className="text-lg text-gray-700 mb-4">
              {`        Our primary goal is to shield users from scams prevalent on social media platforms. Signal Vase is a secure space designed to eliminate the risks associated with unreliable signals, providing you with a trustworthy platform to enhance your trading journey.       `}{" "}
            </p>
            <li className="mb-2">{`EtherealCash Integration (Under Development!)`}</li>
            <p className="text-lg text-gray-700 mb-4">
              {`  To facilitate seamless transactions between signal providers and followers, Signal Vase introduces EtherealCash, a digital currency exclusive to our platform. Users can buy and sell signals using EtherealCash, ensuring a convenient and secure payment system.    `}{" "}
            </p>
          </ul>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          {`    Whether you're a seasoned trader looking to share your expertise or a newcomer seeking reliable signals, Signal Vase welcomes you to a community driven by trust, transparency, and innovation. Together, let's redefine the trading landscape and ensure that every trader gets what they deserve.`}{" "}
        </p>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you have any questions, feedback, or inquiries, please feel free to reach out to us <strong>contact@signalvase.com</strong>
            . We value your input and look forward to hearing from you.
          </p>
          {/* Add your contact details or a contact form here */}
        </div>
        <p className="text-lg text-gray-700">
          {`          Signal Vase - Trading with Trust, Trading with Signal Vase.`}
        </p>
      </div>
    </div>
  );
};

export default About;
