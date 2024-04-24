import React from 'react';
import { useState } from 'react';
import axios from 'axios';


interface FormData  {
    email: string;
    password: string;

}

const  home: React.FC = () => {
    const [ formData, setFormData ] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSubmit = () => {
        console.log('It was submitte')

    }

    return(
       <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label> 
        <input
            value={formData.email}
            type='text'
            id='email'
            name='email'
            onChange={handleChange}
        />
        <label htmlFor='password'>Password:</label> 
        <input
            value={formData.password}
            type='text'
            id='password'
            name='password'
            onChange={handleChange}
        />
        <button type='submit'>Sign Up</button>
       </form>
    )
}
exports.default = home;