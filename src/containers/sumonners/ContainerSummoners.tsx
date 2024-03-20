import Header from "@/components/layout/Header";
import { UserDocument } from "@/types/types";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function ContainerSummoners() {
  const pathname = usePathname();

  const [userDocument, setUserDocument] = useState<UserDocument | null>(null);
  return <Box></Box>;
}
