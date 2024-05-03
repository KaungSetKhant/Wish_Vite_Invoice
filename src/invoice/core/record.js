import { recordTotal, rowGroup, rowTemplate } from "./selectors.js";
import Swal from "sweetalert2";

// let recordIndex = 1;

export const createRecord = ({ id, name, price }, quantity) => {
  const rowCost = price * quantity;
  const record = rowTemplate.content.cloneNode(true);

  //   record.querySelector(".row-no").innerText = recordIndex++;
  record.querySelector(".row").setAttribute("row-product-id", id);
  record.querySelector(".row-product-name").innerText = name;
  record.querySelector(".row-product-price").innerText = price;
  record.querySelector(".row-quantity").innerText = quantity;
  record.querySelector(".row-cost").innerText = rowCost;

  return record;
};

export const updateRecordTotal = () => {
  //calculate total
  const allRowCost = document.querySelectorAll(".row-cost");
  //  let total = 0;
  //  allRowCost.forEach(({innerText}) => (total += parseFloat(innerText)));
  recordTotal.innerText = [...allRowCost].reduce(
    (pv, { innerText }) => pv + parseFloat(innerText),
    0
  );
};

export const deleteRecord = (event) => {
  const row = event.target.closest(".row");
  // if (confirm("Are you sure to delete data?")) {
  //   row.remove();
  //   // updateRecordTotal();
  // }
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      row.remove();
      Swal.fire({
        icon: "success",
        title: "Remove record successfully",
        text: "Success",
        confirmButtonText: "Close Alert",
      });
    }
  });
};

export const updateRecord = (productId, q) => {
  // const row = event.target.closest(".row");
  const row = document.querySelector(`[row-product-id='${productId}']`);
  const currentQuantity = row.querySelector(".row-quantity");
  const currentCost = row.querySelector(".row-cost");
  const currentPrice = row.querySelector(".row-product-price");

  if (q > 0 || currentQuantity.innerText > 1) {
    currentQuantity.innerText = parseInt(currentQuantity.innerText) + q;
    currentCost.innerText = currentPrice.innerText * currentQuantity.innerText;
    // updateRecordTotal();
  }
};

export const addRecordQuantity = (event) => {
  const row = event.target.closest(".row");
  const currentQuantity = row.querySelector(".row-quantity");
  const currentCost = row.querySelector(".row-cost");
  const currentPrice = row.querySelector(".row-product-price");

  currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
  currentCost.innerText = currentPrice.innerText * currentQuantity.innerText;
  updateRecordTotal();
};

export const subRecordQuantity = (event) => {
  const row = event.target.closest(".row");
  const currentQuantity = row.querySelector(".row-quantity");
  const currentCost = row.querySelector(".row-cost");
  const currentPrice = row.querySelector(".row-product-price");

  if (currentQuantity.innerText > 1) {
    currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
    currentCost.innerText = currentPrice.innerText * currentQuantity.innerText;
    updateRecordTotal();
  } else {
    deleteRecord(event);
  }
};

export const recordObserver = () => {
  const run = () => {
    // console.log("you change");
    updateRecordTotal();
  };

  const observerOption = {
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(run);
  observer.observe(rowGroup, observerOption);
};
