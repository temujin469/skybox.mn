import { Spin, notification } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, signinWithProvider } from '~/store/auth/authSlice';
import { AppDispatch, RootState } from '~/store/store';

function Auth() {
  const dispatch: AppDispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification();


  const router = useRouter()

  const { access_token,provider } = router.query;


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

    if (isSuccess || user) {
      router.push("/")
    }

    if(access_token){
      dispatch(signinWithProvider({token:access_token as string,provider:provider as string}))
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, router, dispatch])
  return (
    <div>
      {contextHolder}
      <Spin/>
    </div>
  );
}

export default Auth;
