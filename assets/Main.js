const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElem = document.querySelectorAll(".hidden");
hiddenElem.forEach((el) => observer.observe(el));

// select options behaviour and price update //

function getOpt() {
  const selects = document.querySelectorAll(".supplement-select");

  selects.forEach((select) => {
    const selectContainer = select.closest(".select-container");
    const offrePrix = selectContainer.closest(".offre-prix");
    const displayOption = selectContainer.querySelector(".display-option ul");
    const prix = offrePrix.querySelector(".prix h4");

    let totalPrix = Number(prix.textContent) || 0;

    function updatePrix() {
      prix.textContent = totalPrix;
    }

    select.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      const selectedOption = select.querySelector(
        `option[value="${selectedValue}"]`
      );
      const prixSupplement = selectedOption
        ? Number(selectedOption.dataset.price) || 0
        : 0;

      const list = document.createElement("li");
      list.textContent = selectedValue + " ";
      list.dataset.price = prixSupplement;

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "X";
      list.appendChild(closeBtn);
      displayOption.appendChild(list);

      if (selectedOption) selectedOption.disabled = true;

      totalPrix += prixSupplement;
      updatePrix();

      closeBtn.addEventListener("click", () => {
        list.remove();
        if (selectedOption) selectedOption.disabled = false;

        totalPrix -= prixSupplement;
        updatePrix();
      });

      select.value = "";
    });

    updatePrix();
  });
}
document.addEventListener("DOMContentLoaded", getOpt);
