import React, { useState, useEffect } from "react";
import { withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/core";

import StyledRecomendedWorkout from "./StyledRecomendedWorkout";

import { GET_RECOMMENDED_WORKOUTS } from "../../graphql/queries";

const RecommendedWorkouts = ({ client, history }) => {
  const [workouts, setWorkouts] = useState([]);
  const toast = useToast();

  const alert = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true
    });
  };

  useEffect(() => {
    client
      .query({
        query: GET_RECOMMENDED_WORKOUTS
      })
      .then(res => {
        setWorkouts(res.data.suggestionsByExperience);
      })
      .catch(err => {
        alert("An error occurred.", "Unable to load", "error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledRecomendedWorkout>
      {workouts.map((workout, indx) => {
        while (indx < 3) {
          return (
            <div key={workout.id} className="recomended-workout-detail">
              <Link to={`/workout/${workout.id}`}>
                <img src={workout.picture} alt={workout.name} />
              </Link>
            </div>
          );
        }
        return null;
      })}
    </StyledRecomendedWorkout>
  );
};

export default withApollo(RecommendedWorkouts);
