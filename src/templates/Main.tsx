import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareStackIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Fragment, useContext } from 'react';

import ConnectGithubButton from '@/components/ConnectGithubButton';
import RepoConnector from '@/components/RepoConnectorNavbar';
import UserContext from '@/contexts/authContext';
import { AppConfig } from '@/utils/AppConfig';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const user = useContext(UserContext);

  const solutions = [
    {
      name: 'Manage Your Repo',
      description:
        "Manage which public Github repository's should be used with GaaC.",
      href: `https://github.com/apps/gaac-github-as-a-cdn/installations/new/permissions?target_id=${user.id}`,
      icon: ArrowPathRoundedSquareIcon,
    },

    {
      name: 'About',
      description:
        'Learn more about GaaC and how it works. Also, find out how to contribute.',
      href: 'https://github.com/toughyear/gaac',
      icon: AcademicCapIcon,
    },
    {
      name: 'Connect',
      description:
        'Find me on Twitter, Github, or LinkedIn. I would love to hear from you!',
      href: 'https://twitter.com/toughyear',
      icon: () => (
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="ml-2 h-8 w-8 cursor-pointer fill-indigo-500"
        >
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}
      <div className="mx-auto font-mono">
        <Popover className="sticky top-0 z-10 bg-white/50 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between border-b-2 border-gray-100 py-6 md:flex-row md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href="/" className="flex items-end text-gray-700">
                  <span className="sr-only">GaaC: Github as a CDN</span>
                  <ArrowUpOnSquareStackIcon className="h-8 " />
                  <span className="text-lg">
                    <span className="text-xl  text-indigo-600">Gaac:</span>{' '}
                    Github As a CDN
                  </span>
                </Link>
              </div>
              <Link
                href="/uploads"
                className="order-last text-base font-medium text-gray-700 hover:text-gray-900 md:order-none"
              >
                Search Uploads
              </Link>
              <div className=" my-2 flex flex-1 items-center justify-end md:my-auto lg:w-0">
                {!user.isAuthenticated ? (
                  <ConnectGithubButton />
                ) : (
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-900' : 'text-gray-500',
                            'group inline-flex items-center rounded-md  text-base font-medium hover:text-gray-900 focus:outline-none'
                          )}
                        >
                          <span className="mr-2 text-indigo-600 underline underline-offset-8">
                            {user.login} / <RepoConnector />
                          </span>
                          <img
                            src={user.avatar_url}
                            alt={user.login}
                            className="h-8 w-8 rounded-full border-2 border-indigo-500"
                          />
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-gray-600' : 'text-gray-400',
                              'ml-2 h-5 w-5 group-hover:text-gray-500'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {solutions.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                                    rel="noreferrer"
                                  >
                                    <item.icon
                                      className="h-6 w-6 shrink-0 text-indigo-600"
                                      aria-hidden="true"
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                              <div className="space-y-6 bg-gray-50 p-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                <button
                                  className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                  onClick={() => {
                                    localStorage.removeItem('gaacOAuthToken');
                                    // redirect to home page
                                    window.location.href = '/';
                                  }}
                                >
                                  Log out
                                </button>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </Popover>
        <div className="py-5 text-xl">{props.children}</div>
        <div className="flex items-center justify-center border-t border-gray-300 py-8 text-center text-sm">
          MIT License · © {new Date().getFullYear()} · {AppConfig.site_name} -{' '}
          {AppConfig.title} - Connect on
          <a
            href="https://twitter.com/toughyear"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="ml-2 h-5 w-5 cursor-pointer fill-slate-400 hover:fill-indigo-500"
            >
              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export { Main };
