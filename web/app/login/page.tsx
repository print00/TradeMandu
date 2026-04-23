import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_35%),linear-gradient(180deg,_rgb(245,247,251),_rgb(233,238,246))] px-4">
      <LoginForm />
    </main>
  );
}

