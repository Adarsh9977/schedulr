'use client'
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInFormData = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Partial<SignInFormData> = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SignInFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("github",{
        redirect: false,
        callbackUrl: '/dashboard'
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      toast.success("Sign in successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to sign in. Please check your credentials.");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg transition-all">
  <CardHeader>
    <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
    <CardDescription className="text-center">
      Sign in to your account to continue
    </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col items-center space-y-4">
    {/* GitHub Sign-In Button */}
    <Button
      type="button"
      onClick={handleSignIn} // Replace with your GitHub sign-in handler
      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-gray-800"
    >
      <Github className="h-5 w-5" /> {/* GitHub Icon */}
      Sign in with GitHub
    </Button>
  </CardContent>
  <CardFooter className="flex justify-center border-t p-4">
    <p className="text-sm text-muted-foreground">
      Don't have an account?{" "}
      <Link href="/auth/signup" className="text-primary font-medium hover:underline">
        Sign up
      </Link>
    </p>
  </CardFooter>
</Card>
  );
};

export default SignInForm;