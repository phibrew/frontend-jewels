import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='h-[10%] px-10 sticky flex justify-between items-center text-white 
    bg-white shadow-md z-60 top-0'>
        <Link to={"/"}> 
        <div className='flex justify-between gap-5 items-center'>
            <h1
            className="text-black text-4xl sm:text-3xl"
            >
              THE KIPU JEWELS
            </h1>
        </div> </Link>
        <div className='flex text-black justify-between items-center gap-10'> 
            {<div className='flex gap-5'>
              <Link to={"/"}>JEWELRY</Link>
              <Link to={"/"}>EARRINGS</Link>
              <Link to={"/"}>RINGS</Link>
              <Link to={"/"}>NECKLACES</Link>
              <Link to={"/"}>BRACELETS</Link> 
        </div>}
        </div>
    </div>
  )
}

export default Navbar