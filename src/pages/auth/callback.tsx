// we will read the code from the query string and use it to get the access token
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function CallbackHandler() {
  const router = useRouter();
  const { code } = router.query;

  // make api call to /api/token-exchange and pass the code
  const tokenFetcher = async () => {
    const response = await fetch(`/api/token-exchange?code=${code}`);
    const data = await response.json();
    // store the access token in local storage
    localStorage.setItem('gaacOAuthToken', data.accessToken);
    // redirect to home page
    router.push('/');
  };

  useEffect(() => {
    if (code) {
      tokenFetcher();
    }
  }, [code]);

  return (
    <div className="flex h-screen items-center justify-center">
      redirecting...
    </div>
  );
}

export default CallbackHandler;
