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

    return (
        <h1></h1>
    )



}

export default Signup;