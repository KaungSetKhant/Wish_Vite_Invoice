import { createProduct, productRender } from "./product.js";
import {
  addRecordQuantity,
  createRecord,
  deleteRecord,
  subRecordQuantity,
  updateRecord,
  updateRecordTotal,
} from "./record.js";
import {
  createForm,
  newProductCreateForm,
  productGroup,
  productSelect,
  recordTotal,
  rowGroup,
} from "./selectors.js";
import { products } from "./variables.js";

export const createFormHandler = (e) => {
  e.preventDefault();
  //   console.log(productSelect.value);
  //   console.log(inputQuantity.valueAsNumber);

  //get data from form
  const formData = new FormData(createForm);

  const currentProductId = parseInt(formData.get("productSelect"));
  const currentQuantity = parseInt(formData.get("inputQuantity"));

  //find loop data and get data from form
  const currentProduct = products.find((el) => el.id === currentProductId);
  console.log(currentProduct);

  //is Existed row
  const isExisted = rowGroup.querySelector(
    `[row-product-id='${currentProductId}']`
  );

  if (isExisted) {
    // const currentQuantityElement = isExisted.querySelector(".row-quantity");
    // const currentCost = isExisted.querySelector(".row-cost");
    // const currentPrice = isExisted.querySelector(".row-product-price");

    // currentQuantityElement.innerText =
    //   parseInt(currentQuantityElement.innerText) + currentQuantity;
    // currentCost.innerText =
    //   currentPrice.innerText * currentQuantityElement.innerText;
    updateRecord(isExisted.getAttribute("row-product-id"), currentQuantity);
  } else {
    //table row append
    rowGroup.append(createRecord(currentProduct, currentQuantity));
  }
  //calculate total
  // updateRecordTotal();
  createForm.reset();
};

// currentProduct = product in record.js
// currentQuantity = quantity in record.js

export const rowGroupHandler = (event) => {
  if (event.target.classList.contains("row-del-btn")) {
    deleteRecord(event);
  } else if (event.target.classList.contains("row-q-add")) {
    // addRecordQuantity(event);
    updateRecord(
      event.target.closest(".row").getAttribute("row-product-id"),
      1
    );
  } else if (event.target.classList.contains("row-q-sub")) {
    // subRecordQuantity(event);
    updateRecord(
      event.target.closest(".row").getAttribute("row-product-id"),
      -1
    );
  }
};

export const manageInventoryBtnHandler = () => {
  inventorySheet.classList.toggle("-translate-x-full");
};

export const newProductCreateFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(newProductCreateForm);
  const newProduct = {
    id: Date.now(),
    name: formData.get("new_product_name"),
    price: formData.get("new_product_price"),
  };
  // productGroup.append(createProduct(newProduct));
  // productSelect.append(new Option(newProduct.name, newProduct.id));
  products.push(newProduct);
  productRender(products);
  newProductCreateForm.reset();
};

export const printBtnHandler = () => {
  window.print();
};
