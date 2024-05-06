"use client";
import React, { useEffect } from "react";
import { isMobile , isIOS} from "react-device-detect";

const AndroidRedirect = () => {
  useEffect(() => {
    const redirectToAndroidApp = () => {
      if (isMobile && /Android/i.test(navigator.userAgent)) {
        window.location.href = "android-app://com.bragtime_mobile_app";
      }
    };

    redirectToAndroidApp();
  }, []);

  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
    </div>
  ); // This component doesn't render anything visible
};

export default AndroidRedirect;
