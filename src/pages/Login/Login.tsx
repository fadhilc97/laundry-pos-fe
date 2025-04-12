import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center p-4 justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
