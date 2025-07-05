import { FaPinterestSquare } from "react-icons/fa"
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import useAuthStore from "../store/AuthStore";

function TopBar() {
    const { user } = useAuthStore();
    return (
        <>
            <div className={`bg-white text-black text-center px-10 h-[10%] w-full z-50 
                flex justify-between items-center`}>
                <div className="flex gap-4">
                    <a href="https://in.pinterest.com/kipujewellery" target="_blank" rel="noopener noreferrer">
                        <FaPinterestSquare className="text-2xl hover:text-blue-600 transition-colors duration-300" />
                    </a>
                    <a href="https://www.instagram.com/kipujewellery/" target="_blank" rel="noopener noreferrer">
                        <FaSquareInstagram className="text-2xl hover:text-pink-600 transition-colors duration-300" />
                    </a>
                    <a href="https://wa.me/918284819125" target="_blank" rel="noopener noreferrer">
                        <FaSquareWhatsapp className="text-2xl hover:text-green-600 transition-colors duration-300" />
                    </a>
                </div>
                <div className="flex gap-4 items-center">
                    {user ? "": (
                        <a href="/signin" className="hover:text-blue-500 transition-colors duration-300">
                            <CiUser className="text-2xl" />
                        </a>
                    )
                    }   
                    {user?.role === "admin" && 
                        <a href="/admin/add-product" className="hover:text-blue-500 transition-colors duration-300">
                            <IoAddSharp className="text-2xl border rounded-md"/>
                        </a>
                    }
                    <a href="/" className="hover:text-blue-500 transition-colors text-2xl duration-300">
                        Whishlist
                        <IoIosHeartEmpty className="inline-block ml-1" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default TopBar;