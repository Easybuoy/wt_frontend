import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Box, Image } from "@chakra-ui/core";

import DefaultImage from "../../images/login_image.png";
import { WorkoutHistoryCard as StyledWorkoutHistoryCard } from "./WorkoutHistoryStyle";

function WorkoutHistoryCard({ workout, onOpen, history }) {
  const dateCompleted = new Date(workout.endDate).toLocaleDateString();

  const style = {
    display: "flex",
    flexDirection: "column",
    marginRight: "250px",
    alignItems: "flex-start"
  };

  return (
    <StyledWorkoutHistoryCard>
      <Box
        w="100%"
        onClick={onOpen}
        marginBottom="30px"
        border="1px solid grey"
        padding="10px 20px"
        borderRadius="5px"
      >
        <Flex justify="space-between">
          <Image
            src={workout.picture || DefaultImage}
            alt="workout thumbnail"
            size="100px"
            style={{ objectFit: "contain" }}
          />
          <section style={style}>
            <p>
              {dateCompleted} -{" "}
              <strong style={{ color: "green" }}>COMPLETED</strong>
            </p>
            <p>{workout.name}</p>
            <p>{workout.workoutId.intensity}</p>
            <p>{workout.workoutId.avgTime}</p>
          </section>
          <Link to={`/workout/${workout.workoutId.id}`}>
            <Button variantColor="orange" marginTop="30px">
              View Details
            </Button>
          </Link>
        </Flex>
      </Box>
    </StyledWorkoutHistoryCard>
  );
}

export default WorkoutHistoryCard;
