import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';

//config progress bar
const progress = new ProgressBar({
  size: 4,
  color: '#FE595E',
  className: 'z-50',
  delay: 100,
});

//start progress bard on start of route change
Router.events.on('routeChangeStart', progress.start);
//end progress bard on start of route change end
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
