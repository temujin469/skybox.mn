import { Button, Heading, useToast } from '@chakra-ui/react';
import { Form, Input, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '~/store/auth/authSlice';
import type { AppDispatch, RootState } from '~/store/store';

function Register() {
  const dispatch: AppDispatch = useDispatch()


  const router = useRouter()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  )

  const toast = useToast();

  useEffect(() => {
    if (isError) {
      const id = '#1'
      if (!toast.isActive(id)) {
        toast({
          id: id,
          title: `Алдаа гарлаа`,
          description: message,
          status: 'error',
          variant: "subtle",
          isClosable: true,
        });
      }

      // console.log("err",message)
    }

    if (isSuccess) {
      const id = '#2'
      if (!toast.isActive(id)) {
        toast({
          id: id,
          title: "Амжилттай нэвтэрлээ",
          variant: "subtle",
          isClosable: true,
        });
      }

      router.push("/")
    }

    dispatch(reset())

  }, [isError, isSuccess, dispatch])

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
                      message: "Имэйл хаягаа оруулна уу!",
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
              <div className="form-group submit">
                <button type="submit" className="ps-btn ps-btn--fullwidth">
                  Бүртгүүлэх
                  <Spin className='pl-10' spinning={isLoading} />
                </button>
              </div>
            </div>
            <div className="ps-form__footer">
              <p className='mb-2'>Сошиал хаягаар нэвтрэх</p>
              <div className='flex gap-[10px]'>
                <a className='flex-[1]' href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/facebook`}>
                  <Button size="lg" w="full" color="facebook.400">
                    <FaFacebook size={28} />
                  </Button>
                </a>
                <a className="flex-[1]" href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`}>
                  <Button size="lg" w="full">
                    <FcGoogle size={28} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
