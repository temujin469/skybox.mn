import React, { useState } from 'react';
import Link from 'next/link';
import MobileHeaderActions from './modules/MobileHeaderActions';
import { useRouter } from 'next/router';
  
const  HeaderMobile = ()=> {
  const router = useRouter()
  const [keyword, setKeyword] = useState<string | undefined>(router.query.keyword as string);

  const searchUrl = `/shop?keyword=${keyword}`

  function handleSubmit(e: any) {
    e.preventDefault();
    router.push(searchUrl)
  }

    return (
      <header className="header header--mobile">
        {/* <div className="header__top">
                    <div className="header__left">
                        <p>Welcome to Martfury Online Shopping Store !</p>
                    </div>
                    <div className="header__right">
                        <ul className="navigation__extra">
                            <li>
                                <Link href="/vendor/become-p-vendor">
                                    <p>Sell on Martfury</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/order-tracking">
                                    <p>Tract your order</p>
                                </Link>
                            </li>
                            <li>
                                <CurrencyDropdown />
                            </li>
                            <li>
                                <LanguageSwicher />
                            </li>
                        </ul>
                    </div>
                </div> */}
        <div className="navigation--mobile">
          <div className="navigation__left">
            <Link href="/">
              <div
                className="ps-logo"
                style={{
                  width: "150px",
                }}
              >
                <img src="/static/img/logo_light.png" alt="martfury" />
              </div>
            </Link>
          </div>
          <MobileHeaderActions />
        </div>
        <div className="ps-search--mobile">
          <form className="ps-form--search-mobile" action="/" method="get">
            <div className="form-group--nest">
              <input
                className="form-control"
                type="text"
                value={keyword}
                onChange={(e)=>setKeyword(e.target.value)}
                placeholder="Ямар нэг зүйл хайх..."
              />
              <button onClick={handleSubmit}>
                <i className="icon-magnifier"></i>
              </button>
            </div>
          </form>
        </div>
      </header>
    );
}

export default HeaderMobile;
