import { Viselkedes } from "./viselkedes.js";
import { frissitTabla } from "./fuggvenyek.js";

const viselkedes = new Viselkedes();

document.getElementById("hozzaad-button").addEventListener("click", () => {
  const animalId = document.getElementById("animal-id").value.trim();
  const behavior = document.getElementById("behavior").value.trim();
  const idopontok = document.getElementById("duration").value.trim().split("\n");

  if (animalId && behavior && idopontok.length) {
    viselkedes.rogzitMegfigyeles(animalId, behavior, idopontok);
    frissitTabla(viselkedes);
  }
});

document.getElementById("export-csv").addEventListener("click", () => viselkedes.exportCSV());
