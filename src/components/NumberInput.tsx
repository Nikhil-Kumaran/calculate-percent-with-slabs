import {
  NumberInputField,
  NumberInput as NumberInputChakra,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import * as React from "react";

type Props = {
  type?: "default" | "mobileSpinner";
  value: number | string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
};
export function NumberInput({
  type = "default",
  onChange,
  value,
  isDisabled,
}: Props) {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value: inputValue,
  } = useNumberInput({
    step: 1,
    defaultValue: 2,
    min: 2,
  });
  React.useEffect(() => {
    if (Number(inputValue) !== value) {
      onChange(inputValue.toString());
    }
  }, [inputValue]);
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });
  if (type === "default") {
    return (
      <NumberInputChakra
        min={0}
        value={value}
        isDisabled={isDisabled}
        onChange={(value) => onChange(value)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInputChakra>
    );
  } else {
    return (
      <HStack>
        <Button {...inc}>+</Button>
        <Input {...input} />
        <Button {...dec}>-</Button>
      </HStack>
    );
  }
}
