import {
  AdjustmentsHorizontalIcon,
  BoltIcon,
  CommandLineIcon,
} from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';

import ConnectGithubButton from '@/components/ConnectGithubButton';
import FileUploader from '@/components/FileUploader';
import RepoConnectorButton from '@/components/RepoConnectorButton';
import UserContext from '@/contexts/authContext';
import useRepoAccess from '@/hooks/useRepoAccess';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const user = useContext(UserContext);

  const repos = useRepoAccess();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <Main
      meta={
        <Meta
          title="Github as a CDN"
          description="A simple way to use Github as a CDN. Store your images/static files in a Github repository and use them in your projects."
        />
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col px-4 sm:px-6 md:flex-row">
          <div className="flex flex-col items-center md:mr-10 md:w-1/2">
            <img src="/assets/images/mascot.png" alt="GaaC Mascot" />
            <p className="inline bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-500 bg-clip-text text-xl tracking-tight text-transparent">
              A secure UI layer for uploading files to Github
            </p>
          </div>
          <div className="flex flex-col md:w-1/2">
            <p className="inline bg-gradient-to-r from-indigo-600 via-sky-400 to-indigo-500 bg-clip-text text-5xl tracking-tight text-transparent">
              Use GitHub as a CDN
            </p>
            <p className="mt-3 text-2xl tracking-tight text-slate-400">
              Store your images/static files in a public Github repository and
              use them in blogs, websites, apps, etc.
            </p>

            <ConnectGithubButton className="my-4 ml-0 self-start" />
            <RepoConnectorButton />
            <FileUploader />
          </div>
        </div>
        <hr className="my-10" />
        <div>
          <h1 className="bg-gradient-to-r from-indigo-600 via-sky-400 to-indigo-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Use GitHub as a CDN
          </h1>
          <p className="mt-3 max-w-2xl text-lg tracking-tight text-slate-400">
            Managing images when writing blogs, websites, apps, etc. is a pain.
            GaaC makes it easy for you. Just connect to your public Github
            repository and start uploading files.
          </p>
          <ul
            role="list"
            className="mx-auto mt-8 grid  grid-cols-1 gap-6 text-sm sm:grid-cols-4 md:gap-y-10"
          >
            <li className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-semibold text-indigo-600">
                <CommandLineIcon className="mr-2 inline h-8 text-indigo-500" />
                No Commits
              </h3>
              <p className="mt-2 text-gray-700">
                Just upload your files and use them. No need to create commit.
              </p>
            </li>
            <li className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-semibold text-indigo-600">
                <BoltIcon className="mr-2 inline h-8 text-indigo-500" />
                Reliable, Fast & Free
              </h3>
              <p className="mt-2 text-gray-700">
                Uses the same infrastructure as GitHub, so it&apos;s fast,
                reliable, and easy to use.
              </p>
            </li>
            <li className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-semibold text-indigo-600">
                <AdjustmentsHorizontalIcon className="mr-2 inline h-8 text-indigo-500" />
                Extensible
              </h3>
              <p className="mt-2 text-gray-700">
                Create directory structure on fly using filename structure:
                <strong> foo_directory/bar.pdf</strong>
              </p>
            </li>
            <li className="rounded-2xl border border-gray-200 p-4">
              <h3 className="font-semibold text-indigo-600">
                <AdjustmentsHorizontalIcon className="mr-2 inline h-8 text-indigo-500" />
                Open Source
              </h3>
              <p className="mt-2 text-gray-700">
                Deploy your own instance of GaaC on Vercel or any other
                platform.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Main>
  );
};

export default Index;
