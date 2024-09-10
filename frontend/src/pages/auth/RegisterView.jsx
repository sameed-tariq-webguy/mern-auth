import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api';

const RegisterView = () => {
    const navigate = useNavigate();

    const [registrationData, setRegistrationData ] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({
            ...registrationData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post('/auth/register', registrationData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                
                console.log('Registration successful:', response.data);
                setRegistrationData({
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                });

                const { token } = response.data;
                localStorage.setItem('token' , token)

                
                navigate('/dashboard')
                
            } else {
                
                console.error('Registration failed:', response.data);
                
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input id="name"
                                    name="name"
                                    type="text"
                                    value={registrationData.name}
                                    onChange={handleInputChange}
                                    required 
                                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input 
                                 id="email"
                                 name="email"
                                 type="email"
                                 value={registrationData.email}
                                 onChange={handleInputChange}
                                 required
                                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input 
                                id="password"
                                name="password"
                                type="password"
                                value={registrationData.password}
                                onChange={handleInputChange}
                                required
                                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>

                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                value={registrationData.confirm_password}
                                onChange={handleInputChange}
                                required
                                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>

                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?
                        <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign In Now!</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterView