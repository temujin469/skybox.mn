import { useToast } from '@chakra-ui/react';
import { Spin} from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, signinWithProvider } from '~/store/auth/authSlice';
import { AppDispatch, RootState } from '~/store/store';

function Auth() {
  const dispatch: AppDispatch = useDispatch()
const toast = useToast()

  const router = useRouter()

  const { access_token,provider } = router.query;


  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast({
        title: `Алдаа гарлаа`,
        description: message,
        variant: "subtle",
        status: 'error',
        isClosable: true,
      });
    }

    if (isSuccess || user) {
      toast({
        title: "Амжилттай нэвтэрлээ",
        variant: "subtle",
        isClosable: true,
      });
      router.push("/")
    }

    if(access_token){
      dispatch(signinWithProvider({token:access_token as string,provider:provider as string}))
    }

    dispatch(reset())
  }, [isError, isSuccess])
  return (
    <div>
      <Spin/>
    </div>
  );
}

export default Auth;
