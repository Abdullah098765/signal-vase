import React from "react";
import Card from "./reuseable/Card";
import tradingSignalsImage from "../../public/trading_signals_sharing.webp"; // replace with actual image paths
import investmentOpportunitiesImage from "../../public/investment_opportunities.jpg";
import marketInsightsImage from "../../public/market_insights.jpg";
import communityEngagementImage from "../../public/community_engagement.jpg";
import educationalResourcesImage from "../../public/educational_resources.jpg";
import secureTransactionsImage from "../../public/secure_transactions.jpg";
import tradingsignalreviewsystem from "../../public/tradingsignalreviewsystem.jpg";
import experiencesecuretransactions from "../../public/experiencesecuretransactions.jpeg";
import socialnetworkingimage from "../../public/socialnetworkingimage.png";
import backgroundImage from "../../public/starsbg.png";

const Features = () => {
  const cards = [
    {
      image: tradingSignalsImage,
      title: "Trading signals sharing",
      description:
        "Connect with traders to share and receive signals for crypto, stocks, gold, and more.",
    },
    {
      image: tradingsignalreviewsystem,
      title: "Review and rating system",
      description:
        "Empower your trading decisions with reliable signal providers reviews and rating.",
    },
    {
      image: experiencesecuretransactions,
      title: "Ethical cryptocurrency transactions",
      description: "Experience secure transactions with EtherealCash (ERCH).",
    },
    {
      image: investmentOpportunitiesImage,
      title: "Investment opportunities",
      description:
        "Explore innovative ways to invest in Signal Vase using EtherealCash.",
    },

    {
      image: marketInsightsImage,
      title: "Market insights",
      description:
        "Access valuable insights into market trends and trading strategies.",
    },
    {
      image: socialnetworkingimage,
      title: "Social networking for traders",
      description: "Connect and collaborate with fellow traders effortlessly.",
    },
    {
      image: communityEngagementImage,
      title: "Community engagement",
      description:
        "Connect, interact, and collaborate with a diverse community of traders.",
    },
    {
      image: educationalResourcesImage,
      title: "Educational resources",
      description:
        "Access a wealth of educational materials to enhance your trading knowledge.",
    },
  ];

  return (
    <div
      id="feature"
      className="p-8 items-center justify-center flex flex-col overflow-x-hidden pt-[6rem]"
    >
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-orange-500">Our Features</h2>
        <h1 className="text-2xl font-bold">
          Empowering Your Trading Experience
        </h1>
        <p>
          {
            "Explore the innovative features that make Signal Vase the ultimate platform for traders and investors. Whether you're sharing signals or following experts, our tools are designed to help you succeed in the dynamic world of trading."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:w-[80%] w-full">
        {cards.map((cardData, index) => (
          <Card key={index} cardData={cardData} />
        ))}
      </div>
    </div>
  );
};

export default Features;
