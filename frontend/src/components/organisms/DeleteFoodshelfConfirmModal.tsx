import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";
import { instance } from "../../axios/config";
import { ConfirmModal } from "../atoms/ConfirmModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteFoodshelfConfirmModal = memo((props: Props) => {
  const { isOpen, onClose } = props;
  const { showMessage } = useMessage();
  const { id } = useParams();
  const navigate = useNavigate();

  const deleteFoodshelfExec = async () => {
    let res = await instance.delete(`/foodshelves/${id}`)
      .catch(() => showMessage({
        title: "食品情報の削除に失敗しました。", status: "error"
      }));
    if (res) {
      const response: string = res.data.message;
      showMessage({ title: `${response}食品検索画面に戻ります。`, status: "success" });
    }
    navigate("/search");

  };

  return (
    <ConfirmModal isOpen={isOpen} onClose={onClose} onClickExec={deleteFoodshelfExec}>
      この食品情報を削除しますか？
    </ConfirmModal>
  );
});