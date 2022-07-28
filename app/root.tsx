import React, { useContext, useEffect } from 'react'
import { withEmotionCache } from '@emotion/react'
import { chakra, ChakraProvider, ColorModeScript, cookieStorageManager, localStorageManager } from '@chakra-ui/react'
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { useLocation, useOutlet } from 'react-router-dom'
import { type MetaFunction, type LinksFunction, type LoaderFunction, redirect } from '@remix-run/node'
import { ServerStyleContext, ClientStyleContext } from './context'
import theme from './components/chakra/theme';
import Fonts from './components/chakra/Fonts'
import { AnimatePresence, motion } from 'framer-motion'
import globalCSS from '../styles/globals.css'
import { v4 } from 'uuid'
import { getCookie } from './utils/CookiesFunc'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Zdajesz!',
  viewport: 'width=device-width,initial-scale=1',
});

export let links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
    },
    {
      rel: "stylesheet",
      href: globalCSS
    }
  ]
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
      // eslint-disable-next-line
    }, []);

    return (
      <html lang="pl">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App({ cookies }: any) {
  const outlet = useOutlet();
  const location = useLocation()

  const colorModeManager =
    typeof cookies === 'string'
      // @ts-ignore
      ? cookieStorageManager(cookies)
      : localStorageManager

  if (typeof document !== 'undefined') {
    const user = getCookie('user')
    if (!user) {
      document.cookie = `user=${v4()}`
    }
  }

  return (
    <Document>
      <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
        <chakra.main minH='90vh'>
          <AnimatePresence exitBeforeEnter={true} initial={false}>
            <motion.main key={location.pathname}>
              {outlet}
            </motion.main>
          </AnimatePresence>
        </chakra.main>
        <Fonts />
      </ChakraProvider>
    </Document>
  )
}


export const loader: LoaderFunction = async ({ request }) => {

  if (process.env.NODE_ENV !== 'development') {
    const url = new URL(request.url)
    if (!url.hostname.startsWith("www.")) {
      url.hostname = `www.${url.hostname}`
      return redirect(url.toString())
    }
  }
  return {
    props: {
      // @ts-ignore
      cookies: request.headers.cookie ?? '',
    },
  }
};