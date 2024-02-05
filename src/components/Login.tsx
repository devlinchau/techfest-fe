import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance, nameAtom } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "./ui/use-toast";
import { useSetAtom } from "jotai";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setName = useSetAtom(nameAtom);

  const navigate = useNavigate();
  const { toast } = useToast();
  const loginMutation = useMutation({
    mutationFn: (user: {
      username: string;
      password: string;
    }) => {
      return axiosInstance.post("/api/login/", user);
    },
  });

  const handleLogin = async () => {
    await loginMutation.mutateAsync(
      {
        username,
        password,
      },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Logged In Successfully!",
          });
          navigate({ to: "/chat" });
          setName(username);
        },
        onError: (error) => {
          alert(`${error.message}: Invalid Credentials!`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-screen w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="mb-4 py-2">
          <span className="font-semibold text-slate-700 text-2xl">
            Login
          </span>
        </div>
        <div className="flex flex-col space-y-4 mb-6">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-1/4 bg-slate-700 hover:bg-slate-600"
          onClick={handleLogin}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
