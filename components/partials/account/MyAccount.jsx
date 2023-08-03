import React, { Component } from 'react';
import Link from 'next/link';

class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className="ps-section__left">
                                <aside className="ps-widget--account-dashboard">
                                    <div className="ps-widget__header">
                                        <img src="/static/img/users/3.jpg" />
                                        <figure>
                                            <figcaption>Hello</figcaption>
                                            <p>username@gmail.com</p>
                                        </figure>
                                    </div>
                                    <div className="ps-widget__content">
                                        <ul>
                                            <li className="active">
                                                <Link href="/account/my-account">
                                                    <p>Dashboard</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/account/my-account">
                                                    <p>Orders</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/account/my-account">
                                                    <p>Addresses</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/account/my-account">
                                                    <p>Account Details</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/account/my-account">
                                                    <p>Logout</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="ps-page__content">
                                <div className="ps-page__dashboard">
                                    <p>
                                        Hello <strong>user@gmail.com</strong>!
                                    </p>
                                    <p>
                                        From your account dashboard you can view
                                        your{' '}
                                        <Link href="/account/orders">
                                            <p>recent orders</p>
                                        </Link>
                                        , manage your{' '}
                                        <Link href="/account/user-information">
                                            <p>
                                                shipping and billing addresses
                                            </p>
                                        </Link>
                                        , and{' '}
                                        <Link href="/account/user-information">
                                            <p>
                                                edit your password and account
                                                details
                                            </p>
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default MyAccount;
