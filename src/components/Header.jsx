import { Link } from 'react-router-dom';

const Header = () => {
	  return (
		      <header className="bg-blue-600 text-white p-4">
		        <nav className="flex justify-between items-center">
		          <div className="text-lg font-bold">Lyra CCM</div>
		          <div className="flex gap-6">
		            <Link to="/" className="hover:underline">Home</Link>
		            <Link to="/batch" className="hover:underline">Batch Worker</Link>
		            <Link to="/ondemand" className="hover:underline">On Demand</Link>
		          </div>
		        </nav>
		      </header>
		    );
};

export default Header;

