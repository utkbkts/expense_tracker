import { RouterProvider } from "react-router-dom";
import { router } from "./routes/global.routes";
import { Toaster } from "react-hot-toast";
import useUserStore from "./store/user.store";
import { useEffect } from "react";
import Loading from "./components/Loadind";
const App = () => {
  const { getUser, checkingAuth } = useUserStore();
  useEffect(() => {
    getUser();
  }, []);

  if (checkingAuth) return <Loading fullScreen />;
  return (
    <div>
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
