import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    useColorModeValue,
    Text,
    useToast,
    Modal,
    useDisclosure, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Input, Button, VStack, ModalFooter
} from "@chakra-ui/react";
import {CiEdit} from "react-icons/ci";
import {FaTrashAlt} from "react-icons/fa";
import {useProductStore} from "../store/product.js"
import {useState} from "react";

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.800", "gray.200");
    const bg = useColorModeValue("white", "gray.800")

    const {deleteProduct, updateProduct} = useProductStore();

    const toast = useToast();

    const {isOpen, onOpen, onClose} = useDisclosure()

    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProduct(pid)
        if (!success) {
            toast({
                title: "Failure",
                description: message,
                status: "error",
                duration: 2000
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000
            })
        }
    }
    const handleUpdateProduct = async (pid, updatedProduct) => {

        onClose();

        const {success, message} = await updateProduct(pid, updatedProduct);

        if (!success) {
            toast({
                title: "Failure",
                description: "Server Error",
                status: "error",
                duration: 2000
            })
        } else {
            toast({
                title: "Success",
                description: "Product Updated Successfully",
                status: "success",
                duration: 2000
            })
        }
    }
    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{transform: "translateY(-5px)", shadow: "xl"}}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit="cover"/>

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>

                <Text
                    fontWeight={"bold"}
                    fontSize={"xl"}
                    color={textColor}
                    mb={4}
                >
                    ₹{product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<CiEdit/>} onClick={onOpen} colorScheme="blue"/>
                    <IconButton icon={<FaTrashAlt/>} onClick={() => handleDeleteProduct(product._id)}
                                colorScheme="red"/>
                </HStack>

            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        Update Product
                    </ModalHeader>
                    <ModalCloseButton/>
                    <VStack spacing={4}>
                        <Input
                            placeholder={"Product Name"}
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e)=>{
                                setUpdatedProduct({...updatedProduct, name : e.target.value})
                            }}
                        />

                        <Input
                            placeholder={"Price"}
                            name="price"
                            type={"number"}
                            value={updatedProduct.price}
                            onChange={(e)=>{
                                setUpdatedProduct({...updatedProduct, price : e.target.value})
                            }}

                        />

                        <Input
                            placeholder={"ImageURL"}
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e)=>{
                                setUpdatedProduct({...updatedProduct, image : e.target.value})
                            }}
                        />

                        <ModalFooter>
                            <Button colorScheme={"blue"} mr={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
                            <Button onClick={onClose} variant={"ghost"}>Cancel</Button>
                        </ModalFooter>
                    </VStack>
                </ModalContent>
            </Modal>
        </Box>

    );
}

export default ProductCard