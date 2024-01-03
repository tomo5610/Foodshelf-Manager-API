import { Divider, HStack, Heading, Input } from "@chakra-ui/react";

import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Foodshelf } from "../../types/Foodshelf";
import { BaseButton } from "../atoms/BaseButton";

export const FoodshelfDetail: FC = () => {
  const [selectedFoodshelf, setSelectedFoodshelf] = useState<Foodshelf | null>(
    null
  );
  const [deleteMessage, setDeleteMessage] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const onClickBackFindPage = () => navigate("/find");
  const onClickUpdatePage = () =>
    navigate(`/update/${id}`, { state: { id: id } });

  const onClickDelete = () => {
    alert("この食品を削除しますか？");
    axios
      .delete<string>(`http://localhost:8080/foodshelves/${id}`)
      .then((res) => setDeleteMessage(res.data));
    alert(deleteMessage);
  };

  useEffect(() => {
    axios
      .get<Foodshelf>(`http://localhost:8080/foodshelves/${id}`)
      .then((res) => setSelectedFoodshelf(res.data));
  }, [id]);

  return (
    <div>
      <Heading>食品情報詳細</Heading>
      <br />
      <Heading size={"md"}>食品情報詳細</Heading>
      <Divider my={3} />
      <HStack>
        <p>食品名</p>
        <Input
          value={selectedFoodshelf?.foodName}
          width={"400px"}
          backgroundColor={"gray.100"}
          placeholder="食品名"
        />
        <p>賞味期限</p>
        <Input
          value={selectedFoodshelf?.expirationDate?.toLocaleDateString() || ""}
          width={"400px"}
          backgroundColor={"gray.100"}
          placeholder="賞味期限"
        />
        <p>通知回数</p>
        <Input
          value={selectedFoodshelf?.sendingTimes}
          width={"400px"}
          backgroundColor={"gray.100"}
          placeholder="通知回数"
        />
      </HStack>
      <br />
      <br />
      <BaseButton onClick={onClickBackFindPage}>戻る</BaseButton>
      <BaseButton onClick={onClickUpdatePage}>修正</BaseButton>
      <BaseButton onClick={onClickDelete}>削除</BaseButton>
    </div>
  );
};
