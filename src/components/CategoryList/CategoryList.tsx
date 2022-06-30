import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../../model/Product";
import { Badge } from "../Badge/Badge";


interface ICategoryListProps {
    className: string;
    onClickCategory: any;
    productList: Product[];
}
export const CategoryList = (props: ICategoryListProps) => {
    const [categories, setCategories] = useState([]);
    const [selCategory, setSelCategory] = useState("");

    const { t } = useTranslation();
    const pageText: any = t("Products", { returnObjects: true });


    if (!props.productList) {
        return null;
    }

    if (categories.length === 0 && props.productList.length > 0) {
        props.productList.forEach((item: Product) => {
            if (item.Category && item.Category.length > 0 && categories.indexOf(item.Category) < 0) {
                categories.push(item.Category);
            }
        })
        if (categories.length > 0) {
            setCategories(categories);
        }
    }



    const HandleClick = (category: string) => {
        console.log(category);
        props.onClickCategory(props.productList.filter((x) => x.Category === category))
        setSelCategory(category);
    }
    const ClearCategory = () => {
        props.onClickCategory(props.productList);
        setSelCategory("");
    }
    return <>
        <div
            className={props.className}
        >
            {categories.length > 0 &&
                selCategory.length ? (
                <Badge text={pageText.Categories_All} onClick={() => ClearCategory()} />
            ) : <></>}
            {categories.map((item: string, index: number) => {
                return (
                    <Badge key={index} text={item} onClick={() =>
                        HandleClick(item)}

                    />
                );
            })}

        </div>
    </>
}