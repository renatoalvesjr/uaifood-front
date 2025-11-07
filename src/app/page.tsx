export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>UAIFood</div>
      <div className="flex *:border *:p-2 gap-2 *:rounded-lg">
        <a href="/login">Login</a>
        <a href="/register">Registro</a>
      </div>
    </div>
  );
}
