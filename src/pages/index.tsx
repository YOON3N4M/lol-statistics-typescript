import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Header from "@/components/layout/Header";
import RecentSearched from "@/components/RecentSearched";
import SearchInput from "@/components/SearchInput";
import ContainerMain from "@/containers/main/ContainerMain";
import { Box, Flex } from "@chakra-ui/react";

function Home() {
  return (
    <Flex flexDirection={"column"} minH="100dvh" bg="#5383e8" pb={10}>
      <ContainerMain />
    </Flex>
  );
}

export default Home;
