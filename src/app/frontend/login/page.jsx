"use client";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Component from "@/components/Component";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { data: session, status } = useSession();

  const onSubmit = async (data) => {
    event.preventDefault();
    const resNextAuth = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log("resNextAuth", resNextAuth);
    if (resNextAuth.error) {
      alert(resNextAuth.error);
    } else {
      router.push("/frontend/dashboard");
    }
  };
  return (
    <>
      <div className=" m-20 my-4 bg-blue-900 justify-center items-center">
        <h1 className="flex justify-center  p-4 ">Login Page </h1>
        <>
          {status === "authenticated" ? (
            <p className="flex justify-center font-light ">
              Current user: {" " + session.user.email}
            </p>
          ) : (
            <p className="flex justify-center font-light ">
              {" "}
              Sign in for access to Dashboard or register{" "}
            </p>
          )}
        </>
      </div>
      <div className="flex h-screen justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            placeholder="jsmith@login.com"
            className="w-full rounded-md text-black p-3"
            {...register("email", { required: true })}
          />
          {errors.emailRequired && (
            <span className="bg-red-500 p-2">Email is required</span>
          )}

          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            placeholder="****"
            className="w-full rounded-md text-black p-3"
            {...register("password", { required: true })}
          />
          {errors.passwordRequired && (
            <span className="bg-red-500 p-2">Password is required</span>
          )}
          <button
            type="submit"
            className="w-full bg-blue-700 my-4 p-3 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
