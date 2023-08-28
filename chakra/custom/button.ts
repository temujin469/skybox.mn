import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "5px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      height: "35px",
    },
    lg: {
      fontSize: "10pt",
      height: "45px",
    },
  },
  variants: {
    brand: {
      color: "white",
      bg: "brand.1",
      _hover: {
        bg: "primary.300",
      },
    },
    solid: {
      color: "gray.700",
      bg: "gray.100",
      _hover: {
        bg: "gray.200",
      },
    },
    icon: {
      color: "gray.800",
      bg: "gray.100",
      // fontWeight:"700",
      _hover: {
        bg: "gray.200",
      },
    },
    outline: {
      color: "brand.1",
      border: "1px solid",
      borderColor: "brand.1",
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
      },
    },
  },
  defaultProps: {
    variant: "solid",
    size: "md",
  },
};