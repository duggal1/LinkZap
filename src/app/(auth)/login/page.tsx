import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingForm } from "./Loader-login/loading";

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
  
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials below to log in to your account.
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Choose a sign-in method below to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingForm />}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}