import React from "react";
import { Box, PseudoBox, Text } from "@chakra-ui/core";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function ViewUser(props) {
  let [uplike, downlike] = props.rating;
  let [user, setUser] = props.userState;

  return (
    <PseudoBox
      bg="white.400"
      mt="8"
      height="xs"
      css={css`
        padding: auto;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: space-evenly;
        `}
      >
        <Box
          as="button"
          w="150px"
          css={css`
            color: white;
            padding: 0.3rem;
            font-weight: bold;
            background-color: mediumseagreen;
            border-radius: 10px;
            box-shadow: 0 3px #999;
            &:hover {
              background-color: darkgreen;
            }
            &:active {
              background-color: darkgreen;
              box-shadow: 0 2px #666;
              transform: translateY(4px);
            }
            &:focus {
              outline: 0 !important;
            }
          `}
          onClick={() => uplike(user.name, setUser)}
        >
          {user.uplike + " "}Uplikes
        </Box>
        <Text fontSize="4xl">{user.name}</Text>
        <Box
          as="button"
          w="150px"
          css={css`
            color: white;
            padding: 0.3rem;
            font-weight: bold;
            background-color: tomato;
            border-radius: 10px;
            box-shadow: 0 3px #999;
            &:hover {
              background-color: darkred;
            }
            &:active {
              background-color: darkred;
              box-shadow: 0 2px #666;
              transform: translateY(4px);
            }
            &:focus {
              outline: 0 !important;
            }
          `}
          onClick={() => downlike(user.name, setUser)}
        >
          {user.downlike + " "}Downlikes
        </Box>
      </div>
    </PseudoBox>
  );
}
