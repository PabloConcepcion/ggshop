import { Card, Col, Row, Button, Text, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { Product } from "../../../model/Product";
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalComponent } from "../../common/Modal/Modal";
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

  const isBestSeller = !props.handleEdit && !props.handleDelete;
  return (
    <>
      <Card className={isBestSeller ? styles.bestSellers : styles.cardContainer} isHoverable isPressable onClick={() => setShowModal(true)}>
        <Card.Body css={{ p: 0 }}>
          <div style={{ backgroundImage: "url('" + props.product.Images + "')" }} className={styles.cardImage}></div>
        </Card.Body>
        {
          !isBestSeller ? <Card.Footer
            isBlurred
            className={styles.productCardFooter}

          >
            <Row className={styles.productData}>
              <Col  >
                <Text size={12} weight="bold" transform="uppercase" color="#252525">
                  {props.product.Category}
                </Text>
                <Text h4 color="black">
                  {props.product.Name}
                </Text>
                <Text h3 color="#000">
                  {props.product.Price}
                </Text>

              </Col>
              <Col className={styles.columnOptions}>
                {
                  props.handleEdit && <Tooltip content={pageText.BtnEdit} rounded color="warning">
                    <Button
                      flat
                      auto
                      rounded
                      color="warning"
                      onClick={() => props.handleEdit(props.product)}
                      className={styles.btnAction}
                    >
                      <FontAwesomeIcon icon={faPen} color="warning" />
                    </Button>
                  </Tooltip>
                }
                {
                  props.handleDelete && <Tooltip content={pageText.BtnDelete} rounded color="error">
                    <Button
                      flat
                      auto
                      rounded
                      color="error"
                      css={{ marginTop: 10 }}
                      onClick={() => props.handleDelete(props.product)}
                      className={styles.btnAction}
                    >
                      <FontAwesomeIcon icon={faTrash} color="error" />
                    </Button>
                  </Tooltip>
                }

              </Col>
            </Row>
            <Row>
              <Text title={props.product.Description} className={styles.productDescription} color="#000" size={16}>
                {props.product.Description}
              </Text>
            </Row>
          </Card.Footer> : <Card.Footer css={{ justifyItems: "flex-start", backgroundColor: "Gray" }}>
            <Row wrap="wrap" justify="center" align="center">
              <Text h6 >
                {props.product.Name}
              </Text>
            </Row>
          </Card.Footer>
        }

      </Card>
      <ModalComponent visible={showModal} onHide={() => { setShowModal(!showModal) }} title={modalTitle} body={modalBody} />
    </>
  );
};

const ProductCardStyle = createUseStyles({
  cardContainer: {
    width: 250
  },
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
  cardImage: {
    width: "100%",
    height: 400,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  productDescription: {
    textOverflow: "ellipsis",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  columnOptions: {
    width: "auto"
  },
  productCardFooter: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    backdropFilter: "saturate(180%) blur(10px)",
    background: "rgba(255, 255, 255, 0.4)",
    borderTop: "var(--nextui-borderWeights-light) solid rgba(255, 255, 255, 0.2)",
    bottom: 0,
    zIndex: 1

  },
  productData: {
    display: "flex",
    justifyContent: "space-between"
  },
  btnAction: {
    padding: 0,
    width: 40
  },
  bestSellers:
  {
    height: 200,
    width: 200
  }
});
