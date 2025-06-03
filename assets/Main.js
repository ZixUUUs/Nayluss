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

    function saveToLocalStorage() {
      const wrapper = offrePrix.closest(".disc-offre");
      const offreName = wrapper.querySelector(".o-title h3").textContent;

      const selectedSupplements = Array.from(
        displayOption.querySelectorAll("li")
      ).map((li) => ({
        name: li.firstChild.textContent.trim(),
        price: Number(li.dataset.price),
      }));

      const offreData = {
        offreName,
        totalPrix,
        supplements: selectedSupplements,
      };
      localStorage.setItem("offreSelectionnee", JSON.stringify(offreData));
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
      saveToLocalStorage();

      closeBtn.addEventListener("click", () => {
        list.remove();
        if (selectedOption) selectedOption.disabled = false;

        totalPrix -= prixSupplement;
        updatePrix();
        saveToLocalStorage();
      });

      select.value = "";
    });

    updatePrix();
    saveToLocalStorage();
    const reserveBtn = offrePrix.querySelector(".btn-reservation");
    if (reserveBtn) {
      reserveBtn.addEventListener("click", () => {
        saveToLocalStorage();
        window.location.href = "formulaire.html";
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", getOpt);
