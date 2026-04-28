"use client";

import { useSession } from "next-auth/react";
import type React from "react";
import theme from "@/app/theme";
import { NextAppProvider, QueryClientProviderWrapper } from "@/toolpad/core";
import { getNavMenu } from "../layout/navbar/nav";

export default function ToolpadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  return (
    <QueryClientProviderWrapper>
      <NextAppProvider
        navigation={getNavMenu()}
        session={session.data}
        theme={theme}
      >
        {children}
      </NextAppProvider>
    </QueryClientProviderWrapper>
  );
}
