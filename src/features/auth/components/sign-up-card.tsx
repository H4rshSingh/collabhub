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

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(password, " ", confirmPassword)
        if(password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setPending(true)
        signIn("password", { email, password, flow: "signUp" })
            .catch(() => {
                setError("Something went wrong!")
            })
            .finally(() => {
                setPending(false)
            })
    }

    const onProviderSignIn = (value : "github" | "google") => {
        signIn(value)
    }

    return (
        <Card className="h-full w-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Sign up to continue
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
                <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
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
                    <div >
                        <Label htmlFor="password">Password</Label>
                        <Input
                            disabled={pending}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            required
                            id="password"
                        />
                        <span className="text-xs  text-muted-foreground">Password must include number and special character </span>
                    </div>
                    <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            disabled={pending}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                            type="password"
                            required
                            id="confirmPassword"
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
                        onClick={() => { onProviderSignIn("google") }}
                        className="w-full relative"
                        size="lg"
                        disabled={pending}
                    >
                        <FcGoogle className="size-5 absolute  left-2.5" />
                        Continue with Google
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => { onProviderSignIn("github")}}
                        className="w-full relative"
                        size="lg"
                        disabled={pending}
                    >
                        <FaGithub className="size-5 absolute  left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground ">
                    Already have an account?&nbsp;
                    <span
                        onClick={() => { setState("signIn") }} className="text-sky-700 hover:underline cursor-pointer"
                    >
                        Sign in
                    </span>
                </p>
            </CardContent>
        </Card>
    )
}