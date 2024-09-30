import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

const Header = () => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className='w-full relative h-16 bg-gray-400 border-b border-red-200 px-5 flex justify-between items-center'>
        <div className='flex justify-start gap-20 items-center'>
          <h1 className='text-3xl text-white-400 '>Medi Locator</h1>
        </div>
        <div className='hidden md:flex justify-center items-center'>
          <ul className='flex gap-8 text-white text-2xl'>
            <li>
              <Link to='/' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Home</Link>
            </li>
            <li>
              <Link to='/about' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">About</Link>
            </li>
            <li>
              <Link to='/work' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Work</Link>
            </li>
            <li>
              <Link to='/contact' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">Contact</Link>
            </li>
          </ul>
        </div>
        <div className='md:hidden flex items-center'>
          {dropdown ? (
            <IoMdClose
              className='text-white text-3xl cursor-pointer'
              onClick={() => setDropdown(false)}
            />
          ) : (
            <FaBars
              className='text-white text-3xl cursor-pointer'
              onClick={() => setDropdown(true)}
            />
          )}
        </div>
      </div>
      {dropdown && (
        <div className='w-full bg-gray-400 flex flex-col items-center md:hidden'>
          <ul className='flex flex-col gap-4 text-white text-2xl'>
            <li>
              <Link to='/' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>Home</Link>
            </li>
            <li>
              <Link to='/about' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>About</Link>
            </li>
            <li>
              <Link to='/Work' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>Work</Link>
            </li>
            <li>
              <Link to='/contact' className="hover:text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg" onClick={() => setDropdown(false)}>Contact</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
