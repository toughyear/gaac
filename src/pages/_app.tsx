import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';

import UserContext from '@/contexts/authContext';
import useGitHubOAuthTokenValidity from '@/hooks/useGitHubOAuthUser';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const user = useGitHubOAuthTokenValidity();

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={'https://www.googletagmanager.com/gtag/js?id=G-B02P0W3YVQ'}
      />

      <Script id="ga-script" strategy="lazyOnload">
        {`  
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-B02P0W3YVQ');`}
      </Script>
      <UserContext.Provider value={user}>
        <Component {...pageProps} />
        <ToastContainer />
      </UserContext.Provider>
    </>
  );
};

export default MyApp;
