import React from "react";
import { Button, Input, PseudoBox, Text } from "@chakra-ui/core";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

function Search(props) {
  const [input, setInput] = props.inputState;
  const [user, setUser] = props.userState;
  let setSearched = props.setSearched;
  let handleChange = (e) => {
    let inputValue = e.target.value;
    setInput(inputValue);
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <Text
        fontSize="4rem"
        color="black"
        css={css`
          padding-bottom: 2rem;
        `}
      >
        Rate Your Teammates!
      </Text>
      <PseudoBox
        css={css`
          display: flex;
          width: 35rem;
          align-items: center;
          height: 2rem;
        `}
      >
        <Input
          value={input}
          onChange={handleChange}
          variant="filled"
          placeholder="Teammate Name"
          height="100%"
          rounded="0px"
          css={css`
            padding: 1.25rem;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          `}
        />
        <Button
          rightIcon="search-2"
          variantColor="teal"
          variant="solid"
          border="0"
          height="100%"
          rounded="0px"
          css={css`
            padding: 1.4rem;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          `}
          onClick={() => props.getUser(input, setUser, setSearched)}
        >
          Search
        </Button>
      </PseudoBox>
    </div>
  );
}

export default Search;
