"use client";
import ButtonNewImage from "@/components/ButtonNewImage";
import Component from "@/components/Component";
import { useEffect, useState } from "react";

export default function dashboardPage() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const myFn = async () => {
      const res = await fetch(`/api/images`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setImages(data);
    };
    myFn();
  }, []);

  return (
    <div>
      <h1> Dashboard Page</h1>
      <Component />
      <div className="p-2 bg-slate-800">
        <ButtonNewImage />
        
      </div>
      <div className="grid grid-cols-4 ">
        {images.map((image) => (
          <div
            key={image.id}
            className=" bg-pink-950 p-3 m-3 rounded-md justify-center items-center"
          >
            <img src={"/" + image.content} className="h-3/4"></img>
            <p className=" my-5 ">{image.title}</p>
            <div className="flex grid grid-cols-6"> 
              <p className="flex col-span-5">En stock...</p>
              {(image.published) ? <i className="fi fi-br-check"></i> : <i className="fi fi-br-cross"></i>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
