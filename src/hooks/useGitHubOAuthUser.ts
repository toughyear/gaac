import { useEffect, useState } from 'react';

import { defaultUser } from '@/contexts/authContext';

export const isOnClient = typeof window !== 'undefined';
export const isOnServer = typeof window === 'undefined';

function useGitHubOAuthTokenValidity() {
  const [user, setUser] = useState(defaultUser);

  const storedToken = isOnClient
    ? localStorage.getItem('gaacOAuthToken')
    : null;

  const fetchGithubUserData = (token: string) => {
    fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Bad credentials') {
          setUser({ ...defaultUser });
        } else {
          setUser({
            avatar_url: data.avatar_url,
            email: data.email,
            login: data.login,
            name: data.name,
            id: data.id,
            isAuthenticated: true,
          });
        }
      })
      .catch(() => {
        setUser({ ...defaultUser });
      });
  };

  useEffect(() => {
    if (storedToken) {
      fetchGithubUserData(storedToken);
    }
  }, [storedToken]);

  // setup an event listener that calls the same function whenever visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (storedToken) {
          fetchGithubUserData(storedToken);
        }
      }
    };

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
      false
    );

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [storedToken]);

  return user;
}
export default useGitHubOAuthTokenValidity;
