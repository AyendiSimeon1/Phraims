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
        <div className="bg-white">
            <div className="m-5 bg-gray-300 rounded-lg p-5">
        <h1 className="p-5 text-3xl text-slate-900">Phraims</h1>
        <h2 className="p-5 text-3xl text-slate-900">Welcome to <br />Phraims</h2>
        <p>Gaze and attention modelling powered by AI is optimizing virtual reality experiences</p>

        
        <input className="rounded-full"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            placeholder="Email"
        />


        <input className="rounded-full" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            placeholder="Password"
        />
        </div>
        <button className="rounded-full bg-yellow-300">Sign up</button>
        </div>
        
    )



}

export default Signup;