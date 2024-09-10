import { useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import api from '../../api/api';



const LoginView = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData ] = useState({
        email: '',
        password: '',
    })

    const handleInputChange = (e) => {
        const { name , value } = e.target;
        setLoginData({
            ...loginData, [name] : value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await api.post('/auth/login', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.status === 200) {
                const { token } = response.data
                localStorage.setItem('token' , token)

                setLoginData({
                    email: '',
                    password: '',
                });


                navigate('/dashboard');
                
            } else {
                
                console.error('Login failed:', response.data);
                
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
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input 
                                name="email"
                                type="text"
                                value={loginData.email}
                                onChange={handleInputChange}
                                required
                                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <NavLink to={"/forget-password"} className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</NavLink>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input 
                                name="password"
                                type="text"
                                value={loginData.password}
                                onChange={handleInputChange}
                                required
                                className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <Link to={"/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign Up Now!</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginView