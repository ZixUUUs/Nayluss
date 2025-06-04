document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("offreSelectionnee");
  const parsedData = JSON.parse(data);
  console.log(parsedData);

  const { offreName, totalPrix, supplements } = parsedData;

  const initialSuppTotal = supplements.reduce((acc, s) => acc + s.price, 0);
  const basePrix = totalPrix - initialSuppTotal;

  const recapDiv = document.querySelector(".offre-recap");
  const totalOffre = document.createElement("div");
  totalOffre.className = "total-offre";

  const myPrice = document.createElement("h3");
  myPrice.textContent = `${totalPrix} DA`;

  const offreTitle = document.createElement("h3");
  offreTitle.textContent = offreName;

  totalOffre.appendChild(offreTitle);
  totalOffre.appendChild(myPrice);
  recapDiv.appendChild(totalOffre);

  const hiddenName = document.createElement("input");
  hiddenName.type = "hidden";
  hiddenName.name = "offreName";
  hiddenName.value = offreName;

  const hiddenTotal = document.createElement("input");
  hiddenTotal.type = "hidden";
  hiddenTotal.name = "totalPrix";
  hiddenTotal.value = totalPrix;

  const hiddenSupps = document.createElement("input");
  hiddenSupps.type = "hidden";
  hiddenSupps.name = "supplements";
  hiddenSupps.value = supplements
    .map((s) => s.name + " (" + s.price + " DA)")
    .join(", ");

  const form = document.querySelector("form");
  form.appendChild(hiddenName);
  form.appendChild(hiddenTotal);
  form.appendChild(hiddenSupps);

  const listSupp = document.createElement("ul");
  listSupp.className = "supp-list";
  recapDiv.appendChild(listSupp);

  supplements.forEach((e) => {
    if (!e) return;

    const supp = document.createElement("li");
    const btnRemSupp = document.createElement("button");
    btnRemSupp.textContent = "X";
    supp.textContent = e.name;
    supp.appendChild(btnRemSupp);
    listSupp.appendChild(supp);

    btnRemSupp.addEventListener("click", () => {
      supp.remove();

      const index = supplements.findIndex((s) => s.name === e.name);
      if (index !== -1) {
        supplements.splice(index, 1);
      }

      const supplementsTotal = supplements.reduce((acc, s) => acc + s.price, 0);
      const newTotal = basePrix + supplementsTotal;

      hiddenTotal.value = newTotal;
      myPrice.textContent = `${newTotal} DA`;

      hiddenSupps.value = supplements
        .map((s) => s.name + " (" + s.price + " DA)")
        .join(", ");

      localStorage.setItem(
        "offreSelectionnee",
        JSON.stringify({
          offreName,
          totalPrix: newTotal,
          supplements,
        })
      );
    });
  });
});
