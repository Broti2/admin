import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <div>
      <div className=" w-full h-20 bg-slate-500">
        {' '}
        <ul className='flex justify-between text-slate-100'>
          <li className="text-2xl font-semibold py-5 text-right px-20 transform hover:scale-125">
            <Link href={'/'}>WelCome</Link>
            
          </li>
          <li className="text-2xl font-semibold py-5 text-right px-20 transform hover:scale-125">
            <Link href={'/admin'}>Admin Panel</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
