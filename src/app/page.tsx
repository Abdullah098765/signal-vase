"use client";
import "firebase/auth";
import Head from "next/head.js";
import { useEffect } from "react";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Home() {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();
  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <div className="landing-container w-full h-full border-0">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <iframe
        src="https://signal-vase-landing.vercel.app"
        title="Landing Page"
        className="landing-iframe w-full h-full border-0"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}
