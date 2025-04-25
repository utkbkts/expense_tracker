import logo from "@/assets/logo.png";
import useUserStore from "@/store/user.store";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const { user,logout } = useUserStore();
  const location = useLocation().pathname;
  return (
    <header className="fixed top-0 bg-transparent z-50 w-full ">
      <nav className="flex items-center justify-between container mx-auto">
        <Link to={"/"} className="p-6 ">
          <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
        </Link>
        <div>
        <ul className="flex items-center gap-6 px-8 py-4 text-white">
          <li className={`cursor-pointer font-medium transition-colors duration-300 relative group ${
            location === "/" ? "text-pink-300" : "hover:text-pink-200"
          }`}>
            <Link to="/">Dashboard</Link>
            <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
              location === "/" ? "w-full bg-pink-300" : "w-0 bg-pink-300 group-hover:w-full"
            }`}></span>
          </li>
          <li className={`cursor-pointer font-medium transition-colors duration-300 relative group ${
            location === "/transactions" ? "text-cyan-300" : "hover:text-cyan-200"
          }`}>
            <Link to="/transactions">Transactions</Link>
            <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
              location === "/transactions" ? "w-full bg-cyan-300" : "w-0 bg-cyan-300 group-hover:w-full"
            }`}></span>
          </li>
          <li className={`cursor-pointer font-medium transition-colors duration-300 relative group ${
            location === "/accounts" ? "text-emerald-300" : "hover:text-emerald-200"
          }`}>
            <Link to="/accounts">Accounts</Link>
            <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
              location === "/accounts" ? "w-full bg-emerald-300" : "w-0 bg-emerald-300 group-hover:w-full"
            }`}></span>
          </li>
          <li className={`cursor-pointer font-medium transition-colors duration-300 relative group ${
            location === "/settings" ? "text-amber-300" : "hover:text-amber-200"
          }`}>
            <Link to="/settings">Settings</Link>
            <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
              location === "/settings" ? "w-full bg-amber-300" : "w-0 bg-amber-300 group-hover:w-full"
            }`}></span>
          </li>
        </ul>
        </div>
        <div>
          {user ? (
            <button onClick={logout} className="py-2 px-4 rounded-full  bg-red-400 text-black cursor-pointer transition-all duration-300 hover:opacity-80">
              Logout
            </button>
          ) : (
            <Link
              to={"/sign-in"}
              className="py-2 px-4 rounded-full  bg-black-200 text-black cursor-pointer transition-all duration-300 hover:opacity-80"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
