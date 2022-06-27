import { Card, Col, Row, Button, Text, Tooltip } from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Product } from "../../model/Product";
import { faTrash, faPen, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProductCardProps {
  product: Product;
  handleEdit: any;
  handleDelete: any;
}

export const ProductCard = (props: IProductCardProps) => {
  const styles = ProductCardStyle();
  const { t } = useTranslation();
  const pageText: any = t("ProductForm", { returnObjects: true });

  // return <div className={styles.productItem}>
  //     {props.product.Name}
  //     <br />
  //     {props.product.Price}
  //     <br />
  //     {props.product.Description}
  //     <br /> <div>
  //         {props.product.Images && props.product.Images.length > 0 && <img src={props.product.Images} alt={props.product.Name} />}
  //     </div>
  //     <button type="button" onClick={() => props.handleEdit(props.product)}>{pageText.BtnEdit}</button>
  //     <button type="button" onClick={() => props.handleDelete(props.product)}>{pageText.BtnDelete}</button>
  // </div>

  return (
    <Card css={{ w: "500px", h: "500px" }}>
      <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
            {props.product.Category}
          </Text>
          <Text h3 color="black">
            {props.product.Name}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={props.product.Images}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"   
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: "absolute",
          bgBlur: "#ffffff66",
          borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text h2 color="#000">
              {props.product.Price}
            </Text>
            <Text color="#000" size={20}>
              {props.product.Description}
            </Text>
          </Col>
          <Col className={styles.columnOptions}>
              <Tooltip content={"Editar producto"} rounded color="warning">
                <Button
                  flat
                  auto
                  rounded
                  color="warning"
                  onClick={() => props.handleEdit(props.product)}
                >
                  <FontAwesomeIcon icon={faPen} color="warning" />
                </Button>
              </Tooltip>
              <Tooltip content={"Eliminar producto"} rounded color="error">
                <Button
                  flat
                  auto
                  rounded
                  color="error"
                  css={{marginTop: 10}}
                  onClick={() => props.handleDelete(props.product)}
                >
                  <FontAwesomeIcon icon={faTrash} color="error" />
                </Button>
              </Tooltip>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

const ProductCardStyle = createUseStyles({
  productItem: {
    textAlign: "center",
    "& div": {
      maxWidth: 300,
      paddingTop: 20,
    },
    "& img": {
      maxWidth: "100%",
    },
  },

  columnOptions: {
    display: "flex",
    justifyContent: "end",
    flexDirection: "column",
    padding: 10,
    width: "20%"
  }
});
