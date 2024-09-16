import { LoginForm } from "@/components/auth/Login";

export default function Login({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) {
  const redirectTo = searchParams?.redirect || "/";
  return (
    <div>
      <LoginForm redirectTo={redirectTo} />
    </div>
  );
}
