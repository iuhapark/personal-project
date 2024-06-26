"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";

type Inputs = {
  question: string;
  exampleRequired?: string;
};

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("input content : " + JSON.stringify(data));
    fetch("http://localhost:8080/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.answer))
      .catch((error) => console.log("error:", error));
  };
  console.log(watch("question")); //모니터링, 상태 값이 변하면 찍어줌

  return (
    <div>
      <div>
        {/* <video
          className="w-full font-semibold max-h-[80vh] object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="" type="video/mp4" />
        </video> */}
        <img
          className="w-full font-semibold max-h-[80vh] object-cover pointer-events-none"
          src="/img/video-call.jpeg"
        />
        <div className="video-overlay">
          <h1 className="text-white bg-black">
            지금, 로메이트에게 물어보세요. <br />
            Your Legal Solution, One Message Away.
          </h1>
        </div>
      </div>
      <div
        className="fixed bottom-0 h-[22vh] z-50 rounded-t-2xl transition-all duration-300 p-3 w-full bg-white dark:bg-black"
        style={{ position: "fixed", bottom: "0", left: "0", right: "0" }}
      >
        <div className="mx-auto max-w-[100vh] flex items-center justify-between gap-4">
          <h4>{message ? message : ""}</h4>
          <form
            className="flex w-full items-center mt-1 shadow-none gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("question", { required: true })}
              className="flex-grow px-5 py-3 rounded-3xl font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              placeholder="Message here"
            />
            <button type="submit">Send</button>
          </form>
          {errors.question && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>
    </div>
  );
}
