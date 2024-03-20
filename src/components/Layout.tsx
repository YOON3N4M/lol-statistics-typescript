import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyles from "@/styles/Globalstyles";
import Header from "./layout/Header";

export default function Layout({ children }: React.PropsWithChildren) {
  //로그인 여부 체크 로직

  return (
    <>
      <>
        <GlobalStyles />
        <Header />
        {children}
      </>
    </>
  );
}
