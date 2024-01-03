import { Divider, HStack, Heading, Input } from "@chakra-ui/react"

import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BaseButton } from "../atoms/BaseButton";

export const CreateFoodshelf = () => {
    const [newFoodName,setNewFoodName] = useState("");
    const [newExpirationDate,setNewExpirationDate] = useState("");
    const [newSendingTimes,setNewSendingTimes] = useState("");
    const [createMessage,setCreateMessage] =useState("");

    const onChangeNewFoodName = (e:ChangeEvent<HTMLInputElement>) => setNewFoodName(e.target.value)
    const onChangeNewExpirationDate = (e:ChangeEvent<HTMLInputElement>) => setNewExpirationDate(e.target.value)
    const onChangeNewSendingTimes = (e:ChangeEvent<HTMLInputElement>) => setNewSendingTimes(e.target.value)

    const navigate = useNavigate();

    const onClickBackFindPage = () => navigate("/find")
    const onClickCreateEquipment = () => {
      alert("食品を登録しますか？")
      axios.post("http://localhost:8080/foodshelves", { "name": newFoodName, "number": newExpirationDate, "location": newSendingTimes })
      .then((res) => setCreateMessage(res.data.message));
      alert(createMessage);
    }
  
    return (
      <div>
        <Heading>新規食品登録</Heading>
        <br />
        <Heading size={"md"}>食品情報詳細</Heading>
        <Divider my={3} />
        <HStack>
          <p>食品名</p>
          <Input width={"400px"} placeholder="食品名" onChange={onChangeNewFoodName} />
          <p>賞味期限</p>
          <Input width={"400px"} placeholder="賞味期限" onChange={onChangeNewExpirationDate} />
          <p>通知回数</p>
          <Input width={"400px"} placeholder="通知回数" onChange={onChangeNewSendingTimes} />
        </HStack>
        <br />
        <br />
        <BaseButton onClick={onClickBackFindPage}>戻る</BaseButton>
        <BaseButton onClick={onClickCreateEquipment}>登録</BaseButton>
      </div>
    )
  } 