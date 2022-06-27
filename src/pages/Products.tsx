import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { GetProducts } from "../api/products";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductForm } from "../components/ProductForm/ProductForm";
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
      if (item.Category && item.Category.length > 0) {
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

  return (
    <div className={styles.container}>
      <div>
        {pageText.Title}
      </div>
      <div>
        {
          categories.length > 0 && listProductsFiltered.length !== listProducts.length && <button type="button" onClick={() => setListProductsFiltered(listProducts)}>{pageText.Categories_All}</button>
        }
        {

          categories.map((item: string, index: number) => {
            return <button type="button" key={index} onClick={() => setListProductsFiltered(listProducts.filter(x => x.Category === item))} >{item}</button>
          })
        }
      </div>
      <div className={styles.button}>
        <button onClick={() => setAddingProduct(!addingProduct)}>
          {pageText.BtnCreateProduct}
        </button>
      </div>
      {
        !addingProduct ? (
          <div className={styles.productList}>
            {
              listProductsFiltered && listProductsFiltered.map((item: Product, index: number) => {
                return <ProductCard handleDelete={HandleDelete} handleEdit={HandleEdit} product={item} key={index} />
              })
            }
          </div>
        ) : (
          <div >
            <ProductForm isDeleting={isDeleting} callBack={FormCallBack} product={selectedProduct} />
          </div>
        )
      }
    </div >
  );
};

const ProductsStyle = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  button: { alignSelf: "end" },
  content: {},

  productList: {
    display: "flex",
  },
});
