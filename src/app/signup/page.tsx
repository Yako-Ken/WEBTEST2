"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MaxWidthWrapper from "../../components/defaults/MaxWidthWrapper";
import DynamicForm from "../../components/DynamicForm";
import Image from "next/image";
import Logo from "../../components/Logo";
import { buttonVariants } from "../components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchData } from "../actions/Server";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthProvider";
import { IFormField } from "@/types";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";

const imageSchema = z.object({
  url: z.string(),
  fileId: z.string(),
});

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
    image: z.array(imageSchema).optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

const signupArray: IFormField[] = [
  { name: "name", label: "Name", placeholder: "Enter your full name", component: "input" },
  { name: "email", label: "Email", placeholder: "you@example.com", type: "email", component: "input" },
  { name: "password", label: "Password", password: true, placeholder: "••••••••", component: "input" },
  { name: "passwordConfirm", label: "Confirm Password", password: true, placeholder: "••••••••", component: "input" },
  { name: "image", component: "photo", label: "Profile Picture (Optional)" },
];

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  useRedirectIfAuthenticated('/');

  const router = useRouter();
  const { setAuth } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      image: [],
    },
  });

  const onSubmit = async (values: SignupFormValues): Promise<any> => {
    const firstImage = values.image?.[0];

    const bodyObject: Record<string, any> = {
      name: values.name,
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      image: firstImage
        ? { secure_url: firstImage.url, publicId: firstImage.fileId }
        : undefined,
    };

    Object.keys(bodyObject).forEach(key => {
      if (bodyObject[key] === undefined) {
        delete bodyObject[key];
      }
    });

    try {
      const res = await fetchData({
        resourceName: "auth/signup",
        method: "POST",
        body: bodyObject,
      });

      if (res.status === "success" && res.token) {
        setAuth({ accessToken: res.token, user: res.data.user });
        router.push("/");
      }
      
      return res;
    } catch (error: any) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center lg:px-0">
      <MaxWidthWrapper className="flex w-full items-center gap-10">
        <div className="relative hidden h-[80vh] flex-[55%] overflow-hidden rounded-2xl lg:block">
          <Image
            src="/login.jpg"
            fill
            alt="A person working on a laptop"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-[50%] flex-col items-center gap-5">
          <Logo />
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <DynamicForm
            form={form}
            className="flex w-full flex-col gap-5"
            submitText="Sign up"
            onSubmit={onSubmit}
            arrayFields={signupArray}
          />
          <Link
            href="/login"
            className={buttonVariants({
              variant: "link",
              className: "self-center gap-1.5",
            })}
          >
            Already have an account? Sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SignupPage;
