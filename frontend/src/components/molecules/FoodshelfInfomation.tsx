import { Box, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react";
import { memo } from "react";
import { Foodshelf } from "../../types/Foodshelf";

type Props = {
  selectedFoodshelf: Foodshelf | null;
};

export const FoodshelfInformation = memo((props: Props) => {
  const { selectedFoodshelf } = props;

  return (
    <HStack spacing={10}>
      <Box>
        <FormControl>
          <FormLabel>食品名</FormLabel>
          <Input value={selectedFoodshelf?.foodName} width={"400px"} placeholder="食品名" />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>賞味期限</FormLabel>
          <Input value={selectedFoodshelf?.expirationDate} width={"400px"} placeholder="賞味期限" />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>通知回数</FormLabel>
          <Input value={selectedFoodshelf?.sendingTimes} width={"400px"} placeholder="通知回数" />
        </FormControl>
      </Box>
    </HStack>
  );
}); 