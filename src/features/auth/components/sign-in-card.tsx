import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { SignInFlow } from "../types"
import { useState } from "react"
import { Label } from "@/components/ui/label"

import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true)
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {
                setError("Invalid email or password")
            })
            .finally(() => {
                setPending(false)
            })
    }

    const onProviderSignIn = (value: "github" | "google") => {
        setPending(true)    
        signIn(value)
            .finally(() => {
                setPending(false)
            })
    }

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to continue
                </CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {!!error && <div className="bg-destructive/15 p-3 rounded-md flex items-center fap-x-2 text-sm text text-destructive mb-6">
                <TriangleAlert className="size-4 mr-2" />
                {error}
            </div>}
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5" onSubmit={onPasswordSignIn}>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            disabled={pending}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            disabled={pending}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        variant={"outline"}
                        className="w-full relative"
                        size="lg"
                        disabled={pending}
                        onClick={() => { onProviderSignIn("google") }}
                    >
                        <FcGoogle className="size-5 absolute  left-2.5" />
                        Continue with Google
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => { onProviderSignIn("github") }}
                        className="w-full relative"
                        size="lg"
                        disabled={pending}
                    >
                        <FaGithub className="size-5 absolute  left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground ">
                    Don&apos;t have an account?&nbsp;
                    <span
                        onClick={() => { setState("signUp") }} className="text-sky-700 hover:underline cursor-pointer"
                    >
                        Sign up
                    </span>
                </p>
            </CardContent>
        </Card>
    )
}