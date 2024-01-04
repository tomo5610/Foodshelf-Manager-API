import { FC, memo, useCallback, useEffect, useState } from "react";
import { Box, Divider, HStack, Heading, useBoolean } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseButton } from "../atoms/BaseButton";
import { Foodshelf } from "../../types/Foodshelf";
import { instance } from "../../axios/config";
import { UpdateFoodshelfModal } from "../organisms/UpdateFoodshelfModal";
import { FoodshelfInformation } from "../molecules/FoodshelfInfomation";
import { DeleteFoodshelfConfirmModal } from "../organisms/DeleteFoodshelfConfirmModal";
export const FoodshelfDetail: FC = memo(() => {
  const { id } = useParams();

  const [selectedFoodshelf, setSelectedFoodshelf] = useState<Foodshelf | null>(
    null
  );

  const [updateFoodshelfFlag, setUpdateFoodshelfFlag] = useBoolean();
  const [deleteFoodshelfFlag, setDeleteFoodshelfFlag] = useBoolean();

  // Spring BootのAPIを叩いて指定した食品IDの食品情報を取得する
  useEffect(() => {
    instance
      .get<Foodshelf>(`/foodshelves/${id}`)
      .then((res) => setSelectedFoodshelf(res.data));
  }, [id]);

  // UpdateFoodshelfModalで更新処理が実行されたら、更新後の食品情報を反映する。
  const handleFoodshelfUpdate = useCallback((updatedFoodshelves: Foodshelf) => {
    setSelectedFoodshelf(updatedFoodshelves);
  }, []);

  const navigate = useNavigate();

  // 食品検索画面に遷移
  const onClickBackSearchPage = () => navigate("/search");

  return (
    <Box px={10} py={5}>
      <Heading size="lg">食品詳細</Heading>
      <Divider my={3} />
      <Box px={3}>
        <HStack spacing={10}>
          <Heading size="md">食品情報</Heading>
          <BaseButton onClick={setUpdateFoodshelfFlag.on}>
            食品情報修正
          </BaseButton>
        </HStack>
        <UpdateFoodshelfModal
          updateFoodshelf={selectedFoodshelf}
          isOpen={updateFoodshelfFlag}
          onClose={setUpdateFoodshelfFlag.off}
          onFoodshelvesUpdate={handleFoodshelfUpdate}
        />
        <Divider my={3} />
        <FoodshelfInformation selectedFoodshelf={selectedFoodshelf} />
        <br />
        <br />
        <HStack>
          <BaseButton onClick={onClickBackSearchPage}>戻る</BaseButton>
          <BaseButton onClick={setDeleteFoodshelfFlag.on}>削除</BaseButton>
          <DeleteFoodshelfConfirmModal
            isOpen={deleteFoodshelfFlag}
            onClose={setDeleteFoodshelfFlag.off}
          />
        </HStack>
      </Box>
    </Box>
  );
});
