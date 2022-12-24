import { useState } from 'react';
import { toast } from 'react-toastify';

import type { GithubFile } from './useRepoFiles';
import useSelectedRepo from './useSelectedRepo';

const useDeleteGithubFile = () => {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const repo = useSelectedRepo();

  const handleDeleteFromGitHub = async (file: GithubFile) => {
    if (typeof window === 'undefined') {
      return;
    }

    setDeleteInProgress(true);

    const accessToken = localStorage.getItem('gaacOAuthToken');
    const repoFullName = repo?.full_name;
    const commitMessage = `Deleted file with name ${file.name}`;
    const committer = {
      name: 'GaaCBot',
      email: 'noreply@gaac.vercel.app',
    };

    try {
      const requestUrl = `https://api.github.com/repos/${repoFullName}/contents/${file.path}`;
      const requestMethod = 'DELETE';
      const requestHeaders = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      };
      const requestBody = {
        message: commitMessage,
        sha: file.sha,
        committer,
      };

      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // create a toast
      toast.success(`File ${file.name} deleted successfully`, {
        theme: 'light',
        position: 'top-right',
      });
    } catch (error) {
      toast.error((error as any).message, {
        theme: 'light',
        position: 'top-right',
      });
    } finally {
      setDeleteInProgress(false);
    }
  };

  return { handleDeleteFromGitHub, deleteInProgress };
};

export default useDeleteGithubFile;
