import { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [admin, setAdmin] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user.email}`);
      if (res.data[0].role === "admin") {
        setAdmin(true);
      }
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (admin) {
    return children;
  }

  return <Navigate to={"/dashboard"} />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
