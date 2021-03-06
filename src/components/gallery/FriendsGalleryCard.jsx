import React from "react";
import { Box, Divider, Heading, Text, Image } from "@chakra-ui/core";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { FriendsGalleryStyle } from "./StyledGallery";

const FriendsGallery = ({ wGallery }) => {
  const { gallery, firstname, lastname, goal } = wGallery;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <FriendsGalleryStyle>
      <Divider borderColor="gray.300" />
      <section>
        <Heading size="sm">
          {firstname} {lastname}
        </Heading>
        <Text>
          Goal: <span>{goal}</span>
        </Text>
      </section>

      <Carousel responsive={responsive}>
        {gallery.map(gal => {
          return (
            <div key={gal.id}>
              <Image
                src={gal.picture}
                alt="user-progress"
                height="240px"
                width="400px"
                paddingX={3}
              />
              <Box textAlign="left" paddingLeft={3}>
                <Text>{gal.workoutId.name}</Text>
                <Text color="orange.400">
                  {moment(gal.endDate).format("LL")}
                </Text>
              </Box>
            </div>
          );
        })}
      </Carousel>
    </FriendsGalleryStyle>
  );
};
export default FriendsGallery;
