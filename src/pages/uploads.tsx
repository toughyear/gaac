import { XCircleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import StatusBox, { Status } from '@/components/StatusBox';
import UserContext from '@/contexts/authContext';
import useDeleteGithubFile from '@/hooks/useDeleteGithubFile';
import type { GithubFile } from '@/hooks/useRepoFiles';
import useRepoFiles from '@/hooks/useRepoFiles';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

function getPathParts(path: string) {
  // Split the path by the '/' character to get an array of the different parts
  return path.split('/');
}

function Uploads() {
  const user = useContext(UserContext);
  // Add a state variable for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // update hovered file state
  const [hoveredFile, setHoveredFile] = useState<GithubFile | null>(null);

  // Get the router instance from the useRouter hook
  const router = useRouter();

  // Parse the query string using the URLSearchParams class
  const searchParams = new URLSearchParams(router.query as any);

  // Get the path from the query string
  const path = searchParams.get('path') || 'uploads';

  // Use the path in the hook to fetch the files from the repository
  const { files, refreshFiles } = useRepoFiles(path);

  const { deleteInProgress, handleDeleteFromGitHub } = useDeleteGithubFile();

  // Get the path parts using the getPathParts function
  const pathParts = getPathParts(path);

  // copy to clipboard when clicked
  const copyFileNameToClipboard = (fileUrl: string) => {
    navigator.clipboard.writeText(fileUrl);
    toast.success('Copied to clipboard');
  };

  // Create the breadcrumb navigation using the path parts
  const breadcrumbNavigation = (
    <nav className="flex w-full flex-col items-center justify-between md:flex-row">
      <ol className="flex w-full md:w-auto">
        <p className="mr-2 text-gray-500">looking for files in: </p>
        {pathParts.map((part, index) => (
          // Create a link to the path of the current subdirectory
          <li key={part} className="mr-2">
            <Link
              href={`/uploads?path=${pathParts.slice(0, index + 1).join('/')}`}
              className="border-indigo-500 text-indigo-500 hover:border-b-2 hover:text-indigo-600"
            >
              {part} /
            </Link>
          </li>
        ))}
      </ol>
      <form className="mb-4 w-full self-end md:w-auto">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="my-2 rounded-md border border-gray-300 px-2 text-base focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 active:outline-none"
        />
      </form>
    </nav>
  );

  return (
    <Main
      meta={
        <Meta
          title="Github as a CDN"
          description="A simple way to use Github as a CDN. Store your images/static files in a Github repository and use them in your projects."
        />
      }
    >
      <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6">
        {!user.isAuthenticated && (
          <StatusBox
            status={Status.info}
            text="You are not connected to Github. Network requests will fail."
          />
        )}
        {/* Render the breadcrumb navigation */}
        {breadcrumbNavigation}

        <StatusBox
          status={Status.info}
          text="Tip: Click to copy the URL. Hover over an image file to see a preview."
        />

        <div className="mt-10 flex flex-wrap text-base text-gray-600">
          <div className="h-24 w-full  cursor-pointer overflow-auto md:h-auto md:w-1/2">
            {files?.map((file) => {
              // Check if the file name matches the search query
              if (file.name.toLowerCase().includes(searchQuery)) {
                if (file.type === 'dir') {
                  return (
                    <p key={file.name} className="mb-1 bg-slate-200/60">
                      <Link
                        href={`/uploads?path=${path}/${file.name}`}
                        className="border-indigo-500 text-indigo-500 hover:border-b-2 hover:text-indigo-600"
                      >
                        {file.name} /
                      </Link>
                    </p>
                  );
                }
                return (
                  <p
                    className={`mb-1  bg-slate-100/30 ${
                      deleteInProgress &&
                      hoveredFile?.name === file.name &&
                      'animate-pulse bg-red-100/30 text-red-400'
                    }`}
                    key={file.name}
                    onMouseEnter={() => setHoveredFile(file)}
                    onClick={() => copyFileNameToClipboard(file.download_url)}
                  >
                    <XCircleIcon
                      className="mr-2 inline-block h-4 w-4 text-gray-500 hover:text-indigo-500"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handleDeleteFromGitHub(file);
                        refreshFiles();
                      }}
                    />
                    {file.name}
                  </p>
                );
              }
              // If the file name does not match the search query, don't display the file
              return null;
            })}
          </div>
          <div className="flex w-full items-center justify-center md:w-1/2">
            {/* if hovered file ends with .png | .jpg | .jpeg | .gif | .svg, display it */}
            {hoveredFile?.name.match(/\.(jpeg|jpg|gif|png|svg|webp)$/) && (
              <img
                src={hoveredFile.download_url}
                alt={hoveredFile.name}
                className="h-64 cursor-pointer border-4 border-indigo-200 shadow-lg"
                onClick={() => {
                  // redirect to the file url in a new tab
                  window.open(hoveredFile.download_url, '_blank');
                }}
              />
            )}
            {/* if hovered file ends with .mp4 | .webm | .mov, display it */}
            {hoveredFile?.name.match(/\.(mp4|webm|mov)$/) && (
              <video
                src={hoveredFile.download_url}
                className="h-64 cursor-pointer border-4 border-indigo-200 shadow-lg"
                controls
                autoPlay
                muted
                onClick={() => {
                  // redirect to the file url in a new tab
                  window.open(hoveredFile.download_url, '_blank');
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Uploads;
