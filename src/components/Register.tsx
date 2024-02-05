import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "./ui/use-toast";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const navigate = useNavigate();
  const {toast} = useToast();

  const registerMutation = useMutation({
    mutationFn: (user: {
      username: string;
      email: string;
      password1: string;
      password2: string;
    }) => {
      return axiosInstance.post("/api/register/", user);
    },
  });

  const handleRegister = async () => {
    await registerMutation.mutateAsync(
      {
        username,
        email,
        password1,
        password2,
      },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Created User Successfully!",
          })
          navigate({ to: "/" });
        },
        onError: (error) => {
          console.error(`Error registering: ${error.message}`);
        },
      },
    );
  };

  return (
    <div className="flex flex-col h-screen w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="mb-4 py-2">
          <span className="font-semibold text-slate-700 text-2xl">
            Register
          </span>
        </div>
        <div className="flex flex-col space-y-4 mb-6">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-1/4 bg-slate-700 hover:bg-slate-600"
          onClick={handleRegister}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
