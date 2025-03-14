class Viselkedes {
  constructor() {
    this.viselkedesAdatok = [];
  }

  rogzitMegfigyeles(animalId, behavior, idopontok) {
    const csoportok = this.csoportositIdopontok(idopontok);
    csoportok.forEach(([start, end, duration]) => {
      this.viselkedesAdatok.push({ animalId, behavior, start, end, duration });
    });
  }

  csoportositIdopontok(idopontok) {
    const csoportok = [];
    let aktualisCsoport = [parseFloat(idopontok[0].replace(",", "."))];

    for (let i = 1; i < idopontok.length; i++) {
      const jelenlegi = parseFloat(idopontok[i].replace(",", "."));
      const elozo = parseFloat(idopontok[i - 1].replace(",", "."));
      
      if (Math.abs(jelenlegi - elozo - 0.2) < 0.01) {
        aktualisCsoport.push(jelenlegi);
      } else {
        csoportok.push([...aktualisCsoport]);
        aktualisCsoport = [jelenlegi];
      }
    }
    csoportok.push(aktualisCsoport);
    
    return csoportok.map((csoport) => {
      let start = csoport[0];
      let end = csoport[csoport.length - 1];
      let duration = csoport.length > 1 ? (end - start).toFixed(2) : "0.00";
      return [start.toString().replace(".", ","), end.toString().replace(".", ","), duration.replace(".", ",")];
    });
  }

  exportCSV() {
    let csvTartalom = "Animal ID;Behavior;Start;End;Duration\n";
    this.viselkedesAdatok.forEach(({ animalId, behavior, start, end, duration }) => {
      csvTartalom += `${animalId};${behavior};${start};${end};${duration}\n`;
    });
    const blob = new Blob([csvTartalom], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "eredmenyek.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export { Viselkedes };