import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { DeleteProduct, NewProduct, UpdateProduct } from "../../api/products";
import { GetEmptyProduct, Product } from "../../model/Product"
import { InputCustom } from "../common/InputCustom/InputCustom"

interface IProductFormProps {
  product: Product,
  callBack: any;
  isDeleting: boolean;
}

export const ProductForm = (props: IProductFormProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(props.product);
  const { t } = useTranslation();
  const pageText: any = t("ProductForm", { returnObjects: true });
  const styles = ProductFormStyle();
  const HandleProduct = async () => {
    if (props.isDeleting) {
      await DeleteProduct(selectedProduct);
    } else {
      if (selectedProduct.Id.length > 0) {
        await UpdateProduct(selectedProduct);

      } else {
        await NewProduct(selectedProduct);
      }
    }
    props.callBack();
  };
  let txtButton = "";
  if (props.isDeleting) {
    txtButton = pageText.BtnDelete;
  }
  else {
    if (selectedProduct.Id.length > 0) {
      txtButton = pageText.BtnEdit;
    }
    else {
      txtButton = pageText.BtnAdd;
    }
  }
  const emptyProduct = GetEmptyProduct();
  const productFields = Object.keys(emptyProduct);
  return (<div className={styles.formContainer}>
    <form className={styles.addProductForm}>
      {
        productFields.map((field: string, index: number) => {
          return field !== "Id" && <InputCustom
            key={index}
            rows={field === "Description" ? 4 : 0}
            changeEvent={(e) => setSelectedProduct({ ...selectedProduct, [field]: e.target.value })}
            label={pageText[field]}
            value={selectedProduct[field]}
          />
        })
      }
      {/* <InputCustom
        changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Name: e.target.value })}
        label="Nombre del producto"
        value={selectedProduct.Name}
      />
      <InputCustom
        changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Price: e.target.value })}
        label="Precio del producto"
        value={selectedProduct.Price}
      />
      <InputCustom
        rows={4}
        changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Description: e.target.value })}
        label="Descriptcion del producto"
        value={selectedProduct.Description}
      />
      <InputCustom
        changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Images: e.target.value })}
        label="Imagen del producto"
        value={selectedProduct.Images[0]}
      /> */}
      <img className={styles.imgProduct} src={selectedProduct.Images[0]} />
      <Button type="button" onClick={() => HandleProduct()}>
        {txtButton}
      </Button>
    </form>
  </div>


  )
}


const ProductFormStyle = createUseStyles({
  formContainer: {

  },
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
  imgProduct: {
    maxWidth: 200
  }

});
