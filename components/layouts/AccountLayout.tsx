import React from 'react'
import AccountMenuSidebar from '../partials/account/modules/AccountMenuSidebar'
import { Heading } from '@chakra-ui/react'

function AccountLayout({children,title}:{children:React.ReactNode,title:string}) {
  // const user =useSelector((state:RootState)=>state.auth.user);
  // const isAuth = Boolean(isA)
  return (
    <section className="ps-my-account p-[10px] md:p-0">
    <div className="max-w-[1500px] md:p-[20px] xl:p-[40px] mx-auto">
      <div className="lg:grid grid-cols-12 gap-[20px] xl:gap-[40px]">
        <div className="col-span-4 rounded-md bg-white p-[10px] md:p-[20px] pt-[20px] mb-20 lg:mb-0 h-fit">
          <AccountMenuSidebar  />
        </div>
        <div className="col-span-8 bg-white rounded-md p-[10px] md:p-[20px]">
              <div className="mb-3">
                {title && <Heading>{title}</Heading>}
              </div>
              <div className="ps-section__content">
                {children}
              </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default AccountLayout