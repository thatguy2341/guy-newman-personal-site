"use strict";

// Confirmation system:

const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const mast = document.querySelector(".masthead");
const certificateOpen = document.querySelectorAll(".certificate");
const modal = document.querySelector("#certificate-modal");

const openModal = function (modal, content, url) {
  const modalsOpen = document.querySelectorAll(".modal.active");
  modalsOpen.forEach((modalOpened) => closeModal(modalOpened));

  if (modal == null) return;
  checkSize(modal);
  const modalBody = modal.querySelector(".modal-body");

  modalBody.querySelector("#certificate-container").href = url;
  const image = modalBody.querySelector(content);

  image.classList.remove("hide");
  modal.classList.add("active");
  overlay.classList.add("active");
};

const closeModal = function (modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  modal.querySelectorAll("img").forEach((img) => img.classList.add("hide"));
};

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

const openCertificate = function (e) {
  e.preventDefault();
  const img = this.dataset.id;
  const modal = document.querySelector("#certificate-modal");
  openModal(modal, img, this.dataset.url);
};

certificateOpen.forEach((button) => {
  button.addEventListener("click", openCertificate);
});

const checkSize = function () {
  if (window.innerWidth < 600 || window.innerHeight < 400) {
    modal.classList.add("full-screen");
  } else {
    modal.classList.remove("full-screen");
  }
};

window.addEventListener("resize", checkSize);
