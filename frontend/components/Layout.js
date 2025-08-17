import Footer from './Footer';
import Header from './Header/Header';

export default function Layout({ children }) {
  return (
    <div className='flex flex-col'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
