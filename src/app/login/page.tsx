import React from 'react';
import LoginForm from './_components/LoginForm';
import { FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
import calendarIllustration from '@/assets/LoginIllustrator.png';

const Page = () => {
    return (
        <main className='min-h-screen bg-slate-50 flex flex-col items-center lg:items-stretch md:pt-0 pt-16 gap-6 lg:gap-0 lg:flex-row'>
            <div className='w-full lg:w-1/2 flex flex-col md:flex-row lg:flex-col justify-center md:justify-between items-center md:items-start gap-2 md:gap-0 md:bg-blue-800 md:py-16 md:px-10 lg:px-16 lg:py-14'>
                <div>
                    <div className='flex items-center justify-center md:justify-start gap-2'>
                        <span className='p-2 bg-blue-800 rounded-xl text-white md:text-blue-700 md:bg-white' ><FiCalendar size="24" /></span>
                        <h2 className='font-bold text-2xl text-black md:text-white'>  Office<span className='text-blue-800 md:text-white '>Desk</span></h2>
                    </div>
                    <p className='hidden md:block lg:hidden text-xl text-white font-bold mt-10'>Plan your week. Check in. Done</p>
                </div>

                <Image
                    src={calendarIllustration}
                    alt=""
                    className='hidden md:block w-80 lg:w-5xl h-auto'
                />

                <p className='hidden lg:block text-5xl text-white font-bold'>Plan your week.<br/> Check in.<br/> Done</p>

                <p className='hidden lg:block text-white/70 text-sm'>&copy; 2026 Impel IT Solutions Ltd.</p>
            </div>
            <div className='md:-mt-16 lg:mt-0 lg:w-1/2 lg:flex lg:items-center lg:justify-center'>
                <LoginForm />
            </div>
            <p className='lg:hidden text-gray-500 text-sm mt-4 mb-8'>&copy; 2026 Impel IT Solutions Ltd.</p>
        </main>
    );
};

export default Page;