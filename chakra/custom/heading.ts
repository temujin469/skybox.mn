import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Heading: ComponentStyleConfig = {
  baseStyle: {
    fontSize: "10px",
    fontWeight: 600,
    color: "gray.700",
  },
  sizes: {
    sm: {
      fontSize: "16px",
    },
    md: {
      fontSize: "18px",
    },
    lg: {
      fontSize: "22px",
      fontWeight: 700,
    },
  },
  defaultProps: {
    size:"md"
  },
};
