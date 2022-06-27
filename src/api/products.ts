import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { Collection } from "../model/Collections";
import { Product } from "../model/Product";

export const GetProducts = async (userId: any) => {
  const products = await getDocs(collection(db, Collection.Products));
  const productList = products.docs.map((doc) => doc.data());

  return productList;
};

export const NewProduct = async (product: Product) => {
  const newDoc = await addDoc(collection(db, Collection.Products), product);
  product.Id = newDoc.id;
  await UpdateProduct(product);
  return newDoc;
};

export const UpdateProduct = async (product: any) => {
  const docRef = doc(db, Collection.Products, product.Id);
  await updateDoc(docRef, product);
  return await updateDoc(docRef, product);
};

export const DeleteProduct = async (product: any) => {
  const docRef = doc(db, Collection.Products, product.Id);

  return await deleteDoc(docRef);
};
