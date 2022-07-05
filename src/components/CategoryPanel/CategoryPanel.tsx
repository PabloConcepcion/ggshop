import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "@nextui-org/react"
import React from "react"
import { createUseStyles } from "react-jss"
import { Product } from "../../model/Product"
import { CategoryList } from "../CategoryList/CategoryList"


interface CategoryPanelProps {
    setListProductsFiltered: any;
    listProduct: Product[]
}

export const CategoryPanel = (props: CategoryPanelProps) => {

    const styles = CategoryPanelStyle();
    return <>
        {/* ------ Categorías ------ */}
        <Card css={{ width: "flex-basis: 15%" }}>
            <Card.Header className={styles.categoriesTitle}>
                <FontAwesomeIcon icon={faBars} style={{ height: 20 }} />
                <h3 style={{ margin: 0 }}>Categorías</h3>
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
        gap: 20
    },

    categoriesTitle: {
        display: "flex",
        alignItems: "center",
        gap: 10
    },

})
