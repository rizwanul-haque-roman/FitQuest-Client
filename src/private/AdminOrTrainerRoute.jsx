import { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminOrTrainerRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user.email}`);
      return res.data[0].role;
    },
  });

  if (isLoading || loader) {
    return <p>Loading...</p>;
  }

  if (data === "admin" || data === "trainer") {
    return children;
  }

  return <Navigate to={"/dashboard"} />;
};

AdminOrTrainerRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminOrTrainerRoute;
