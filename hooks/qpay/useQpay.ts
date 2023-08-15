import axios from "axios";
import { useState } from "react";

// ====Types ====//
type GetTokenResponse = {
  refresh_expires_in: number;
  refresh_token: string;
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

type createIvoiceParameter = {
  // required //
  access_token: string;
  invoice_description: string;
  amount: number;
  invoice_receiver_code: string;
  callback_url: string;

  // not required //
  maximum_amount?: number;
  note?: string;
  enable_expiry?: boolean;
  invoice_receiverdata?: {
    register: string;
    name: string;
    email: string;
    phone: string;
  };
  lines?: {
    tax_product_code: string;
    line_description: string;
    line_quantity: string;
    line_unit_price: string;
    note: string;
  }[];
};
// ====Types end ====//

const useQpay = () => {
  const QPAY_API = "https://merchant.qpay.mn/v2";

  const [accessToken, setAccesToken] = useState<null | string>(null);
  const [refreshToken, setRefreshToken] = useState<null | string>(null);

  const getAccessToken = async () => {
    const config = {
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Basic TVVOS0hfREFBVEdBTDptRE1taGRWMw==",
        // Cookie:
        //   "qpay_merchant_openapi.sid=s%3A51aUHQEumCxXscllaxssBl8YKjBFfXjh.8KGoEfUN%2F%2BW%2F15EC82mu0lVdLDnxPsn91saK5TUHBTs",
        // "content-Type": "application/json",
        Accept: "*/*",
        // cookie: document.cookie
      },
    };

    const response = await axios.post<GetTokenResponse>(
      `${QPAY_API}/auth/token`,
      null,
      config
    );
    const data = response.data;
    setAccesToken(data.access_token);
    setRefreshToken(data.refresh_token);
    return data;
  };

  // === create invoice ====//
  const createInvoice = async (parameter: createIvoiceParameter) => {
    const invoiceBody = {
      invoice_code: "GZTEST_INVOICE",
      sender_invoice_no: "1234567",
      invoice_receiver_code: "terminal",
      invoice_description: "test",
      sender_branch_code: "SALBAR1",
      amount: 100,
      callback_url: "https://bd5492c3ee85.ngrok.io/payments?payment_id=1234567",
      // invoice_code: "TEST_INVOICE",
      // sender_invoice_no: "123455678",
      // invoice_receiver_code: parameter.invoice_receiver_code,
      // sender_branch_code: "BRANCH1",
      // invoice_description: parameter.invoice_description,
      // enable_expiry: "false",
      // allow_partial: false,
      // minimum_amount: null,
      // allow_exceed: false,
      // maximum_amount: null,
      // amount: parameter.amount,
      // callback_url:
      //   "https://bd5492c3ee85.ngrok.io/payments?payment_id=12345678",
      // sender_staff_code: "online",
      // note: null,
      // invoice_receiver_data: {
      //   register: "UZ96021105",
      //   name: "Ganzul",
      //   email: "test@gmail.com",
      //   phone: "88614450",
      // },
      // lines: [
      //   {
      //     tax_product_code: "6401",
      //     line_description: " Order No1311 200.00 .",
      //     line_quantity: "1.00",
      //     line_unit_price: "200.00",
      //     note: "-.",
      //     discounts: [
      //       {
      //         discount_code: "NONE",
      //         description: " discounts",
      //         amount: 10,
      //         note: " discounts",
      //       },
      //     ],
      //     surcharges: [
      //       {
      //         surcharge_code: "NONE",
      //         description: "Хүргэлтийн зардал",
      //         amount: 10,
      //         note: " Хүргэлт",
      //       },
      //     ],
      //     taxes: [
      //       {
      //         tax_code: "VAT",
      //         description: "НӨАТ",
      //         amount: 20,
      //         note: " НӨАТ",
      //       },
      //     ],
      //   },
      // ],
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Cookie:
        //   "qpay_merchant_openapi.sid=s%3A4Hgsx_I-DZ0dVwXU4WevpIb86JMzhrdC.Jk08AIs6IjZuyFIj0RqUAKyymYuxR8PDGjWdxwrARSA",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
      },
    };

    const response = await axios.post(
      `${QPAY_API}/invoice`,
      invoiceBody,
      config
    );

    const data = response.data;
    console.log("invoise response ==>", data);
    return data;
  };
  // === create invoice end ====//

  const getPayment = async (paymentId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get(`${QPAY_API}/payment${paymentId}`, config);
    const data = response.data;
    return data;
  };

  const checkPayment = async (invoiceId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const body = {
      objectType: "INVOICE",
      object_id: invoiceId,
      offset: {
        page_number: 1,
        page_limit: 100,
      },
    };
    const response = await axios.post(`${QPAY_API}/payment`, body, config);
    const data = response.data;
    return data;
  };

  return { refreshToken, accessToken, getAccessToken, createInvoice,checkPayment,getPayment };
};

export default useQpay;
