import { memo } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Foodshelf } from "../../types/Foodshelf";

type Props = {
  foodshelves: Array<Foodshelf>;
};

export const SearchResult = memo((props: Props) => {
  const { foodshelves } = props;


  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>食品名</Th>
              <Th>賞味期限</Th>
              <Th>通知回数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {foodshelves?.map((foodshelf) => (
              <Tr key={foodshelf.id}>
                <Td color={"blue"}>
                  <Link
                    to={`/update/${foodshelf.id}`}
                    state={{ id: foodshelf.id }}
                  >
                    {foodshelf.foodName}
                  </Link>
                </Td>
                <Td>{foodshelf.expirationDate}</Td>
                <Td>
                  {foodshelf.sendingTimes}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
});
