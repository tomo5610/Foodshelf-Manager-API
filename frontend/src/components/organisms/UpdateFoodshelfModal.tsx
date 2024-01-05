import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Foodshelf } from "../../types/Foodshelf";
import { BaseButton } from "../atoms/BaseButton";
import { useMessage } from "../../hooks/useMessage";
import { instance } from "../../axios/config";

type Props = {
  updateFoodshelf: Foodshelf | null;
  isOpen: boolean;
  onClose: () => void;
  onFoodshelvesUpdate: (updatedFoodshelves: Foodshelf) => void;
};

export const UpdateFoodshelfModal: FC<Props> = memo((props) => {
  const { updateFoodshelf, isOpen, onClose, onFoodshelvesUpdate } = props;
  const { showMessage } = useMessage();
  const { id } = useParams();

  const [updateFoodName, setUpdateFoodName] = useState("");
  const [updateExpirationDate, setUpdateExpirationDate] = useState("");
  const [updateSendingTimes, setUpdateSendingTimes] = useState("");

  // propsで渡された食品情報を各項目に渡す
  useEffect(() => {
    setUpdateFoodName(updateFoodshelf?.foodName ?? "");
    setUpdateExpirationDate(updateFoodshelf?.expirationDate ?? "");
    setUpdateSendingTimes(updateFoodshelf?.sendingTimes ?? "");
  }, [updateFoodshelf, isOpen]);

  // 入力した内容を食品情報の各項目に渡す
  const onChangeUpdateFoodName = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateFoodName(e.target.value);
  const onChangeUpdateExpirationDate = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateExpirationDate(e.target.value);
  const onChangeUpdateSendingTimes = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdateSendingTimes(e.target.value);

  // Spring BootのAPIを叩いて、前段で入力した内容で指定した食品IDの食品情報を更新し、更新後の食品情報を取得して反映する
  const onClickUpdate = async () => {
    let res = await instance
      .patch(`/foodshelves/${id}`, {
        foodName: updateFoodName,
        expirationDate: updateExpirationDate,
        sendingTimes: updateSendingTimes,
      })
      .catch(() =>
        showMessage({
          title: "食品情報の修正に失敗しました。入力に誤りがあります。",
          status: "error",
        })
      );
    if (res) {
      const response: string = res.data.message;
      showMessage({ title: response, status: "success" });
      instance
        .get<Foodshelf>(`/foodshelves/${id}`)
        .then((res) => onFoodshelvesUpdate(res.data));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent pb={6}>
        <ModalHeader>食品情報修正</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>食品名</FormLabel>
              <Text fontSize={"xs"} color={"red.400"}>
                ※ 入力必須　※ 20文字以内で入力してください
              </Text>
              <Input
                value={updateFoodName}
                placeholder="食品名"
                onChange={onChangeUpdateFoodName}
              />
            </FormControl>
            <FormControl>
              <FormLabel>賞味期限</FormLabel>
              <Text fontSize={"xs"} color={"red.400"}>
                ※ 入力必須　※ 2023-12-31（yyyy-mm-dd）
              </Text>
              <Input
                value={updateExpirationDate}
                placeholder="賞味期限"
                onChange={onChangeUpdateExpirationDate}
              />
            </FormControl>
            <FormControl>
              <FormLabel>通知回数</FormLabel>
              <Text fontSize={"xs"} color={"red.400"}>
                ※ 入力必須
              </Text>
              <Input
                value={updateSendingTimes}
                placeholder="通知回数"
                onChange={onChangeUpdateSendingTimes}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <BaseButton onClick={onClickUpdate}>修正</BaseButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
