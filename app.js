"use strict";
window.addEventListener("DOMContentLoaded", () => {
  const defaultSlide = document.querySelector(".default-slide");
  const form = document.querySelector("form");
  const nextBtns = document.getElementsByClassName("next");
  const prevBtns = document.getElementsByClassName("prev");
  const progressBars = document.getElementsByClassName("step");
  const slides = document.querySelectorAll(".slide");
  // console.log(slides)

  const radioElements = document.querySelectorAll("input[type=radio]");
  const labelElements = document.querySelectorAll("label");
  const confirmSubmitBtn = document.getElementById("confirm-submit");
  const returnToEdithBtn = document.getElementById("return-to-edit");

  let currentSlide = 1;

  // Handle next buttons click
  for (let i = 0; i <= nextBtns.length - 1; i++) {
    nextBtns[i].addEventListener("click", (e) => {
      if (i === nextBtns.length - 1) {
        e.preventDefault();

        // preview form at the end of the slide
        progressForward();
        previewForm();
      } else {
        // slide forward
        e.preventDefault();
        slideForward(i);
        progressForward();
      }
    });
  }
  // handle previous button click
  for (let i = 0; i <= prevBtns.length - 1; i++) {
    prevBtns[i].addEventListener("click", (e) => {
      e.preventDefault();
      slideBackward(i);
      progressBackward();
    });
  }

  confirmSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    location.replace("submit.html");
  });

  returnToEdithBtn.addEventListener("click", (e) => {
    e.preventDefault();
    progressBackward();
    returnToEdithForm();
  });

  function slideForward(slideIndex) {
    slides.forEach((slide, index) => {
      if (index === slideIndex + 1) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });
  }
  function slideBackward(btnIndex) {
    slides.forEach((slide, index) => {
      if (index === btnIndex) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });
  }

  function progressForward() {
    progressBars[currentSlide - 1].classList.add("active");
    currentSlide += 1;
  }

  function progressBackward() {
    progressBars[currentSlide - 2].classList.remove("active");
    currentSlide -= 1;
  }

  function previewForm() {
    form.classList.remove("slide-mode");
    form.classList.add("preview-mode");

    //display all slides
    slides.forEach((slide) => {
      slide.style.display = "block";
    });

    //disable radio buttons
    for (let i = 0; i < radioElements.length; i++) {
      radioElements[i].setAttribute("disabled", "true");
    }

    // disable label elements
    for (let i = 0; i < labelElements.length; i++) {
      labelElements[i].setAttribute(
        "for",
        `${labelElements[i].getAttribute("for") + "1"}`
      );
    }
  }

  function returnToEdithForm() {
    form.classList.add("slide-mode");
    form.classList.remove("preview-mode");

    slides.forEach((slide, index) => {
      if (index === currentSlide - 1) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });

    //enable radio buttons
    for (let i = 0; i < radioElements.length; i++) {
      radioElements[i].setAttribute("disabled", "false");
    }
    //enable label buttons
    for (let i = 0; i < labelElements.length; i++) {
      labelElements[i].setAttribute(
        "for",
        `${labelElements[i].getAttribute("for").slice(0, -1)}`
      );
    }
  }
  // rental income add
  const rentalIncome = document.querySelector("#rental-income");
  const rentalIncomeEntries = document.querySelector("#rental-income-entries");
  const rentalIncomeAdd = document.querySelector(".rental-income-add");
  const totalRentalIncome = document.querySelector("#total-rental-income");
  const rentalIncomeList = [];

  rentalIncomeAdd.addEventListener("click", (e) => {
    e.preventDefault();
    if (rentalIncome.value && !isNaN(rentalIncome.value)) {
      rentalIncomeList.push(parseInt(rentalIncome.value));
      rentalIncomeEntries.insertAdjacentHTML(
        "beforeend",
        `<li>Property ${rentalIncomeList.length}: ${rentalIncome.value}</li>`
      );

      rentalIncome.value = "";
      totalRentalIncome.textContent = rentalIncomeList.reduce(
        (a, b) => a + b,
        0
      );
    }
  });

  // personal loan add
  const personalLoanEntries = document.querySelector(".personal-loan-entries");
  const personalLoanBank = document.querySelector(".personal-loan .bank-name");
  const personalLoanOutstanding = document.querySelector(
    ".personal-loan .loan-outstanding"
  );
  const personalLoanInstallment = document.querySelector(
    ".personal-loan .monthly-installment"
  );
  const personalLoanAdd = document.querySelector(".personal-loan .add-new");
  const personalLoanList = [];

  personalLoanAdd.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      personalLoanBank.value &&
      personalLoanOutstanding.value &&
      personalLoanInstallment.value
    ) {
      personalLoanList.push({
        bank: personalLoanBank.value,
        outstanding: personalLoanOutstanding.value,
        installment: personalLoanInstallment.value,
      });
      personalLoanEntries.insertAdjacentHTML(
        "beforeend",
        AddTemplate(
          personalLoanBank.value,
          personalLoanOutstanding.value,
          personalLoanInstallment.value
        )
      );
      personalLoanBank.value = "";
      personalLoanOutstanding.value = "";
      personalLoanInstallment.value = "";
    }
  });
  // home loan add
  const homeLoanEntries = document.querySelector(".home-loan-display");
  const homeLoanBank = document.querySelector(".home-loan .bank-name");
  const homeLoanOutstanding = document.querySelector(
    ".home-loan .loan-outstanding"
  );
  const homeLoanInstallment = document.querySelector(
    ".home-loan .monthly-installment"
  );
  const homeLoanAdd = document.querySelector(".home-loan .add-new");
  const homeLoanList = [];

  homeLoanAdd.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      homeLoanBank.value &&
      homeLoanOutstanding.value &&
      homeLoanInstallment.value
    ) {
      homeLoanList.push({
        bank: homeLoanBank.value,
        outstanding: homeLoanOutstanding.value,
        installment: homeLoanInstallment.value,
      });
      homeLoanEntries.insertAdjacentHTML(
        "beforeend",
        AddTemplate(
          homeLoanBank.value,
          homeLoanOutstanding.value,
          homeLoanInstallment.value
        )
      );
      homeLoanBank.value = "";
      homeLoanOutstanding.value = "";
      homeLoanInstallment.value = "";
    }
  });
  //  Credit Card add
  const creditCardEntries = document.querySelector(".credit-card-display");
  const creditCardBank = document.querySelector(".credit-card .bank-name");
  const creditCardLimit = document.querySelector(".credit-card .card-limit");

  const creaditCardAdd = document.querySelector(".credit-card .add-new");
  const creditCardList = [];

  creaditCardAdd.addEventListener("click", (e) => {
    e.preventDefault();
    if (creditCardLimit.value && creditCardBank.value) {
      creditCardList.push({
        bank: creditCardBank.value,
        limit: creditCardLimit.value,
      });
      creditCardEntries.insertAdjacentHTML(
        "beforeend",
        `
      <li>${creditCardBank.value}
        <ul>
            <li>credit limit: ${creditCardLimit.value}</li>
        </ul>
      </li>
      `
      );
      creditCardBank.value = "";
      creditCardLimit.value = "";
    }
  });

  // home loan add
  const autoLoanEntries = document.querySelector(".auto-loan-display");
  const autoLoanBank = document.querySelector(".auto-loan .bank-name");
  const autoLoanOutstanding = document.querySelector(
    ".auto-loan .loan-outstanding"
  );
  const autoLoanInstallment = document.querySelector(
    ".auto-loan .monthly-installment"
  );
  const autoLoanAdd = document.querySelector(".auto-loan .add-new");
  const autoLoanList = [];

  autoLoanAdd.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(autoLoanBank);
    if (
      autoLoanBank.value &&
      autoLoanOutstanding.value &&
      autoLoanInstallment.value
    ) {
      autoLoanList.push({
        bank: autoLoanBank.value,
        outstanding: autoLoanOutstanding.value,
        installment: autoLoanInstallment.value,
      });
      autoLoanEntries.insertAdjacentHTML(
        "beforeend",
        AddTemplate(
          autoLoanBank.value,
          autoLoanOutstanding.value,
          autoLoanInstallment.value,
          "cardlimit"
        )
      );
      autoLoanBank.value = "";
      autoLoanOutstanding.value = "";
      autoLoanInstallment.value = "";
    }
  });

  function AddTemplate(bank, outstanding, installment, cardlimit) {
    return `
      <li>${bank}
        <ul>
            <li> ${
              cardlimit ? "Card Limit" : "Outstanding"
            }: ${outstanding}</li>
            <li>Installment: ${installment}</li>
        </ul>
      </li>
      `;
  }
});
