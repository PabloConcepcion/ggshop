import { Text } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Product } from "../../model/Product"
import { ProductCard } from "../ProductCard/ProductCard";

interface IProductList {
    productList: Product[];
    handleEdit: any;
    handleDelete: any;
}

export const ProductList = (props: IProductList) => {
    const styles = ProductListStyle();

    const { t } = useTranslation();
    const pageText: any = t("Products", { returnObjects: true });
    return <>
        <Text h2>{pageText.Title}</Text>
        <div className={styles.productList}>
            {props.productList &&
                props.productList.map((item: Product, index: number) => {
                    return (
                        <ProductCard
                            handleDelete={props.handleDelete}
                            handleEdit={props.handleEdit}
                            product={item}
                            key={index}
                        />
                    );
                })}
        </div>
    </>
}

const ProductListStyle = createUseStyles({
    productList: {
        display: "flex",
        gap: 20,
        flexWrap: "wrap"
    },
})