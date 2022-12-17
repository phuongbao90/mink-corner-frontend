"use client";

import { PropsWithChildren } from "react";
import { ReactQueryWrapper } from "./components/react-query-wrapper";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <ReactQueryWrapper>{children}</ReactQueryWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
