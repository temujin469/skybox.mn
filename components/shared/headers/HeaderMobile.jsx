import React, { Component } from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';

class HeaderMobile extends Component {
    constructor({ props }) {
        super(props);
    }

    render() {
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
                    placeholder="Ямар нэг зүйл хайх..."
                  />
                  <button>
                    <i className="icon-magnifier"></i>
                  </button>
                </div>
              </form>
            </div>
          </header>
        );
    }
}

export default HeaderMobile;
