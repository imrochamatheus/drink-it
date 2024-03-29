import Card from "../Card";
import { FC } from "react";

import { useDrinks } from "../../providers/DrinksProvider";
import { Center, HStack, Box, Text, Heading } from "@chakra-ui/react";
import Loader from "../Lottie";

import * as drinkLoader from "../../assets/looties/drink-loader.json";
import * as noResults from "../../assets/looties/no-results.json";

interface CardProps {
  strDrink: string;
  strDrinkThumb?: string;
  idDrink: string;
}

const Showcase: FC = () => {
  const { drinks, searchParameter, isLoading } = useDrinks();

  return (
    (drinks && (
      <Box
        px={4}
        pt={4}
        pb={2}
        maxH={"auto"}
        bg="transparent"
        maxW={{ base: "100%", md: "1200px" }}
        mx="auto"
      >
        {!isLoading ? (
          <Box>
            <Heading
              py={2}
              fontWeight={400}
              fontSize={{ base: "md", sm: "xl" }}
              lineHeight={"110%"}
              maxW={"3xl"}
              color={"black"}
            >
              {searchParameter}
            </Heading>
            <Center>
              <HStack
                direction={{ base: "column", md: "row" }}
                justify={drinks.length < 2 ? "center" : "start"}
                w={"100%"}
                overflowX="auto"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                    height: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "24px",
                  },
                }}
              >
                {drinks.map(
                  ({ strDrink, strDrinkThumb, idDrink }: CardProps) => (
                    <Box key={idDrink}>
                      <Card
                        key={idDrink}
                        {...{ strDrink, strDrinkThumb, idDrink }}
                      />
                    </Box>
                  )
                )}
              </HStack>
            </Center>
          </Box>
        ) : (
          <Loader width={150} animationData={drinkLoader} />
        )}
      </Box>
    )) || (
      <Box px={4} py={{ base: 2, md: 24 }}>
        <Center>
          <Heading
            fontWeight={300}
            fontSize={{ base: "2xl", md: "3xl" }}
            lineHeight={"110%"}
            maxW={"3xl"}
          >
            Nenhuma correspondência encontrada <br />
            <Text as={"span"} color={"white"}>
              <Loader width={150} animationData={noResults} />
            </Text>
          </Heading>
        </Center>
      </Box>
    )
  );
};

export default Showcase;
