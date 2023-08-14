import { Heading } from '@chakra-ui/react';
import { Form, Input, Spin, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset,signinWithProvider } from '~/store/auth/authSlice';
import type { AppDispatch, RootState } from '~/store/store';

function Register() {
  const dispatch: AppDispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification();


  const router = useRouter()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (isError) {
      api.error({
        message: `Алдаа гарлаа`,
        // description:"",
        placement:"bottomRight"
      });
      console.log(message)
    }

    if (isSuccess && user && !isLoading && !isError) {
      api.success({
        message: `Амжилттай бүртгэгдлээ`,
        // description:"",
        placement: "bottomRight"
      });
      router.push("/")
    }

    dispatch(reset())
  }, [user, isError, isSuccess, router, dispatch])

  const handleSubmit = (userData: UserBody) => {

    // if (password !== password2) {
    //   toast.error('Passwords do not match')
    // } else {
    //   const userData = {
    //     name,
    //     email,
    //     password,
    //   }

    dispatch(register(userData))
  }


  return (
    <div className="ps-my-account">
      {contextHolder}
      <div className="container">
        <Form className="ps-form--account" onFinish={handleSubmit}>
          <ul className="ps-tab-list">
            <li>
              <Link href="/account/login">
                <Heading color="gray.400">
                  Нэвтрэх
                </Heading>
                </Link>
            </li>
            <li className="active">
              <Link href="/account/register">
                <Heading>
                  Бүртгүүлэх
                </Heading>
                </Link>
            </li>
          </ul>
          <div className="ps-tab active" id="register">
            <div className="ps-form__content">
              <h5>Шинээр бүртгэл үүсгэх</h5>
              <div className="form-group">
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Хэрэглэгчийн нэрээ оруулна уу!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Нэр"
                  />
                </Form.Item>
              </div>
              <div className="form-group">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "ёёёё",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="email"
                    placeholder="Имэйл хаяг"
                  />
                </Form.Item>
              </div>
              <div className="form-group form-forgot">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Нууц үгээ оруулна уу!",
                    },
                    {
                      min:6,
                      message:"Хамгийн багадаа 6 тэмдэгт байх ёстой!"
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="password"
                    placeholder="Нууц үг..."
                  />
                </Form.Item>
              </div>
              <div className="form-group submit">
                <button type="submit" className="ps-btn ps-btn--fullwidth">
                  Бүртгүүлэх
                  <Spin className='pl-10' spinning={isLoading} />
                </button>
              </div>
            </div>
            <div className="ps-form__footer">
              <p>Холбох:</p>
              <ul className="ps-list--social">
                <li>
                  <a className="facebook"  href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/facebook`}>
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="google" href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`}>
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                {/* <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
