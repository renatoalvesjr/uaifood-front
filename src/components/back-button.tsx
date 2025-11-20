"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackButton = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return <Button type="reset" onClick={handleBackClick}>Voltar</Button>;
};

export default BackButton;
