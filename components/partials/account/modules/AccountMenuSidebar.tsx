import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store/store';
import { useRouter } from 'next/router';
import useUserInfo from '~/apiCall/strapi/useUserInfo';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '~/store/auth/authSlice';
import { useToast } from '@chakra-ui/react';



const AccountMenuSidebar = () =>{

  const { token } = useSelector((state: RootState) => state.auth);

  const { data: user, isLoading } = useUserInfo({ variables: { jwt: token! } });
  const toast = useToast()
  
    const router = useRouter()
  const path = router.pathname.split('/')[2];

  const dispatch:AppDispatch  = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title:"Амжилттай гарлаа",
      status:"success",
      isClosable: true,
    })
    router.push("/")
  };


  const accountLinks = [
    {
      text: "Хэрэглэгчийн мэдээлэл",
      url: "/account/user-information",
      icon: "icon-user",
      active: path === "user-information"
    },
   
    {
      text: "Захиалга",
      url: "/account/invoices",
      icon: "icon-papers",
      active: path === "invoices"

    },
    {
      text: "Хаяг",
      url: "/account/addresses",
      icon: "icon-map-marker",
      active: path === "addresses"
    },
    // {
    //     text: 'Саяхан үзсэн бүтээгдэхүүн',
    //     url: '/account/recent-viewed-product',
    //     icon: 'icon-store',
    // },
    {
      text: "Хүслийн жагсаалт",
      url: "/account/wishlist",
      icon: "icon-heart",
      active: path === "wishlist"
    },
  ];

    return (
      <aside className="ps-widget--account-dashboard">
        <div className="ps-widget__header">
          <img src="/static/img/users/defaultUser.png" />
          <figure>
            <figcaption>{user?.username}</figcaption>
            <p>{user?.email}</p>
          </figure>
        </div>
        <div className="ps-widget__content rounded-md">
          <ul>
            {accountLinks.map((link) => (
              <li key={link.text} className={link.active ? "active" : ""}>
                <Link href={link.url}>
                    <i className={link.icon}></i>
                    {link.text}
                </Link>
              </li>
            ))}
            <li>
              <a className="cursor-pointer" onClick={handleLogout}>
                <p className='flex gap-2'>
                  <FiLogOut />
                  <p>Системээс гарах</p>
                </p>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    );
}

export default AccountMenuSidebar;
