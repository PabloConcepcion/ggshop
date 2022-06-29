import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { GetProducts } from "../api/products";
import { Badge } from "../components/Badge/Badge";
import { ModalComponent } from "../components/common/Modal/Modal";
import { Header } from "../components/Header/Header";
import { ProductForm } from "../components/ProductForm/ProductForm";
import { ProductList } from "../components/ProductList/ProductList";
import { GetEmptyProduct, Product } from "../model/Product";

export const Products = () => {
  const { t } = useTranslation();
  const pageText: any = t("Products", { returnObjects: true });
  const [addingProduct, setAddingProduct] = useState(false);
  const [listProducts, setListProducts] = useState(null);
  const [listProductsFiltered, setListProductsFiltered] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(GetEmptyProduct());
  const [isDeleting, setIsDeleting] = useState(false);
  const [categories, setCategories] = useState([]);

  const styles = ProductsStyle();

  const GetProductsList = async () => {
    const list = await GetProducts(null);
    setListProducts(list);
    setListProductsFiltered(list);


    const categories = [];

    list.forEach((item: Product) => {
      if (item.Category && item.Category.length > 0 && categories.indexOf(item.Category) < 0) {
        categories.push(item.Category);
      }
    })
    if (categories.length > 0) {
      setCategories(categories);
    }
  }
  useEffect(() => {
    if (!listProducts) {
      GetProductsList();

    }
  })
  const HandleEdit = (product: Product) => {
    setSelectedProduct(product);
    setAddingProduct(!addingProduct);
  }

  const HandleDelete = (product: Product) => {
    HandleEdit(product);
    setIsDeleting(!isDeleting);
  }


  const FormCallBack = () => {
    GetProductsList();
    setAddingProduct(!addingProduct);
    setSelectedProduct(GetEmptyProduct());
  }
  const modalTitle = pageText.Title;
  const modalBody = <ProductForm
    isDeleting={isDeleting}
    callBack={FormCallBack}
    product={selectedProduct}

  />;

  const handleClick = () => {
    setAddingProduct(!addingProduct);
    setIsDeleting(false);
    setSelectedProduct(GetEmptyProduct());
  }
  return (
    <div className={styles.container}>
      <ModalComponent visible={addingProduct} onHide={handleClick} title={modalTitle} body={modalBody} />
      <div className="header">
        <Header />
        <div className={styles.button} title={pageText.BtnCreateProduct}>
          <button onClick={() => handleClick()}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
        <div
          className={styles.categories}
        >
          {categories.length > 0 &&
            listProductsFiltered.length !== listProducts.length && (
              <Badge text={pageText.Categories_All} onClick={() => setListProductsFiltered(listProducts)} />
            )}
          {categories.map((item: string, index: number) => {
            return (
              <Badge key={index} text={item} onClick={() =>
                setListProductsFiltered(
                  listProducts.filter((x) => x.Category === item)
                )} />
            );
          })}

        </div>
      </div>

      <Text h2>{pageText.Title}</Text>
      <ProductList handleDelete={HandleDelete} handleEdit={HandleEdit} productList={listProductsFiltered} />
    </div>
  );
};

const ProductsStyle = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    padding: 20,
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
  textCategory: {
    fontWeight: "bold",
    "&:hover": { cursor: "pointer", transform: "scale(1.5)" },
  },
  content: {},


  categories: {
    display: "flex",
    gap: 20
  }
});
