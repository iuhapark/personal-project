'use client';

const SERVER = 'http://localhost:8080'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LinkButton, { linkButtonTitles } from '@/app/atoms/button/LinkButton';
import Link from "next/link";
import { destroyCookie, parseCookies } from 'nookies';
import { useDispatch } from 'react-redux';
import { logout } from '../../user/service/user-service';


const pages = ['COUTER', 'USERS', 'BOARDS', 'POSTS'];
const settings = ['Profile', 'Account', 'Cart', 'Logout'];

function Header() {
  const router = useRouter();
  const dispatch = useDispatch()
  const [showProfile, setShowProfile] = useState(false)

  useEffect(()=>{
    if(parseCookies().accessToken){
      setShowProfile(true)
    }else{
      setShowProfile(false)
    }
  },[parseCookies().accessToken])

  const logoutHandler = () => {
    console.log('로그아웃 적용 전 : ' + parseCookies().accessToken)
    dispatch(logout())
      .then((res: any) => {
        destroyCookie(null, 'accessToken')
        setShowProfile(false)
        router.push('/pages/users/login')
      })
      .catch((err: any) => {
        console.log('로그아웃 실행에서 에러가 발생함 : '+err)
      })
    }

  return (
    <nav className="bg-white border-gray-200 dark:bg-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">peàr</span>
        </Link>
        {!showProfile && <button type="button" className="flex text-sm dark:bg-black rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-black" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
        </button>}
        {showProfile &&
          <div className="flex px-4 py-3 float-end">
            <span className="block text-sm text-gray-900 dark:text-white">Juha Park</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400 mx-5">juha@gmail.com</span>
            <span 
            onClick={logoutHandler}
            className="block text-sm  text-gray-500 truncate dark:text-gray-400"><a href="#">Logout</a>  </span>
          </div>
        }
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-gray-700">
            {linkButtonTitles.map((item) => (
              <li key={item.id}>
                <LinkButton id={0} title={item.title} path={item.path} />
              </li>
            ))}

          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;