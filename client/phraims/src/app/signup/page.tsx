"use client";

import React from "react";
import { useState } from "react";



interface FormData{
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const [ formData, setFormData ] = useState<FormData>({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <div className="bg-white  ">
            <div className="m-6 rounded-lg p-5  bg-gray-300 h-full m-10">
        <h1 className="p-5 text-5xl text-slate-900">Phraims</h1>
        <h2 className="p-5 text-6xl text-slate-900">Welcome to <br />Phraims</h2>
        <p className="p-5 text-xl">Gaze and attention modelling powered by <br /> AI is optimizing virtual reality experiences</p>

        <div className="">
        <input className="rounded-full  pt-4 pb-4 px-3 w-4/5 mx-4 placeholder-p-3 outline-1 outline-gray-200"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            placeholder="Email"
        />

       

        <br />
        <input className="rounded-full pt-4 pb-4 w-4/5 mx-4 mt-5" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            placeholder="Password"
        />
        </div>
        <button className="rounded-full bg-yellow-300 p-5 w-4/5 mt-5 text-white">Sign up</button>
        <p className="text-center mt-4">Or </p>
        <button className="mt-4 rounded-full bg-white border-1px-black text-center items-center p-4 w-4/5">Signup With Google</button>
        <p className="text-center mt-4">Already have an account? <span className="text-slate-500 text-decoration-underline text-center">Login</span></p>                            

        </div>
        <div className="">

            </div>
        </div>
        
    )



}

export default Signup;