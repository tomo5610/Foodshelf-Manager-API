import { memo, useCallback, useState } from "react";
import { Box, Divider, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../atoms/BaseButton";
import { CreateFoodshelfInput } from "../molecules/CreateFoodshelfInput";
import { useMessage } from "../../hooks/useMessage";
import { instance } from "../../axios/config";

export const CreateFoodshelf = memo(() => {
  const { showMessage } = useMessage();

  const [newFoodName, setNewFoodName] = useState("");
  const [newExpirationDate, setNewExpirationDate] = useState("");
  const [newSendingTimes, setNewSendingTimes] = useState("");

  // CreateFoodshelfInputで入力された内容を食品情報の各項目に渡す
  const handleCreateFoodshelf = useCallback(
    (
      newFoodName: string,
      newExpirationDate: string,
      newSendingTimes: string
    ) => {
      setNewFoodName(newFoodName);
      setNewExpirationDate(newExpirationDate);
      setNewSendingTimes(newSendingTimes);
    },
    []
  );

  const navigate = useNavigate();

  // 食品検索画面に遷移
  const onClickBackFindPage = () => navigate("/search");

  // Spring BootのAPIを叩いて、前段で入力した内容で食品情報を登録する。その後、登録した食品の詳細画面に遷移する。
  const onClickCreateFoodshelf = async () => {
    let res = await instance
      .post("http://localhost:8080/foodshelves", {
        foodName: newFoodName,
        expirationDate: newExpirationDate,
        sendingTimes: newSendingTimes,
      })
      .catch(() =>
        showMessage({
          title: "食品の登録に失敗しました。入力に誤りがあります。",
          status: "error",
        })
      );
    if (res) {
      const response: string = res.data.message;
      showMessage({
        title: `${response}食品検索画面に戻ります。`,
        status: "success",
      });
      navigate("/search");
    }
  };

  return (
    <Box padding={5}>
      <Heading>新規食品登録</Heading>
      <br />
      <Heading size="lg">食品情報詳細</Heading>
      <Divider my={3} />
      <CreateFoodshelfInput onFoodshelfCreate={handleCreateFoodshelf} />
      <br />
      <br />
      <HStack>
        <BaseButton onClick={onClickBackFindPage}>戻る</BaseButton>
        <BaseButton onClick={onClickCreateFoodshelf}>登録</BaseButton>
      </HStack>
    </Box>
  );
});
