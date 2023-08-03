import { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper } from '@chakra-ui/react';
import React from 'react';

function OrderStepper({index}:{index:number}) {
  return (
    <Stepper index={index} maxW={800} mx="auto" px={10} my={10}>
      {[
        { title: 'Мэдээлэл' },
        { title: 'Хүргэлт' },
        { title: 'Төлбөр' },
      ].map((step, index) => (
        <Step key={index}>
          <Box style={{
            position: "relative"
          }}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0' position="absolute" style={{
              left: "50%",
              transform: "translateX(-50%)"
            }}>
              <StepTitle>{step.title}</StepTitle>
            </Box>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

export default OrderStepper;
