import { faRankingStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "@nextui-org/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { createUseStyles } from "react-jss"
import { Product } from "../../model/Product"
import { ProductList } from "../ProductList/ProductList"


interface BestSellersProps {
    products: Product[],
    className: string;
}

export const BestSeller = (props: BestSellersProps) => {
    const { t } = useTranslation();
    const pageText: any = t("BestSellers", { returnObjects: true });
    const styles = BestSellerStyle();
    return <div className={props.className}>
        {
            props.products && props.products.length > 0 ? <Card>
                <Card.Header className={styles.categoriesTitle}>
                    <FontAwesomeIcon icon={faRankingStar} style={{ height: 20 }} />
                    <h3 style={{ margin: 0 }}>{pageText.Title}</h3>
                </Card.Header>
                <Card.Body css={{ display: "flex", gap: 20, padding: 20, flexWrap: "wrap" }}>
                    <ProductList
                        productList={props.products}
                    />
                </Card.Body>
            </Card> : <></>
        }

    </div>

}


const BestSellerStyle = createUseStyles({
    categoriesTitle: {
        display: "flex",
        alignItems: "center",
        gap: 10,
    },

});
