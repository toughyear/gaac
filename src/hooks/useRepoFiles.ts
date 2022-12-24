import { useEffect, useState } from 'react';

import useSelectedRepo from './useSelectedRepo';

export type GithubFile = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
};

const useRepoFiles = (path: string) => {
  const [files, setFiles] = useState<Array<GithubFile>>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const repo = useSelectedRepo();

  useEffect(() => {
    // Get the Bearer token from localStorage
    const token = localStorage.getItem('gaacOAuthToken');

    async function fetchFiles() {
      const response = await fetch(
        `https://api.github.com/repos/${repo?.full_name}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setFiles(data);
    }

    if (repo) {
      fetchFiles();
    }
  }, [repo, path, refreshTrigger]);

  // this function can be called from another component to trigger the fetch
  const refreshFiles = () => {
    setRefreshTrigger((prevTrigger) => prevTrigger + 1);
  };

  return { files, refreshFiles };
};

export default useRepoFiles;
