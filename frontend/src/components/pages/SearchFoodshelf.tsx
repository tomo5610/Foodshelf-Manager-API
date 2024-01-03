import { Box, HStack, Heading, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseButton } from "../atoms/BaseButton";

export type Foodshelf = {
  id: number;
  foodName: string;
  expirationDate: string;
  sendingTimes: number;
}

export const SearchFoodshelf = () => {
  const [foodName, setFoodName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [sendingTimes, setSendingTimes] = useState("");
  const [Foodshelves, setFoodshelves] = useState<Array<Foodshelf>>([]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setFoodName(e.target.value)
  const onChangeExpirationDate = (e: ChangeEvent<HTMLInputElement>) => setExpirationDate(e.target.value)
  const onChangeSendingTimes = (e: ChangeEvent<HTMLInputElement>) => setSendingTimes(e.target.value)

  const navigate = useNavigate();

  const onClickCreatePage = () => navigate("/create")

  const onClickSearchFoodshelf = () => {
    axios.get<Array<Foodshelf>>(`http://localhost:8080/foodshelves?foodName=${foodName}&expirationDate=${expirationDate}&sendingTimes=${sendingTimes}`)
      .then((res) => setFoodshelves(res.data))
  }

  return (
    <Box padding={"20px"}>
      <Heading>食品検索</Heading>
      <br />
      <BaseButton onClick={onClickCreatePage}>新規食品登録</BaseButton>
      <br />
      <br />
      <Heading size='lg'>検索条件入力</Heading>
      <br />
      <HStack>
        <Box>
          <p>食品名</p>
          <Input width={"400px"} placeholder="食品名" onChange={onChangeName} />
        </Box>
        <Box>
          <p>賞味期限
          </p>
          <Input width={"400px"} placeholder="賞味期限" onChange={onChangeExpirationDate} />
        </Box>
        <Box>
          <p>通知回数</p>
          <Input width={"400px"} placeholder="通知回数" onChange={onChangeSendingTimes} />
        </Box>
      </HStack>
      <br />
      <BaseButton onClick={onClickSearchFoodshelf}>食品検索</BaseButton>
      <br />
      <br />
      <br />
      <Heading size='lg'>検索結果</Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>食品名称</Th>
              <Th>食品番号</Th>
              <Th>設置場所</Th>
            </Tr>
          </Thead>
          {Foodshelves?.map((Foodshelf) => (
            <Tbody>
              <Tr key={Foodshelf.id}>
                <Td color={"blue"}>
                  <Link to={`/detail/${Foodshelf.id}`} state={{ id: Foodshelf.id }}>{Foodshelf.foodName}</Link>
                </Td>
                <Td >{Foodshelf.expirationDate}</Td>
                <Td>{Foodshelf.sendingTimes}</Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </Box>
  )
} 