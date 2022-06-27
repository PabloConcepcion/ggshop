import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { DeleteProduct, GetProducts, NewProduct, UpdateProduct } from "../../api/products";
import { InputCustom } from "../../components/common/InputCustom/InputCustom";
import { ProductForm } from "../../components/ProductForm/ProductForm";
import { GetEmptyProduct, Product } from "../../model/Product";

export const Products = () => {
  const [addingProduct, setAddingProduct] = useState(false);
  const [listProducts, setListProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<Product>(GetEmptyProduct());
  const [isDeleting, setIsDeleting] = useState(false);

  const styles = ProductsStyle();
  const HandleProduct = async () => {
    if (isDeleting) {
      await DeleteProduct(selectedProduct);
    } else {
      if (selectedProduct.Id.length > 0) {
        await UpdateProduct(selectedProduct);

      } else {
        await NewProduct(selectedProduct);
      }
    }


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
  const HandleEdit = (product: Product) => {
    setSelectedProduct(product);
    setAddingProduct(!addingProduct);
  }

  const HandleDelete = (product: Product) => {
    HandleEdit(product);
    setIsDeleting(!isDeleting);
  }
  let txtButton = "";
  if (isDeleting) {
    txtButton = "Eliminar";
  }
  else {
    if (selectedProduct.Id.length > 0) {
      txtButton = "Actualizar";
    }
    else {
      txtButton = "Añadir";
    }
  }
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
                <button type="button" onClick={() => HandleEdit(item)}>Editar</button>
                <button type="button" onClick={() => HandleDelete(item)}>Eliminar</button>
              </div>
            })
          }
        </div>
      ) : (
        <div >
         <ProductForm product={selectedProduct}/>
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
  addProductForm: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    "& div": {
      display: "flex",
      flexDirection: "column",
      gap: 15
    }
  },
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
