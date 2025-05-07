import useUserStore from "@/store/user.store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProctedRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return <div>{children}</div>;
};

export default ProctedRoutes;

