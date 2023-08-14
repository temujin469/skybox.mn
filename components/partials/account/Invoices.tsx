import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableInvoices from './modules/TableInvoices';
import OrdersTap from './modules/order/OrdersTab';

const Invoices = ()=>{
  return (
    <section className="ps-my-account ps-page--account">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <AccountMenuSidebar />
          </div>
          <div className="col-lg-8">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__header">
                  <h3>Захиалга</h3>
                </div>
                <div className="ps-section__content">
                  <TableInvoices />
                  {/* <OrdersTap/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Invoices;
