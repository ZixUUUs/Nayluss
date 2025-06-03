const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

const hiddenElem = document.querySelectorAll(".hidden");
hiddenElem.forEach((el) => observer.observe(el));

// select behavior and display option //
const select = document.querySelector("#supplement");
const options = document.querySelectorAll("option");
const displayOption = document.querySelector(".display-option ul");

function getOpt() {
  select.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    const list = document.createElement("li");
    list.textContent = selectedValue;
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    list.appendChild(closeBtn);
    displayOption.appendChild(list);

    const selectedOption = select.querySelector(
      `option[value="${selectedValue}"]`
    );
    selectedOption.disabled = true;

    closeBtn.addEventListener("click", () => {
      list.remove();

      selectedOption.disabled = false;
    });
  });
}
getOpt();
