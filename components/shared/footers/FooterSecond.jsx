import React from 'react';
import Link from 'next/link';

const FooterSecond = ({ classes }) => (
    <footer className={`ps-footer ps-footer--2 ${classes}`}>
        <div className="container">
            <div className="ps-footer__content">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">
                                        Quick links
                                    </h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/page/blank">
                                                <p>Policy</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <p>Term & Condition</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <p>Shipping</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <p>Return</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/faqs">
                                                <p>FAQs</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Company</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/page/about-us">
                                                <p>About Us</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/product/affiliate">
                                                <p>Affilate</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/blank">
                                                <p>Career</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/page/contact-us">
                                                <p>Contact</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <aside className="widget widget_footer">
                                    <h4 className="widget-title">Bussiness</h4>
                                    <ul className="ps-list--link">
                                        <li>
                                            <Link href="/blog">
                                                <p>Our Press</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/account/checkout">
                                                <p>Checkout</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/account/login">
                                                <p>My account</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/shop">
                                                <p>Shop</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </aside>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-md-6">
                        <aside className="widget widget_newletters">
                            <h4 className="widget-title">Newsletter</h4>
                            <form
                                className="ps-form--newletter"
                                action="#"
                                method="get">
                                <div className="form-group--nest">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Email Address"
                                    />
                                    <button className="ps-btn">
                                        Subscribe
                                    </button>
                                </div>
                                <ul className="ps-list--social">
                                    <li>
                                        <p className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="google-plus" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </p>
                                    </li>
                                    <li>
                                        <p className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </p>
                                    </li>
                                </ul>
                            </form>
                        </aside>
                    </div>
                </div>
            </div>
            <div className="ps-footer__copyright">
                <p>&copy;2021 Martfury. All Rights Reserved</p>
                <div>
                    <span>We Using Safe Payment For:</span>
                    <Link href="/page/blank">
                            <img
                                src="/static/img/payment-method/1.jpg"
                                alt="martfury"
                            />
                    </Link>
                    <Link href="/page/blank">
                            <img
                                src="/static/img/payment-method/2.jpg"
                                alt="martfury"
                            />
                    </Link>
                    <Link href="/page/blank">
                            <img
                                src="/static/img/payment-method/3.jpg"
                                alt="martfury"
                            />
                    </Link>
                    <Link href="/page/blank">
                            <img
                                src="/static/img/payment-method/4.jpg"
                                alt="martfury"
                            />
                    </Link>
                    <Link href="/page/blank">
                            <img
                                src="/static/img/payment-method/5.jpg"
                                alt="martfury"
                            />
                    </Link>
                </div>
            </div>
        </div>
    </footer>
);

export default FooterSecond;
