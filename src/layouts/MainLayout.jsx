import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
	  return (
		      <div className="flex flex-col min-h-screen">
		        <Header />
		        <main className="flex-1 p-6">{children}</main>
		        <Footer />
		      </div>
		    );
};

export default MainLayout;

