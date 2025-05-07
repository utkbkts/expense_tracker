import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/user.store";

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      navigate("/"); 
    }
  }, []);

  return <>{children}</>;
};

export default PublicOnlyRoute;
