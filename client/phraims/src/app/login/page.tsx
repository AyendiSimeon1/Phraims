import React from 'react';
import { useState } from 'react';
import axios from 'axios';

interface FormData  {
    username: string;
    password: string;
    id: string;

}


const  home: React.FC = () => {

    const [ formData, setFormData ] = useState<FormData>({
        username: '',
        password: '',
        id: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSubmit = () => {
        console.log('It was submitte')


    }

    return(
       <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label> 
        <input
            value={formData.username}
            type='text'
            id='username'
            name='username'
            onChange={handleChange}
        />
       </form>
    )
}
exports.default = home;