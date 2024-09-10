import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const Layout = ({children}) => {

    const navigate = useNavigate()

    const handleLogout = () => {
        const token = localStorage.removeItem('token');
        navigate('/login')
    }


  return (
    <>
        <main>
            <section className='flex flex-row'>
                <aside className='lg:flex flex-col basis-72 bg-pink-200 sticky h-screen hidden py-4'>
                    <div className='px-4 mb-6'>
                        <p className='text-xl font-semibold'>Admin Panel</p>
                    </div>
                    <nav className='flex-1'>
                        <ul className='space-y-2'>
                        <li>
                            <Link to='/dashboard' className='block px-4 py-2 text-gray-800 hover:bg-pink-300'>
                            Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to='/users' className='block px-4 py-2 text-gray-800 hover:bg-pink-300'>
                            Users
                            </Link>
                        </li>
                        </ul>
                    </nav>
                </aside>
                <div className='flex flex-col w-full'>
                    <div className='flex w-full'>
                        <header className='min-h-10 p-4 bg-red-300 w-full grow flex items-center'>
                            <span className='grow'>Header</span>
                            <div className='flex gap-x-4 '>
                                <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 text-white px-8 h-10 rounded-lg'>Logout</button>
                                <Link to={'/profile'}>
                                    <div className='w-10 h-10' > 
                                        <img className='rounded-full cursor-pointer' src="https://www.dummyimage.co.uk/?size=60x60&colour=cbcbcb&text-colour=959595&text=&font-size=40" alt="Avator" />
                                    </div>
                                </Link>
                            </div>
                        </header>
                    </div>
                    <div className='flex '>
                        <section className='p-4 w-full'>{children}</section>
                    </div>
                </div>
            </section>
        </main>
    </>
  )
}

export default Layout