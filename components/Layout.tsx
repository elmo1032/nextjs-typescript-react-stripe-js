import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';

type Props = {
  children: ReactNode;
  title?: string;
};

/**
 * A functional component that renders the layout of the page, including the head, header, and main content.
 * @param {Props} props - The props that are passed to the component.
 * @param {ReactNode} props.children - The content to be rendered in the main section of the page.
 * @param {string} props.title - The title of the page. Defaults to 'TypeScript Next.js Stripe Example'.
 */
const Layout = ({ children, title = 'TypeScript Next.js Stripe Example' }: Props) => (
  <>
    <Head>
      {/* Sets the title of the page */}
      <title>{title}</title>
      {/* Sets the character encoding to UTF-8 */}
      <meta charSet="utf-8" />
      {/* Sets the initial scale and the width of the viewport */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width," />
      {/* Sets the Twitter card type to 'summary_large_image' */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* Sets the Twitter site to '@thorwebdev' */}
      <meta name="twitter:site" content="@thorwebdev" />
      {/* Sets the Twitter title to 'TypeScript Next.js Stripe Example' */}
      <meta name="twitter:title" content="TypeScript Next.js Stripe Example" />
      {/* Sets the Twitter description to 'Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node.' */}
      <meta name="twitter:description" content="Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node." />
      {/* Sets the Twitter image to '<https://nextjs-typescript-react-stripe-js.now.sh/social_card.png>' */}
      <meta name="twitter:image" content="https://nextjs-typescript-react-stripe-js.now.sh/social_card.png" />
    </Head>
    {/* The main container that holds the header and the main content */}
    <div className="container">
      {/* The header of the page */}
      <header>
        <div className="header-content">
          {/* A link to the homepage with the logo */}
          <Link href="/">
            <a className="logo">
              {/* The logo image */}
              <img src="/logo.png" />
            </a>
          </Link>
          {/* The title of the page */}
          <h1>
            <span className="light">Stripe Sample</span>
            <br />
            Next.js, TypeScript, and Stripe ðð¸
          </h1>
        </div>
      </header>
      {children}
    </div>
    {/* The banner
