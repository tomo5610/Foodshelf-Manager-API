import { Box, Divider, HStack, Heading, Input } from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState } from "react";

type Props = {
  onFoodshelfSearch: (foodName: string, expirationDate: string, sendingTimes: string) => void;
};

export const SearchInput = memo((props: Props) => {
  const { onFoodshelfSearch } = props;

  const [inputFoodName, setInputFoodName] = useState("");
  const [inputExpirationDate, setInputExpirationDate] = useState("");
  const [inputSendingTimes, setInputSendingTimes] = useState("");

  // 入力された内容を受け取る
  const onChangeFoodName = (e: ChangeEvent<HTMLInputElement>) => setInputFoodName(e.target.value);
  const onChangeExpirationDate = (e: ChangeEvent<HTMLInputElement>) => setInputExpirationDate(e.target.value);
  const onChangeSendingTimes = (e: ChangeEvent<HTMLInputElement>) => setInputSendingTimes(e.target.value);

  // 入力された内容を親コンポーネントに渡す
  useEffect(() => onFoodshelfSearch(inputFoodName, inputExpirationDate, inputSendingTimes), [
    inputFoodName,
    inputExpirationDate,
    inputSendingTimes,
  ]);

  // 検索条件入力欄の表示
  return (
    <>
      <Heading size='lg'>検索条件入力</Heading>
      <Divider my={3} />
      <HStack spacing={4} >
        <Box>
          <p>食品名</p>
          <Input width={"400px"} placeholder="鶏肉" onChange={onChangeFoodName} />
        </Box>
        <Box>
          <p>賞味期限
          </p>
          <Input width={"400px"} placeholder="2023-12-31（yyyy-mm-dd）" onChange={onChangeExpirationDate} />
        </Box>
        <Box>
          <p>通知回数</p>
          <Input width={"400px"} placeholder="4" onChange={onChangeSendingTimes} />
        </Box>
      </HStack>
    </>
  );
}); 