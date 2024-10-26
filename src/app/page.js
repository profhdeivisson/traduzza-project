"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoTraduzza from "../../public/assets/traduzza-logo.svg";
import "../../public/assets/scss/page.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <Image src={logoTraduzza} width={200} alt={"Logo Traduzza"} />
    </div>
  );
}
