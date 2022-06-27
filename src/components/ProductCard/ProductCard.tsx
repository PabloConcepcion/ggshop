import React from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Product } from "../../model/Product"

interface IProductCardProps {
    product: Product;
    handleEdit: any;
    handleDelete: any;
}


export const ProductCard = (props: IProductCardProps) => {
    const styles = ProductCardStyle();
    const { t } = useTranslation();
    const pageText: any = t("ProductForm", { returnObjects: true });

    return <div className={styles.productItem}>
        {props.product.Name}
        <br />
        {props.product.Price}
        <br />
        {props.product.Description}
        <br /> <div>
            {props.product.Images && props.product.Images.length > 0 && <img src={props.product.Images} alt={props.product.Name} />}
        </div>
        <button type="button" onClick={() => props.handleEdit(props.product)}>{pageText.BtnEdit}</button>
        <button type="button" onClick={() => props.handleDelete(props.product)}>{pageText.BtnDelete}</button>
    </div>
}



const ProductCardStyle = createUseStyles({

    productItem: {
        textAlign: "center",
        "& div": {
            maxWidth: 300,
            paddingTop: 20
        },
        "& img": {
            maxWidth: "100%"
        }
    }
});
