import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';

function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </CookiesProvider>
  );
}

export default App;
