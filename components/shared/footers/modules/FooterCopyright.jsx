import React from 'react';

const FooterCopyright = () => (
  <div className="ps-footer__copyright">
    <p>&copy; Skybox Online Shop | Powered by © OT Commerce</p>
    <p>
      {/* <span>We Using Safe Payment For:</span> */}
      <a href="#">
        <img src="/static/img/payment-method/golomt.png" alt="Martfury" className='h-[33px]' />
      </a>
      <a href="#">
        <img src="/static/img/payment-method/qpay.png" alt="Martfury" className='h-[33px]' />
      </a>
    </p>
  </div>
);

export default FooterCopyright;
