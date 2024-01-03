import { HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = () => {

  return (
    <HStack background="teal.50" px={7} py={4} spacing={5}>
      <Heading size="lg">食品管理アプリ</Heading>
      <Link to='/search'>食品検索</Link>
      <Link to='/create'>食品登録</Link>
    </HStack>
  )
};