import React, { useEffect, useState } from "react";
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/core";
import { withApollo } from "react-apollo";
import PropTypes from "prop-types";

import { GET_WORKOUT_DETAILS } from "../../graphql/queries";
import CustomSpinner from "../common/Spinner";
import WorkoutCard from "./Workout";
import { WorkoutsStyle } from "./WorkoutStyle";

function Workouts({ client }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .query({
        query: GET_WORKOUT_DETAILS
      })
      .then(res => {
        console.log(res.data.workouts);
        setData(res.data.workouts);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Box>
        <Flex
          width="100vw"
          height="100vh"
          justifyContent="center"
          align="center"
        >
          <CustomSpinner thickness="6px" size="xl" text="Loading..." />
        </Flex>
      </Box>
    );
  }

  if (data.length > 0) {
    return (
      <WorkoutsStyle>
        {data.map(item => (
          <WorkoutCard key={item.id} data={item} />
        ))}

        <div className="more">
          <Button marginY="50px" variantColor="orange" size="lg">
            View More
          </Button>
        </div>
      </WorkoutsStyle>
    );
  }

  return (
    <Box>
      <Flex width="100vw" height="100vh" justifyContent="center" align="center">
        <CustomSpinner thickness="6px" size="xl" text="Loading..." />
      </Flex>
    </Box>
  );
}

export default withApollo(Workouts);

Workouts.propTypes = {
  data: PropTypes.object.isRequired
};
