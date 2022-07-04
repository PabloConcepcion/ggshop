import { Text } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Product } from "../../model/Product"
import { ProductCard } from "../ProductCard/ProductCard";
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProductList {
    productList: Product[];
    handleEdit: any;
    handleDelete: any;
}

export const ProductList = (props: IProductList) => {
    const styles = ProductListStyle();

    const { t } = useTranslation();
    const pageText: any = t("Products", { returnObjects: true });
    return (
      <>
        <div>
          <div className={styles.title}>
            <FontAwesomeIcon icon={faBagShopping} style={{ height: 40 }} />
            <Text h2 style={{margin:0}}>{pageText.Title}</Text>
          </div>
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
        </div>
      </>
    );
}

const ProductListStyle = createUseStyles({
    productList: {
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        width: "100%",
        marginTop: 20
    },

    title: {
      display: "flex",
      alignContent: "center",
      gap: 10
    },
})