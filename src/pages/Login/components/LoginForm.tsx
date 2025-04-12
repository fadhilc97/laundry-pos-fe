import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginForm() {
  const { handleSubmit, register, onSubmit, errors, postLogin } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="mt-1"
          autoComplete="off"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="mt-1"
          autoComplete="off"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={postLogin.isPending} className="w-full">
        {postLogin.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
