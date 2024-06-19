import { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const TrainerRoute = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [trainer, setTrainer] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData?email=${user.email}`);
      if (res.data[0].role === "trainer") {
        setTrainer(true);
      }
      return res.data;
    },
  });

  if (isLoading || loader) {
    return <p>Loading...</p>;
  }

  if (trainer) {
    return children;
  }

  // return <Navigate to={"/dashboard"} />;
};

TrainerRoute.propTypes = {
  children: PropTypes.node,
};

export default TrainerRoute;
