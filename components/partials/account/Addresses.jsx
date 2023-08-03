import React, { Component } from "react";
import Link from "next/link";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import FormEditAddress from "./modules/FormEditAddress";

class Addresses extends Component {
  render() {
    return (
      <section className="ps-my-account ps-page--account">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <AccountMenuSidebar />
            </div>
            <div className="col-lg-8">
              <div className="ps-section--account-setting">
                <div className="ps-section__content">
                    <FormEditAddress/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Addresses;
