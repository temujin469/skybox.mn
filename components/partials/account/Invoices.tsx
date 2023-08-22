import React from "react";
import OrdersTap from "./modules/order/OrdersTab";
import AccountLayout from "~/components/layouts/AccountLayout";

const Invoices = () => {
  return (
    <AccountLayout title="Захиалга">
      <OrdersTap />
    </AccountLayout>
  );
};

export default Invoices;
