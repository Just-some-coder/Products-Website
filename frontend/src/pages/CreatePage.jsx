import {useState} from "react";
import {Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js"

const createPage = ()=>{
    const [newProduct, setNewProduct] = useState({
        name : "",
        price : "",
        image:""
    })

    const {createProduct} = useProductStore();

    const toast = useToast();


    const handleAddProduct = async ()=> {
        const {success, message} = await createProduct(newProduct);
        if (!success){
            toast({
                title : "Failed",
                description : message,
                status :"error",
                duration :2000
            })
        }else{
            toast({
                title:"Success",
                description : message,
                status :"success",
                duration :2000

            })
        }
        setNewProduct({name: "", image: "", price: ""})

    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing = {8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb = {8}>
                    Create New Product
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white","gray.800")} p={6} rounded={'lg'} shadow={'md'}>
                    <VStack spacing={4} >
                        <Input
                            placeholder={"Product Name"}
                            name="name"
                            value={newProduct.name}
                            onChange={(e)=>{setNewProduct({...newProduct,name:e.target.value})}}
                        />

                        <Input
                            placeholder={"Price"}
                            name="price"
                            type={"number"}
                            value={newProduct.price}
                            onChange={(e)=>{setNewProduct({...newProduct,price:e.target.value})}}
                        />

                        <Input
                            placeholder={"ImageURL"}
                            name="image"
                            value={newProduct.image}
                            onChange={(e)=>{setNewProduct({...newProduct,image:e.target.value})}}
                        />

                        <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default createPage;