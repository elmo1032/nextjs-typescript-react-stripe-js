// Importing the AppProps type from Next.js's 'next/app' module
import { AppProps } from 'next/app'

// Importing the global styles defined in '../styles.css'
import '../styles.css'

// Defining the functional component 'MyApp' which is the custom App component
// for the Next.js application
function MyApp({ Component, pageProps }: AppProps) {
  // The 'Component' prop is the active page component that is being rendered
  // and the 'pageProps' prop is the props that are passed to the active page
  // component.
  
  // The 'MyApp' component returns the active page component with its props
  // using the spread operator (...pageProps)
  return <Component {...pageProps} />
}

// Exporting the 'MyApp' component as the default export so it can be used
// as the custom App component in the Next.js application
export default MyApp
