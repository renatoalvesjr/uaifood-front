import { LoginForm } from "@/app/login/login-form";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-md p-4">
        <LoginForm />
      </div>
    </div>
  );
}
