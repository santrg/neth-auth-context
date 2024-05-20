"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      try {
        const res = await fetch(`/api/register`, {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          headers: { "Content-Type": "application/jsom" },
        });
        const resjson = await res.json()
        if (res.ok){
          router.push("/frontend/newuser")
        }else{
          alert(resjson.message)
          console.log(resjson.message)
        }
      } catch (error) {
        console.log("error")
      }
    }
  };

  return (
    <>
      <div className=" m-20 my-4 bg-slate-900 justify-center items-center">
        <h1 className="flex justify-center  p-4 ">Register page</h1>
      </div>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block ">Email</label>
          <input
            type="email"
            className=" rounded-md text-black p-2"
            {...register("email", {
              required: {
                value: true,
                message: "email is required!",
              },
            })}
          />
          {errors.email && (
            <span className="flex bg-red-700 ">This field is required</span>
          )}
          <label className="block ">Password</label>
          <input
            type="password"
            className="block rounded-md text-black p-2"
            {...register("password", {
              required: {
                value: true,
                message: "password is required!",
              },
            })}
          />
          {errors.password && (
            <span className="flex bg-red-700 ">This field is required</span>
          )}
          <label className="block ">Confirm Password</label>
          <input
            type="password"
            className="block rounded-md text-black p-2"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "confirm password is required!",
              },
            })}
          />
          {errors.password && (
            <span className="flex bg-red-700 ">This field is required</span>
          )}
          <button className="bg-blue-800 w-full rounded-md p-2 my-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
