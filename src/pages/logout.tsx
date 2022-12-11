import React from 'react';

function Logout() {
  // use effect hook that clears the local storage and redirects to the home page
  React.useEffect(() => {
    // clean gaacOAuthToken from local storage
    localStorage.removeItem('gaacOAuthToken');
    // redirect to home page
    window.location.href = '/';
  }, []);

  return <div>logging you out.</div>;
}

export default Logout;
