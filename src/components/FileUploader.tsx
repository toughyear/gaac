import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useSelectedRepo from '@/hooks/useSelectedRepo';

const FileUploader = () => {
  // store image as a base64 string
  const [image, setImage] = useState<string | null>(null);

  // store image name
  const [imageName, setImageName] = useState<string | null>(null);

  // store file type
  const [fileType, setFileType] = useState<string | null>(null);

  // store if overwriting file is allowed
  const [allowOverwrite, setAllowOverwrite] = useState(true);

  // store commit in progress state
  const [commitInProgress, setCommitInProgress] = useState(false);
  // store file upload progress state
  const [uploadInProgress, setUploadInProgress] = useState(false);

  const repo = useSelectedRepo();

  const updateFilesToState = (files: FileList | null | undefined) => {
    if (files === null || files === undefined) {
      return;
    }
    // Get the first file
    const file = files[0];
    // early return if no file
    if (!file) {
      return;
    }

    // store as base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // abstract the base64 string
      const base64 = reader?.result?.toString().split(',')[1];
      // store in state
      setImage(base64 ?? null);

      // store the file name
      setImageName(file.name);

      // store the file type
      setFileType(file.type);
    };
  };

  const hasAllPermissions = () => {
    // if no user is logged in, toast an error
    if (!localStorage.getItem('gaacOAuthToken')) {
      toast.error('Please login first');
      return false;
    }

    // if no repo is selected, toast an error
    if (!repo) {
      toast.error('Please select a repo first');
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Validate permissions
    if (!hasAllPermissions()) {
      return;
    }

    setUploadInProgress(true);

    // Get the dropped files
    const { files } = e.dataTransfer;
    updateFilesToState(files);

    setUploadInProgress(false);
  };

  const handleClick = () => {
    if (typeof window === 'undefined') {
      return;
    }

    // Validate permissions
    if (!hasAllPermissions()) {
      return;
    }

    document.getElementById('uploader-input')?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setUploadInProgress(true);
    // Get the dropped files
    updateFilesToState(files);
    setUploadInProgress(false);
  };

  const handlePaste = (e: ClipboardEvent) => {
    // Prevent the default paste behavior
    e.preventDefault();

    // Validate permissions
    if (!hasAllPermissions()) {
      return;
    }

    setUploadInProgress(true);

    // Get the clipboard data
    const { clipboardData } = e;

    // Get the dropped files
    const { files } = clipboardData ?? {};

    updateFilesToState(files);

    setUploadInProgress(false);
  };

  const handleCommitToGitHub = async () => {
    if (typeof window === 'undefined') {
      return;
    }

    setCommitInProgress(true);

    const accessToken = localStorage.getItem('gaacOAuthToken');
    const repoFullName = repo?.full_name;
    const commitMessage = `Uploaded ${imageName} via GAAC`;
    const committer = {
      name: 'GaaCBot',
      email: 'noreply@gaac.vercel.app',
    };

    try {
      let fileSha: string | undefined;

      let uploadedContentUrl: string | undefined;

      const requestUrl = `https://api.github.com/repos/${repoFullName}/contents/uploads/${imageName}`;
      let requestMethod = 'PUT';
      const requestHeaders = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      };
      let requestBody = {
        message: commitMessage,
        content: image,
        committer,
        sha: fileSha,
      };

      const responseWithoutSha = await fetch(requestUrl, {
        method: requestMethod,
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });

      if (!responseWithoutSha.ok && responseWithoutSha.status !== 422) {
        const error = await responseWithoutSha.json();
        throw new Error(error.message);
      }

      if (responseWithoutSha.status === 422) {
        // File already exists, so retrieve the SHA and try to overwrite it
        if (!allowOverwrite) {
          throw new Error(
            'File already exists. Please enable overwrite to replace the file.'
          );
        }

        // get the file sha by making a GET request
        const responseForSha = await fetch(requestUrl, {
          method: 'GET',
          headers: requestHeaders,
        });

        if (!responseForSha.ok) {
          const error = await responseForSha.json();
          throw new Error(error.message);
        }

        const data = await responseForSha.json();
        fileSha = data.sha;

        requestMethod = 'PUT';
        requestBody = {
          message: commitMessage,
          content: image,
          committer,
          sha: fileSha,
        };

        const responseWithSha = await fetch(requestUrl, {
          method: requestMethod,
          headers: requestHeaders,
          body: JSON.stringify(requestBody),
        });

        if (!responseWithSha.ok) {
          const error = await responseWithSha.json();
          throw new Error(error.message);
        }

        const dataWithSha = await responseWithSha.json();

        uploadedContentUrl = dataWithSha.content.download_url;
      }

      // if ok, get the download url

      if (responseWithoutSha.ok && !uploadedContentUrl) {
        const data = await responseWithoutSha.json();
        uploadedContentUrl = data.content.download_url;
      }

      // copy to clipboard
      navigator.clipboard.writeText(uploadedContentUrl as string);

      // create a toast
      toast.success(
        `File ${
          responseWithoutSha.ok ? 'uploaded' : 'updated'
        } successfully. Link copied to clipboard.`,
        {
          theme: 'light',
          position: 'top-right',
        }
      );

      // reset the state
      setImage(null);
      setImageName(null);
      setFileType(null);
    } catch (error) {
      toast.error((error as any).message, {
        theme: 'light',
        position: 'top-right',
      });
    } finally {
      setCommitInProgress(false);
    }
  };

  // useEffect hook to set a listener on the document for the paste event
  useEffect(() => {
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div>
      {!image && (
        <div
          id="dropzone"
          className="relative my-10 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-600 text-center"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleClick}
        >
          <div className="text-lg text-gray-600">
            Drop a file or click to upload
          </div>
          <div className="text-lg text-gray-600">-----------</div>
          <div className="text-lg text-gray-600">
            press{' '}
            <span className="rounded bg-indigo-600 px-2 py-1 text-sm text-white">
              {' '}
              cmd
            </span>
            {' + '}
            <span className="rounded bg-indigo-600 p-1 text-sm text-white">
              v
            </span>{' '}
            to paste
          </div>
          <input
            type="file"
            name="uploader"
            id="uploader-input"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      )}

      {uploadInProgress && (
        <div className="text-center text-gray-600">reading file...</div>
      )}
      {/* display name if image uploaded */}
      {imageName && (
        <div className="my-2 flex">
          <textarea
            value={imageName}
            className="mr-2 w-full rounded-md border border-gray-400 px-2 py-1 text-sm focus:border-indigo-600 focus:outline-none"
            onChange={(e) => setImageName(e.target.value)}
          />
          <button
            className="flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={handleCommitToGitHub}
          >
            Upload to Github{' '}
            {commitInProgress && (
              <svg
                className="ml-2 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      )}
      {imageName && (
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="allow-overwrite"
              name="allow-overwrite"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={(e) => setAllowOverwrite(e.target.checked)}
              checked={allowOverwrite}
            />
          </div>
          <div
            className="ml-3 select-none text-sm"
            onClick={() => setAllowOverwrite(!allowOverwrite)}
          >
            <label className="font-medium text-gray-700">
              overwrite file if exists
            </label>
          </div>
        </div>
      )}
      {/* this component will show the uploaded image */}
      {image && (
        <>
          {fileType === 'image/png' && (
            <img src={`data:image/png;base64,${image}`} alt="uploaded" />
          )}
          <button
            className="mt-2  items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={() => {
              setImage(null);
              setImageName('');
              setFileType('');
            }}
          >
            Reset upload
          </button>
        </>
      )}
    </div>
  );
};

export default FileUploader;
