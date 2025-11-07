"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return <button type="reset" onClick={handleBackClick}>Voltar</button>;
};

export default BackButton;
