import { Box, HStack, Heading } from "@chakra-ui/react";
import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../atoms/BaseButton";
import { SearchInput } from "../molecules/SearchInput";

import { Foodshelf } from "../../types/Foodshelf";
import { SearchResult } from "../organisms/SearchResult";
import { instance } from "../../axios/config";

export const SearchFoodshelf = memo(() => {
  const [foodName, setFoodName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [sendingTimes, setSendingTimes] = useState("");
  const [foodshelves, setFoodshelves] = useState<Array<Foodshelf>>([]);

  const navigate = useNavigate();

  const onClickCreatePage = () => navigate("/create");

  const handleSearchCondition = useCallback(
    (
      inputFoodName: string,
      inputExpirationDate: string,
      inputSendingTimes: string
    ) => {
      setFoodName(inputFoodName);
      setExpirationDate(inputExpirationDate);
      setSendingTimes(inputSendingTimes);
    },
    []
  );

  const onClickSearchFoodshelf = useCallback(() => {
    instance
      .get<Array<Foodshelf>>(
        `http://localhost:8080/foodshelves?foodName=${foodName}&expirationDate=${expirationDate}&sendingTimes=${sendingTimes}`
      )
      .then((res) => setFoodshelves(res.data));
  }, [foodName, expirationDate, sendingTimes]);

  return (
    <Box padding={5}>
      <HStack spacing={10}>
        <Heading>食品検索</Heading>
        <BaseButton onClick={onClickCreatePage}>新規食品登録</BaseButton>
      </HStack>
      <br />
      <br />
      <SearchInput onFoodshelfSearch={handleSearchCondition} />
      <br />
      <BaseButton onClick={onClickSearchFoodshelf}>検索</BaseButton>
      <br />
      <br />
      <br />
      <SearchResult foodshelves={foodshelves} />
    </Box>
  );
});
