import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import UserContext from '@/contexts/authContext';
import useGitHubOAuthTokenValidity from '@/hooks/useGitHubOAuthUser';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const user = useGitHubOAuthTokenValidity();

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
      <ToastContainer />
    </UserContext.Provider>
  );
};

export default MyApp;
