import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { HiOutlineMail } from "react-icons/hi"

const Newsletters = () => (
  <section>
    <Box bgColor="brand.2">
      <Box className={"ps-container"}>
        <Grid
          templateColumns={["repeat(1,1fr)", "repeat(12,1fr)"]}
          alignItems="center"
        >
          <GridItem colSpan={[1, 4]} py="50px" px={3}>
            <Heading size="xl" mb="30px" color="white">
              Бидэнтэй нэгдэхийг хүсвэл...
            </Heading>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "white",
                rounded: "5px",
                alignItems: "center",
                padding: "4px",
              }}
            >
              <Box fontSize={"27px"} color="gray.400" px={5}>
                <HiOutlineMail />
              </Box>
                <Input
                  type="email"
                  variant="unstyled"
                  outline="none"
                  border="none"
                  // px={5}
                  placeholder="Имэйл хаяг"
                />

              <Button color="white" variant="brand" h={50}>
                Илгээх
              </Button>
            </Box>
          </GridItem>
          <GridItem
            h={350}
            colSpan={[1, 8]}
            style={{
              backgroundImage: "url('/static/img/bg/subscribe.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
            }}
          ></GridItem>
        </Grid>
      </Box>
    </Box>
  </section>
);

export default Newsletters;
