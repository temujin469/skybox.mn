import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import '/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '/public/static/css/bootstrap.min.css';
import '/public/static/css/slick.min.css';
import '/scss/style.scss';
import '/scss/home-default.scss';
import '/scss/market-place-1.scss';
import '/scss/market-place-2.scss';
import '/scss/market-place-3.scss';
import '/scss/market-place-4.scss';
import '/scss/electronic.scss';
import '/scss/furniture.scss';
import '/scss/organic.scss';
import '/scss/technology.scss';
import '/scss/autopart.scss';
import '/scss/electronic.scss';
import Head from 'next/head';
import MasterLayout from '~/components/layouts/MasterLayout';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '~/store/store';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import theme from '~/chakra/theme';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTimeout(function () {
      document?.getElementById('__next')?.classList.add('loaded');
    }, 100);
    window.scroll({top:0,behavior:"smooth"})
  });

  // const { store, props } = wrapper.useWrappedStore(rest);
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Martfury - React eCommerce Template</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="author" content="nouthemes" />
        <meta
          name="keywords"
          content="Martfury, React, eCommerce, Template"
        />
        <meta
          name="description"
          content="Martfury - React eCommerce Template"
        />

      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} >

          <Hydrate state={pageProps.dehydratedState}>
            <Provider store={store}>
              <CookiesProvider>
                <MasterLayout>
                  <Component {...pageProps} />
                </MasterLayout>
              </CookiesProvider>
            </Provider>
          </Hydrate>
        </ChakraProvider>

      </QueryClientProvider>
      {/* </ReactQueryProvider> */}
    </>
  );
}
export default App;
// export default wrapper.withRedux(App);
