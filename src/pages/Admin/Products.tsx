import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { GetProducts, NewProduct } from "../../api/products";
import { InputCustom } from "../../components/common/InputCustom/InputCustom";
import { GetEmptyProduct, Product } from "../../model/Product";

export const Products = () => {
  const [addingProduct, setAddingProduct] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImg, setProductImg] = useState("");
  const [listProducts, setListProducts] = useState(null);

  const styles = ProductsStyle();
  const AddProduct = async () => {
    const newProduct = GetEmptyProduct();
    newProduct.Name = productName;
    newProduct.Price = productPrice;
    newProduct.Description = productDescription;
    newProduct.Images.push(productImg);

    const newProductAdded = await NewProduct(newProduct);
    GetProductsList();
    setAddingProduct(!addingProduct)
  };
  const GetProductsList = async () => {
    const list = await GetProducts(null);
    setListProducts(list)
  }
  useEffect(() => {
    if (!listProducts) {
      GetProductsList();

    }
  })
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <button onClick={() => setAddingProduct(!addingProduct)}>
          Crear producto
        </button>
      </div>
      {!addingProduct ? (
        <div className={styles.productList}>
          {
            listProducts && listProducts.map((item: Product, index: number) => {
              return <div className={styles.productItem}>
                {item.Name}
                <br />
                {item.Price}
                <br />
                {item.Description}
                <br /> <div>
                  {item.Images && item.Images.length > 0 && item.Images.map((img: string, indexImg: number) => {
                    return <img src={img} key={indexImg} alt={item.Name} />
                  })
                  }

                </div>
              </div>
            })
          }
        </div>
      ) : (
        <div className={styles.addProductForm}>
          <form>
            <InputCustom
              changeEvent={(e) => setProductName(e.target.value)}
              label="Nombre del producto"
              value=""
            />
            <InputCustom
              changeEvent={(e) => setProductPrice(e.target.value)}
              label="Precio del producto"
              value=""
            />
            <InputCustom
              changeEvent={(e) => setProductDescription(e.target.value)}
              label="Descriptcion del producto"
              value=""
            />
            <InputCustom
              changeEvent={(e) => setProductImg(e.target.value)}
              label="Imagen del producto"
              value=""
            />
            <button type="button" onClick={() => AddProduct()}>
              Añadir
            </button>
          </form>
        </div>
      )}
    </div>
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
  addProductForm: {},
  productList: {
    display: "flex",
  },
  productItem: {
    textAlign: "center",
    "& div": {
      maxWidth: 300,
      paddingTop: 20
    },
    "& img": {
      maxWidth: "100%"
    }
  }
});
