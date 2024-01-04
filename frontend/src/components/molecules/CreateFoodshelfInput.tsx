import { Box, FormControl, FormLabel, HStack, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState } from "react";

type Props = {
  onFoodshelfCreate: (newFoodName: string, newExpirationDate: string, newSendingTimes: string) => void;
};

export const CreateFoodshelfInput = memo((props: Props) => {
  const { onFoodshelfCreate } = props;

  const [newFoodName, setNewFoodName] = useState("");
  const [newExpirationDate, setNewExpirationDate] = useState("");
  const [newSendingTimes, setNewSendingTimes] = useState<string | "">("");

  // 入力された内容を受け取る
  const onChangeNewFoodName = (e: ChangeEvent<HTMLInputElement>) => setNewFoodName(e.target.value);
  const onChangeNewExpirationDate = (e: ChangeEvent<HTMLInputElement>) => setNewExpirationDate(e.target.value);
  const onChangeNewSendingTimes = (e: ChangeEvent<HTMLInputElement>) => setNewSendingTimes(e.target.value);

  // 入力された内容を親コンポーネントに渡す
  useEffect(() => onFoodshelfCreate(newFoodName, newExpirationDate, newSendingTimes), 
  [newFoodName, newExpirationDate, newSendingTimes]);


  return (
    <HStack spacing={10}>
      <Box>
        <FormControl>
          <FormLabel>食品名</FormLabel>
          <Input width={"400px"} placeholder="食品名" onChange={onChangeNewFoodName} />
          <Text fontSize={"xs"} color={"red.400"}>※ 入力必須　※ 20文字以内で入力してください</Text>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>賞味期限</FormLabel>
          <Input width={"400px"} placeholder="賞味期限" onChange={onChangeNewExpirationDate} />
          <Text fontSize={"xs"} color={"red.400"}>※ 入力必須　※ 20文字以内で入力してください</Text>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>通知回数</FormLabel>
          <Input width={"400px"} placeholder="通知回数" onChange={onChangeNewSendingTimes} />
          <Text fontSize={"xs"} color={"red.400"}>※ 入力必須　※ 20文字以内で入力してください</Text>
        </FormControl>
      </Box>
    </HStack>
  );
}); 