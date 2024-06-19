import { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user.email}`);
      return res.data[0].role;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (role === "admin") {
    return children;
  }

  return <Navigate to={"/dashboard"} />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
