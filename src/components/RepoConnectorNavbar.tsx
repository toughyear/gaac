import React, { useContext } from 'react';

import UserContext from '@/contexts/authContext';
import useRepoAccess from '@/hooks/useRepoAccess';

const RepoConnectorNavbar = () => {
  // Use the custom hook to check if the user has access to any repos
  const repos = useRepoAccess();
  const user = useContext(UserContext);

  // If the user does not have access to any repos, ask them to connect
  if (repos.length === 0) {
    return (
      <a
        target="_blank"
        href={`https://github.com/apps/gaac-github-as-a-cdn/installations/new/permissions?target_id=${user.id}`}
        onClick={(e) => e.stopPropagation()}
        rel="noreferrer"
      >
        [Connect to a Github Repo]
      </a>
    );
  }

  // If the user has access to at least one repo, display the name of the first repo
  return <span>{(repos[0] as any).name}</span>;
};

export default RepoConnectorNavbar;
