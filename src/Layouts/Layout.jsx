import { useEffect } from 'react'
import Navbar from '../Pages/Navbar'
import TopBar from '../Components/TopBar';

const Layout = ({children}) => {



  return (
    <div className='relative h-screen w-full bg-[#D9EAFD] font-sans'>
      <TopBar/>
      <div className='absolute w-full bg-[url(/bg.webp)] bg-cover h-full'>
          <Navbar/>
          {children}
      </div>
    </div>
  )
}

export default Layout