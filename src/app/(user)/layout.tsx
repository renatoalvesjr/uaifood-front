import { TopMenu } from "@/components/top-menu";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopMenu />
      {children}
    </>
  );
}
