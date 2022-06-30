import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { GetEmptyProduct, Product } from "../../model/Product";
import { CategoryList } from "../CategoryList/CategoryList";
import { ModalComponent } from "../common/Modal/Modal";
import { ProductForm } from "../ProductForm/ProductForm";

interface IHeaderProps {
    setReload: any;
    setListProductsFiltered: any;
    listProduct: Product[]
}
export const Header = (props: IHeaderProps) => {

    const styles = HeaderStyle();
    const { t } = useTranslation();
    const pageText: any = t("Header", { returnObjects: true });
    const [showModal, setShowModal] = useState(false);

    const modalTitle = pageText.Title;
    const modalBody = <ProductForm
        callBack={() => { setShowModal(false); props.setReload(true) }
        }
        product={GetEmptyProduct()}

    />;


    return <div className={styles.headerContainer}>


        <ModalComponent visible={showModal} onHide={setShowModal} title={modalTitle} body={modalBody} />
        <div className="header">
            <Text h1>{t("Header.Title")} </Text>
            <div className={styles.button} title={pageText.BtnCreateProduct}>
                <button onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon icon={faAdd} />
                </button>
            </div>
            <CategoryList className={styles.categories} onClickCategory={props.setListProductsFiltered} productList={props.listProduct} />
        </div>
    </div>

}


const HeaderStyle = createUseStyles({
    headerContainer: {

    },
    button: {
        boxShadow: "0px 0px 4px grey",
        width: "fit-content",
        display: "flex",
        borderRadius: 20,
        margin: 10,
        float: "right",

        "& button": {
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
        }
    },
    title: {
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        backgroundColor: "grey",
        padding: 20,
        borderRadius: 20,
    },
    textCategory: {
        fontWeight: "bold",
        "&:hover": { cursor: "pointer", transform: "scale(1.5)" },
    },
    categories: {
        display: "flex",
        gap: 20
    }
})