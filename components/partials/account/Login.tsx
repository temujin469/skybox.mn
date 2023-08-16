import { Heading } from '@chakra-ui/react';
import { Form, Input, Spin, notification } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '~/store/auth/authSlice';
import type { AppDispatch, RootState } from '~/store/store';

function Login() {
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
        placement: "bottomRight"
      });
      console.log(message)
    }

    if (isSuccess && user && !isLoading && !isError) {
      router.push("/")
      api.success({
        message: `Амжилттай нэвтэрлээ`,
        // description:"",
        placement: "bottomRight"
      });
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

    dispatch(login(userData))
  }



  return (
    <div className="ps-my-account">
      {contextHolder}
      <div className="container">
        <Form
          className="ps-form--account"
          onFinish={handleSubmit}
        >
          <ul className="ps-tab-list">
            <li className="active">
              <Link href="/account/login">
                <Heading>
                  Нэвтрэх
                </Heading>
              </Link>
            </li>
            <li >
              <Link href="/account/register">
                <Heading color="gray.400">
                  Бүртгүүлэх
                </Heading>
              </Link>
            </li>
          </ul>
          <div className="ps-tab active" id="sign-in">
            <div className="ps-form__content">
              <h5>Өөрийн бүртгэлээр нэвтрэх</h5>
              <div className="form-group">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Имэйл хаягаа оруулна уу!",
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
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
                      min: 6,
                      message: "Хамгийн багадаа 6 тэмдэгт байх ёстой!"
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
              <div className="form-group">
                <div className="ps-checkbox">
                  <input
                    className="form-control"
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                  />
                  <label htmlFor="remember-me">Сануулах</label>
                </div>
              </div>
              <div className="form-group submit">
                <button type="submit" className="ps-btn ps-btn--fullwidth">
                  Нэвтрэх
                  <Spin className='pl-10' spinning={isLoading}/>
                </button>
              </div>
            </div>
            <div className="ps-form__footer">
              <p className='mb-2'>Сошиал хаягаар нэвтрэх</p>
              <ul className="ps-list--social">
                <li>
                  <a className="facebook" href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/facebook`}>
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="google" href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`}>
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                {/* <li>
                  <a
                    className="twitter"
                    href="#"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="instagram"
                    href="#"
                  >
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

export default Login;
