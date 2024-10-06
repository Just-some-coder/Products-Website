import {Box, Button, Container, Flex, HStack, Text, useColorMode} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import {CiSquarePlus} from "react-icons/ci";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";

const NavBar = ()=> {

    const {colorMode, toggleColorMode} = useColorMode()
    return (

        <Container maxW="1140px" px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDirection={{
                base: "column",
                sm: "row"
            }}>
                <Text
                    bgGradient={"linear(to-r, cyan.400, blue.500 )"}
                    fontSize = {{base: 22, sm: 28}}
                    fontWieght = {"bold"}
                    textAlign = "center"
                    textTransform = "uppercase"
                    bgClip = "text"
                >
                    <Link to={"/"}>Product Page 🛒</Link>
                </Text>

                <HStack spacing={4} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <CiSquarePlus fontSize={20}/>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon/> : <LuSun size={20} />}
                    </Button>
                </HStack>
            </Flex>


        </Container>
    );
}

export default NavBar;