import React, { useState } from 'react';
import { Radio } from 'antd';
import { useRouter } from 'next/router';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const ModulePaymentMethods = () => {
    const Router = useRouter();
    const [method, setMethod] = useState(1);

    function handleChangeMethod(e) {
        setMethod(e.target.value); //e.target.value
    }

    function handleSubmit(e) {
        e.preventDefault();
        Router.push('/account/payment-success');
    }

    return (
      <>
        <Box
          borderRadius={5}
          border="1px"
          mb="40px"
          borderColor="gray.200"
          p={["13px", "20px"]}
        >
          <div className="ps-block__header">
            <Radio.Group onChange={(e) => handleChangeMethod(e)} value={method}>
              <Radio value={1}>
                <Heading>QPay төлөх</Heading>
              </Radio>
              <Radio value={2}>
                <Heading>Дансаар төлөх</Heading>
              </Radio>
            </Radio.Group>
          </div>
          <div className="ps-block__content">
            {method === 1 ? (
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
                pt="20px"
                pb={["0", "20px"]}
              >
                <img
                  style={{
                    maxWidth: "300px",
                  }}
                  src="data:image/png;base64,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"
                />
                <Text display={["none", "block"]} mb={3}>
                  Та смарт банкны апп ашиглаж кодыг уншуулж төлбөр төлнө үү.
                </Text>
                <Button size="lg" display={["block", "none"]} width="100%">
                  Төлөх
                </Button>
              </Box>
            ) : (
              <div className="ps-block__tab"></div>
            )}
          </div>
        </Box>
      </>
    );
};

export default ModulePaymentMethods;
