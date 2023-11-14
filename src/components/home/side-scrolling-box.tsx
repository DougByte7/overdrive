/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Flex } from "@mantine/core";
import { ReactNode } from "react";

interface SideScrollingBoxProps {
  children: ReactNode;
}

export default function SideScrollingBox({ children }: SideScrollingBoxProps) {
  return (
    <Box
      pr={16}
      pl={16}
      css={css`
        overflow: auto;
        ::-webkit-scrollbar {
          height: 0px;
        }
      `}
    >
      <Flex
        // @ts-ignore
        gap="sm"
        css={css`
          width: max-content;

          @media screen and (min-width: 1360px) {
            flex-wrap: wrap;
            max-width: 100%;
          }
        `}
      >
        {children}
      </Flex>
    </Box>
  );
}
