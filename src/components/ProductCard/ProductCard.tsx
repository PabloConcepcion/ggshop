import { Card, Col, Row, Button, Text, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Product } from "../../model/Product";
import { faTrash, faPen, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalComponent } from "../common/Modal/Modal";
import { ProductInfo } from "../ProductInfo/ProductInfo";

interface IProductCardProps {
  product: Product;
  handleEdit: any;
  handleDelete: any;
}

export const ProductCard = (props: IProductCardProps) => {
  const styles = ProductCardStyle();
  const { t } = useTranslation();
  const pageText: any = t("ProductForm", { returnObjects: true });
  const [showModal, setShowModal] = useState(false);


  const modalBody = <ProductInfo product={props.product} />;
  const modalTitle = props.product.Name;
  return (
    <>
      <Card css={{ w: "400px", h: "400px" }} isHoverable isPressable onClick={() => setShowModal(true)}>
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
              <Text size={12} weight="bold" transform="uppercase" color="#252525">
                {props.product.Category}
              </Text>
              <Text h3 color="black">
                {props.product.Name}
              </Text>
              <Text h2 color="#000">
                {props.product.Price}
              </Text>
              <Text color="#000" size={20}>
                {props.product.Description}
              </Text>
            </Col>
            <Col className={styles.columnOptions}>
              <Tooltip content={pageText.BtnEdit} rounded color="warning">
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
              <Tooltip content={pageText.BtnDelete} rounded color="error">
                <Button
                  flat
                  auto
                  rounded
                  color="error"
                  css={{ marginTop: 10 }}
                  onClick={() => props.handleDelete(props.product)}
                >
                  <FontAwesomeIcon icon={faTrash} color="error" />
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
      <ModalComponent visible={showModal} onHide={() => { setShowModal(!showModal) }} title={modalTitle} body={modalBody} />
    </>
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
