import React, { useContext } from 'react';

import UserContext from '@/contexts/authContext';
import useRepoAccess from '@/hooks/useRepoAccess';

const RepoConnectorButton = () => {
  // Use the custom hook to check if the user has access to any repos
  const repos = useRepoAccess();
  const user = useContext(UserContext);

  // early return if user is not authenticated
  if (!user.isAuthenticated) {
    return null;
  }

  if (user.isAuthenticated && repos.length > 0) {
    return null;
  }

  // If the user does not have access to any repos, ask them to connect
  return (
    <a
      target="_blank"
      href={`https://github.com/apps/gaac-github-as-a-cdn/installations/new/permissions?target_id=${user.id}`}
      rel="noreferrer"
      className="my-4 items-center justify-center self-start whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Connect to a Github Repo
    </a>
  );
};

export default RepoConnectorButton;
