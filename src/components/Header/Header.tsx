import { Button, Text } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Product } from "../../model/Product";


export const Header = () => {

    const styles = HeaderStyle();
    const { t } = useTranslation();
    const pageText: any = t("Header", { returnObjects: true });

    return <div className={styles.headerContainer}>
        <Text h1>{pageText.Title} </Text>

    </div>

}


const HeaderStyle = createUseStyles({
    headerContainer: {
        display: "flex"
    },
    button: {
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        backgroundColor: "transparent",
        padding: 20,
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
})