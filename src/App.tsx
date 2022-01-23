import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Button,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { NumberInput } from "./components/NumberInput";

export const App = () => {
  const [numberOfSlabs, setNumberOfSlabs] = React.useState("2");
  const [totalAmount, setTotalAmount] = React.useState("0");
  const [slabs, setSlabs] = React.useState([
    {
      id: nanoid(),
      startValue: "0",
      endValue: "0",
      percent: "0",
    },
  ]);
  const [result, setResult] = React.useState(0);

  function calculate() {
    let _totalAmount = Number(totalAmount);
    let _result = 0;
    let index = 0;
    while (_totalAmount > 0) {
      let endValue = 0;
      if (slabs[index].endValue) {
        endValue = Number(slabs[index].endValue);
      } else {
        endValue = Number(slabs[index].startValue);
      }
      if (_totalAmount >= endValue) {
        _result += (endValue * Number(slabs[index].percent)) / 100;
        _totalAmount -= endValue;
      } else {
        _result += (_totalAmount * Number(slabs[index].percent)) / 100;
        _totalAmount = 0;
      }

      if (slabs[index].endValue) {
        index++;
      }
    }
    setResult(_result);
  }

  function handleSlabValuesChange(key: string, value: string, id: string) {
    setSlabs(
      slabs.map((slab) => {
        if (slab.id === id) {
          return {
            ...slab,
            [key]: value,
          };
        }
        return slab;
      })
    );
  }

  function handleNumberOfSlabsChange(value: string) {
    if (value < numberOfSlabs) {
      setSlabs(slabs.slice(0, Number(value)));
    } else {
      setSlabs([
        ...slabs,
        {
          id: nanoid(),
          startValue: "0",
          endValue: "0",
          percent: "0",
        },
      ]);
    }
    setNumberOfSlabs(value);
  }

  function getStartValue(index: number) {
    if (index === 0) {
      return 0;
    }
    return slabs?.[index - 1]?.endValue;
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Calculate percent with slabs
            </Heading>
            <Text textAlign={"center"} fontSize={"lg"} color={"gray.600"}>
              Enter total amount, number of slabs, range and percent for each
              slab
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="totalAmount">
                <FormLabel>Total amount</FormLabel>
                <NumberInput
                  value={totalAmount}
                  onChange={(value) => setTotalAmount(value)}
                />
              </FormControl>
              <FormControl id="numberOfSlabs">
                <FormLabel>Number of slabs</FormLabel>
                <NumberInput
                  type="mobileSpinner"
                  value={numberOfSlabs}
                  onChange={handleNumberOfSlabsChange}
                />
              </FormControl>
              {slabs.map((slab, index) => {
                return (
                  <React.Fragment key={slab.id}>
                    <HStack>
                      <FormControl>
                        <Tooltip label='Will be auto populated based on the "to" value of the previous slab'>
                          <FormLabel>
                            {index === slabs.length - 1 ? "Above" : "From"}
                          </FormLabel>
                        </Tooltip>
                        <NumberInput
                          isDisabled={true}
                          value={getStartValue(index)}
                          onChange={(value) => {
                            handleSlabValuesChange(
                              "startValue",
                              value,
                              slab.id
                            );
                          }}
                        />
                      </FormControl>
                      {index === slabs.length - 1 ? null : (
                        <FormControl>
                          <FormLabel>To</FormLabel>
                          <NumberInput
                            value={slab.endValue}
                            onChange={(value) => {
                              handleSlabValuesChange(
                                "endValue",
                                value,
                                slab.id
                              );
                            }}
                          />
                        </FormControl>
                      )}
                    </HStack>
                    <FormControl>
                      <FormLabel>Percent</FormLabel>
                      <NumberInput
                        value={slab.percent}
                        onChange={(value) => {
                          handleSlabValuesChange("percent", value, slab.id);
                        }}
                      />
                    </FormControl>
                  </React.Fragment>
                );
              })}
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  marginTop={"1rem"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={calculate}
                >
                  Calculate
                </Button>
              </Stack>
              {result && (
                <Text fontWeight={500} textAlign={"center"}>
                  {result}
                </Text>
              )}
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};
