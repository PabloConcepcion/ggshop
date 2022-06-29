import { Text } from "@nextui-org/react"
import React from "react"
import { createUseStyles } from "react-jss"
import { Product } from "../../model/Product"

interface IProductInfo {
    product: Product
}
export const ProductInfo = (props: IProductInfo) => {
    const styles = ProductInfoStyles();
    return <>
        <div className={styles.productInfoContainer}>
            <Text size={12} weight="bold" transform="uppercase" color="#252525">
                {props.product.Category}
            </Text>
            <Text h2 color="#000">
                {props.product.Price}
            </Text>
            <Text color="#000" size={20}>
                {props.product.Description}
            </Text>
            <img src={props.product.Images} alt={props.product.Name} />
        </div>
    </>
}

const ProductInfoStyles = createUseStyles({
    productInfoContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& img ": {
            maxWidth: 400,
            marginTop: 20
        }
    }
})