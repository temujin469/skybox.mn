import React, { Component } from "react";
import Link from "next/link";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import FormEditAddress from "./modules/FormEditAddress";
import AccountLayout from "~/components/layouts/AccountLayout";

class Addresses extends Component {
  render() {
    return (
      <AccountLayout title="Хүргэлтийн хаяг">
        <FormEditAddress/>
      </AccountLayout>
    );
  }
}

export default Addresses;
