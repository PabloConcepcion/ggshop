import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Text } from "@nextui-org/react"
import React from "react"
import { useTranslation } from "react-i18next"
import { createUseStyles } from "react-jss"
import { Product } from "../../model/Product"
import { CategoryList } from "./CategoryList/CategoryList"


interface CategoryPanelProps {
    setListProductsFiltered: any;
    listProduct: Product[]
}

export const CategoryPanel = (props: CategoryPanelProps) => {

    const { t } = useTranslation();
    const pageText: any = t("Category", { returnObjects: true });
    const styles = CategoryPanelStyle();

    if (!props.listProduct) {
        return <></>
    }
    return <>
        <Card className={styles.categoryPanel}>
            <Card.Header className={styles.categoriesTitle}>
                <FontAwesomeIcon icon={faBars} style={{ height: 15 }} />
                <Text h3>
                    {pageText.Title}
                </Text>
            </Card.Header>
            <Card.Body>
                <CategoryList
                    className={styles.categories}
                    onClickCategory={props.setListProductsFiltered}
                    productList={props.listProduct}
                />
            </Card.Body>
        </Card>
    </>
}



const CategoryPanelStyle = createUseStyles({
    categories: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        "@media screen and (max-width: 768px)": {
            flexDirection: "row"
        },
        flexWrap: "wrap"
    },

    categoriesTitle: {
        display: "flex",
        alignItems: "center",
        gap: 10
    },
    categoryPanel: {

        minWidth: "fit-content",
        maxWidth: "min-content",
        height: "fit-content",
        "@media screen and (max-width: 768px)": {
            flexDirection: "column"
        }
    }

})
