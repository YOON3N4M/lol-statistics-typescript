import Header from "@/components/layout/Header";
import RecentSearched from "@/components/RecentSearched";
import SearchInput from "@/components/SearchInput";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import React from "react";

export default function ContainerMain() {
  return (
    <>
      <Header />
      <Flex
        as={"section"}
        w={{ pc: "800px", mo: "300px" }}
        h="60px"
        bg="white"
        borderRadius={"30px"}
        boxShadow="md"
        justifyContent={"space-between"}
        alignItems="center"
        m="0 auto"
        mt={100}
        px={4}
      >
        <Box w={{ pc: "234px", mo: "80px" }} h="40px" pl={{ pc: 4, mo: 2 }}>
          <Box as="label" display={"block"} fontSize="xs" fontWeight={700}>
            Region
          </Box>
          <Text color={"keyColor.gray"} fontSize="sm">
            Korea
          </Text>
        </Box>
        <Divider orientation="vertical" h={"40%"} mr={{ pc: 8, mo: 4 }} />
        <Box position="relative" flex={1}>
          <Box as="label" display={"block"} fontSize="xs" fontWeight={700}>
            Search
          </Box>
          <SearchInput />
        </Box>
        <Box as="button" color={"keyColor.sky"} fontWeight={700} fontSize="2xl">
          .GG
        </Box>
      </Flex>
      {/* <Flex as={"section"} m="0 auto">
        <RecentSearched />
      </Flex> */}
    </>
  );
}
