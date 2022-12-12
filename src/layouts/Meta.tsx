import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { AppConfig } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gaac: Github As a CDN" />
        <meta
          property="og:description"
          content="A simple way to use Github as a CDN. Store your images/static files in a Github repository and use them in your projects."
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/toughyear/blog-uploads/main/uploads/gaac/landing.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gaac: Github As a CDN" />
        <meta
          name="twitter:description"
          content="A simple way to use Github as a CDN. Store your images/static files in a Github repository and use them in your projects."
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/toughyear/blog-uploads/main/uploads/gaac/landing.png"
        />

        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };
