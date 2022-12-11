import { useEffect, useState } from 'react';

import type { Repo } from './useRepoAccess';
import useRepoAccess from './useRepoAccess';

const useSelectedRepo = (): Repo | null => {
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  // Use the useRepoAccess hook to get the list of repos that the user has access to
  const repos = useRepoAccess();
  useEffect(() => {
    // If the user has access to at least one repo, set the first repo as the selected repo
    if (repos.length > 0 && repos[0]) {
      setSelectedRepo(repos[0]);
    }
  }, [repos]);

  return selectedRepo;
};

export default useSelectedRepo;
