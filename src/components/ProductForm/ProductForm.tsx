import { Product } from "../../model/Product"
import { InputCustom } from "../common/InputCustom/InputCustom"

interface    IProductFormProps {
    product: Product
}

export const ProductForm = (props: IProductFormProps) =>{
    return  (
        <form className={styles.addProductForm}>
        <InputCustom
          changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Name: e.target.value })}
          label="Nombre del producto"
          value={props.product.Name}
        />
        <InputCustom
          changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Price: e.target.value })}
          label="Precio del producto"
          value={props.product.Price}
        />
        <InputCustom
          rows={4}
          changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Description: e.target.value })}
          label="Descriptcion del producto"
          value={props.product.Description}
        />
        <InputCustom
          changeEvent={(e) => setSelectedProduct({ ...selectedProduct, Images: [e.target.value] })}
          label="Imagen del producto"
          value={props.product.Images[0]}
        />
        <img src={props.product.Images[0]} />
        <button type="button" onClick={() => HandleProduct()}>
          {txtButton}
        </button>
      </form>
    )
}