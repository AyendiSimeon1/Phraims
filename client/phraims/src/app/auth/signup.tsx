import React, { useState } from 'react';

const Signup = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleInputChange = (event:any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }

    return(
        <div className="container">
            <p>Sign Up</p>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type='text'
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
               <button type='submit'>Sign Up</button> 
            </form>
        </div>
    )
}