import { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const CommonRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [common, setCommon] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user.email}`);
      if (res.data[0].role === "admin" || res.data[0].role === "trainer") {
        setCommon(true);
      }
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (common) {
    return children;
  }

  return <Navigate to={"/dashboard"} />;
};

CommonRoute.propTypes = {
  children: PropTypes.node,
};

export default CommonRoute;
