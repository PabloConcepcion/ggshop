import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { DeleteProduct, GetProducts } from "../api/products";
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
  const [reload, setReload] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState(<></>);
  const [modalFooter, setModalFooter] = useState(<></>);

  const styles = ProductsStyle();

  const GetProductsList = async () => {
    const list = await GetProducts(null);
    setListProducts(list);
    setListProductsFiltered(list);
  }
  useEffect(() => {
    if (!listProducts) {
      GetProductsList();
      setModalTitle(pageText.Title);
      setModalBody(<ProductForm
        isDeleting={isDeleting}
        callBack={FormCallBack}
        product={selectedProduct}

      />)
    }

  })

  useEffect(() => {
    if (reload) {
      GetProductsList();
      setReload(false);
    }
  }, [reload])
  const HandleEdit = (product: Product) => {
    setSelectedProduct(product);
    setAddingProduct(!addingProduct);
  }

  const HandleDelete = (product: Product) => {
    setModalTitle(t("ProductForm.BtnDelete"));
    setModalBody(<>
      Te dispones a eliminar el producto {product.Name}<br />
      Deseas continuar?
    </>)
    setModalFooter(<>
      <Button onClick={() => RemoveProduct(product)} >
        Eliminar {product.Name}
      </Button>
    </>)

    setAddingProduct(!addingProduct);
  }


  const RemoveProduct = async (product: Product) => {
    await DeleteProduct(product);
    FormCallBack();
  }

  const FormCallBack = () => {
    GetProductsList();
    setAddingProduct(false);
    setSelectedProduct(GetEmptyProduct());
  }

  const handleClick = () => {
    setAddingProduct(false);
    setIsDeleting(false);
    setSelectedProduct(GetEmptyProduct());
  }
  return (
    <div className={styles.container}>
      <ModalComponent visible={addingProduct} onHide={handleClick} title={modalTitle} body={modalBody} actions={modalFooter} />
      <Header listProduct={listProducts} setListProductsFiltered={setListProductsFiltered} setReload={setReload} />
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
