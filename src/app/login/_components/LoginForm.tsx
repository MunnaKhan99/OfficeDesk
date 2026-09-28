import React from 'react';
import { FiEye, FiLock, FiUser } from "react-icons/fi";

const LoginForm = () => {
    return (
        <div className='bg-white md:max-w-xl  text-black p-8 rounded-2xl shadow-sm'>
            <h1 className='mb-2 font-bold text-2xl'>Welcome Back</h1>
            <p className=' text-sm text-gray-400'>Sign in to continue</p>
            <form className="mt-4">
                <div className='mb-4'>
                    <label
                        className="text-lg font-bold text-[#1F2937]"
                        htmlFor="email-input">Email or Phone</label>
                    <div className="relative">
                        <span className='absolute top-1/2 text-gray-400 -translate-y-1/2 left-3 '><FiUser size={22} /></span>
                        <input
                            className="w-full rounded-md pl-10 py-2 border border-gray-400"
                            id="email-input"
                            placeholder='name@impelitsoltions.com'
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="text-lg font-bold text-[#1F2937]"
                        htmlFor="password-input">password</label>
                    <div className="relative">
                        <span className='absolute top-1/2 text-gray-400 -translate-y-1/2 left-3 '><FiLock size={22} /></span>
                        <input
                            className="w-full  rounded-md pl-10 py-2 border border-gray-400 pr-10"
                            id="password-input"
                            type="password"
                            placeholder='Enter you password'
                        />

                        <span className='absolute top-1/2 text-gray-600 -translate-y-1/2 right-3'>< FiEye /></span>
                    </div>

                </div>
                <div className='mb-4 flex py-2 justify-between'>
                    <div className='flex items-center gap-2'>
                        <input
                            id="remember-me"
                            type="checkbox" />
                        <label
                            className='text-[#5B6272]'
                            htmlFor="remember-me">Remember me</label>
                    </div>

                    <a
                        className='text-blue-600 font-bold'
                        href="">Forgot password?</a>
                </div>
                <button
                    className='w-full text-center text-white font-bold bg-blue-800 rounded-lg py-2'
                >Sign In</button>

                <p className='text-[#5B6272]'>Having trouble? <a className='underline text-blue-600 font-bold' href="">Contact your admin.</a></p>
            </form>
        </div>
    );
};

export default LoginForm;