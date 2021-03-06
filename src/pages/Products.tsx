import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { DeleteProduct, GetProducts } from "../api/products";
import { ModalComponent } from "../components/common/Modal/Modal";
import { Header } from "../components/Header/Header";
import { ProductForm } from "../components/ProductList/ProductForm/ProductForm";
import { ProductList } from "../components/ProductList/ProductList";
import { GetEmptyProduct, Product } from "../model/Product";
import { CategoryPanel } from "../components/CategoryPanel/CategoryPanel";
import { BestSeller } from "../components/BestSellers/BestSeller";

export const Products = () => {
  const { t } = useTranslation();
  const pageText: any = t("Products", { returnObjects: true });
  const [addingProduct, setAddingProduct] = useState(false);
  const [listProducts, setListProducts] = useState(null);
  const [listProductsFiltered, setListProductsFiltered] = useState(null);
  const [bestSellers, setBestSellers] = useState(null);
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
    setBestSellers(list.slice(list.length / 2, list.length - 1));

  }

  useEffect(() => {
    if (!listProducts) {
      GetProductsList();
      setModalTitle(pageText.Title);
      setModalBody(<ProductForm
        isDeleting={isDeleting}
        callBack={FormCallBack}
        product={selectedProduct}
      />);
      setModalFooter(<></>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (reload) {
      GetProductsList();
      setReload(false);
    }
  }, [reload])
  const HandleEdit = (product: Product) => {
    setSelectedProduct(product);
    setAddingProduct(!addingProduct);
    setModalBody(<ProductForm
      callBack={FormCallBack}
      product={product}
    />);
    setModalFooter(<></>);
  }

  const HandleDelete = (product: Product) => {
    setModalTitle(t("ProductForm.BtnDelete"));
    setModalBody(<><div dangerouslySetInnerHTML={{ __html: t("ProductForm.DeleteModalDescription").replace("{0}", product.Name) }}></div></>)
    setModalFooter(<>
      <Button onClick={() => RemoveProduct(product)} >
        {t("ProductForm.BtnDelete")} {product.Name}
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
      <ModalComponent
        visible={addingProduct}
        onHide={handleClick}
        title={modalTitle}
        body={modalBody}
        actions={modalFooter}
      />
      <Header
        listProduct={listProducts}
        setListProductsFiltered={setListProductsFiltered}
        setReload={setReload}
      />
      <div className={styles.home}>
        <CategoryPanel listProduct={listProducts}
          setListProductsFiltered={setListProductsFiltered} />

        <ProductList
          handleDelete={HandleDelete}
          handleEdit={HandleEdit}
          productList={listProductsFiltered}
          title={pageText.Title}
        />

        <BestSeller className={styles.bestSellers} products={bestSellers} />
      </div>
    </div>
  );
};

const ProductsStyle = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#dfdfdf",
  },
  textCategory: {
    fontWeight: "bold",
    "&:hover": { cursor: "pointer", transform: "scale(1.5)" },
  },
  content: {},

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

  home: {
    display: "flex",
    padding: 20,
    gap: 20,
    justifyContent: "space-between",
    "@media screen and (max-width: 768px)": {
      flexDirection: "column"
    }
  },
  bestSellers: {
    width: "20%",
    maxWidth: "min-content",
    "@media screen and (max-width: 768px)": {
      display: "none"
    }
  }

});

