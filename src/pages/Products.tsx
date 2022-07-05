import { Button, Card, gray, Row } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { DeleteProduct, GetProducts } from "../api/products";
import { CategoryList } from "../components/CategoryList/CategoryList";
import { ModalComponent } from "../components/common/Modal/Modal";
import { Header } from "../components/Header/Header";
import { ProductForm } from "../components/ProductForm/ProductForm";
import { ProductList } from "../components/ProductList/ProductList";
import { GetEmptyProduct, Product } from "../model/Product";
import { faBars, faBagShopping, faRankingStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryPanel } from "../components/CategoryPanel/CategoryPanel";

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
    setModalBody(<ProductForm
      callBack={FormCallBack}
      product={product}
    />)
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
        {/* ------ Listado de productos ------ */}
        <ProductList
          handleDelete={HandleDelete}
          handleEdit={HandleEdit}
          productList={listProductsFiltered}
        />
        {/* ------ Productos "trending/top ventas" ------ */}
        <Card css={{ minWidth: "250px" }}>
          <Card.Header className={styles.categoriesTitle}>
            <FontAwesomeIcon icon={faRankingStar} style={{ height: 20 }} />
            <h3 style={{ margin: 0 }}>Top ventas</h3>
          </Card.Header>
          <Card.Body css={{ display: "flex", gap: 20, padding: 20, flexWrap: "wrap" }}>
            {listProducts && listProducts.slice(0, 5).map(item => (
              <Card isHoverable isPressable variant="bordered">
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={item.Images}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={item.title} />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start", backgroundColor: "Gray" }}>
                  <Row wrap="wrap" justify="center" align="center">
                    <h6>{item.Name}</h6>
                  </Row>
                </Card.Footer>
              </Card>
            ))}
          </Card.Body>
        </Card>
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
    height: "100vh"
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
    gap: 20
  }

});
