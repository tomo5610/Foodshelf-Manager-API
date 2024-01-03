import { Divider, HStack, Heading, Input } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { BaseButton } from "../atoms/BaseButton";
import { Foodshelf } from "../../types/Foodshelf";

export const UpdateFoodshelf = () => {
  const [updateFoodName, setUpdateFoodName] = useState("");
  const [updateExpirationDate, setUpdateExpirationDate] = useState<Date | "">(
    ""
  );
  const [updateSendingTimes, setUpdateSendingTimes] = useState<number | "">("");
  const [updateFoodshelf, setUpdateFoodshelf] = useState<Foodshelf | null>(
    null
  );
  const [updateMessage, setUpdateMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get<Foodshelf>(`http://localhost:8080/foodshelves/${id}`)
      .then((res) => setUpdateFoodshelf(res.data));
  }, [id]);

  useEffect(() => {
    setUpdateFoodName(updateFoodshelf?.foodName ?? "");
    setUpdateExpirationDate(updateFoodshelf?.expirationDate ?? "");
    setUpdateSendingTimes(updateFoodshelf?.sendingTimes ?? "");
  }, [updateFoodshelf]);

  const onChangeUpdateFoodName = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateFoodName(e.target.value);
  const onChangeUpdateExpirationDate = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateExpirationDate(e.target.value ? new Date(e.target.value) : "");
  const onChangeUpdateSendingTimes = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateSendingTimes(Number(e.target.value));

  const navigate = useNavigate();

  const onClickBackDetailPage = () => navigate(`/detail/${id}`);
  const onClickUpdate = () => {
    alert("更新しますか？");
    axios
      .patch(`http://localhost:8080/foodshelves/${id}`, {
        fooName: updateFoodName,
        expirationDate: updateExpirationDate,
        sendingTimes: updateSendingTimes,
      })
      .then((res) => setUpdateMessage(res.data.message));
    alert(updateMessage);
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <Heading>食品情報修正</Heading>
      <br />
      <Heading size={"md"}>食品情報詳細</Heading>
      <Divider my={3} />
      <HStack>
        <p>食品名称</p>
        <Input
          value={updateFoodName}
          width={"400px"}
          placeholder="食品名称"
          onChange={onChangeUpdateFoodName}
          isReadOnly={false}
        />
        <p>賞味期限</p>
        <Input
          value={updateExpirationDate as string}
          width={"400px"}
          placeholder="賞味期限"
          onChange={onChangeUpdateExpirationDate}
        />
        <p>通知回数</p>
        <Input
          value={updateSendingTimes}
          width={"400px"}
          placeholder="通知回数"
          onChange={onChangeUpdateSendingTimes}
        />
      </HStack>
      <br />
      <br />
      <BaseButton onClick={onClickBackDetailPage}>戻る</BaseButton>
      <BaseButton onClick={onClickUpdate}>更新</BaseButton>
    </div>
  );
};
