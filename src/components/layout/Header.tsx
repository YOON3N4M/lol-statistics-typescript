import Link from "next/link";
import React from "react";
import styled from "@emotion/styled";
import SearchInput from "@/components/SearchInput";
import { usePathname } from "next/navigation";
import { Box, Center, Flex, Text } from "@chakra-ui/react";

function Header() {
  const pathname = usePathname();

  return (
    <>
      <Flex
        h="50px"
        bg="keyColor.bgSky"
        alignItems={"center"}
        justifyContent="space-between"
        px={4}
        gap={4}
      >
        <Link style={{ textDecoration: "none" }} href="/">
          <StyledLogo>OP.GG</StyledLogo>
        </Link>
        {pathname !== "/" && (
          <Flex
            w={{ pc: "50%", mo: "80%" }}
            h="30px"
            bg="white"
            borderRadius={"4px"}
            alignItems="center"
            overflow={"hidden"}
          >
            <Center
              bg="keyColor.selectBgBlue"
              color={"keyColor.sky"}
              fontSize="sm"
              className="region"
              borderLeftRadius={"4px"}
              p={2}
            >
              <Text>KR</Text>
            </Center>
            <Box flex={1} className="search" ml={4}>
              <SearchInput />
            </Box>
          </Flex>
        )}

        <div></div>
      </Flex>
    </>
  );
}
const StyledLogo = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 800;
  text-decoration-line: none;
`;

export default Header;
