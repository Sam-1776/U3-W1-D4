abstract class Capo {
  id: number;
  codprod: number;
  collezione: string;
  capo: string;
  modello: number;
  quantita: number;
  colore: string;
  prezzoivaesclusa: number;
  prezzoivainclusa: number;
  disponibile: string;
  saldo: number;
  constructor(
    _id: number,
    _codprod: number,
    _collezione: string,
    _capo: string,
    _modello: number,
    _quantita: number,
    _colore: string,
    _prezzoivaesclusa: number,
    _prezzoivainclusa: number,
    _disponibile: string,
    _saldo: number
  ) {
    this.id = _id;
    this.codprod = _codprod;
    this.collezione = _collezione;
    this.capo = _capo;
    this.modello = _modello;
    this.quantita = _quantita;
    this.colore = _colore;
    this.prezzoivaesclusa = _prezzoivaesclusa;
    this.prezzoivainclusa = _prezzoivainclusa;
    this.disponibile = _disponibile;
    this.saldo = _saldo;
  }

  abstract getsaldocapo(): number;
  abstract getacquistocapo(): number;
}

class Articoli extends Capo {
  constructor(
    _id: number,
    _codprod: number,
    _collezione: string,
    _capo: string,
    _modello: number,
    _quantita: number,
    _colore: string,
    _prezzoivaesclusa: number,
    _prezzoivainclusa: number,
    _disponibile: string,
    _saldo: number
  ) {
    super(
      _id,
      _codprod,
      _collezione,
      _capo,
      _modello,
      _quantita,
      _colore,
      _prezzoivaesclusa,
      _prezzoivainclusa,
      _disponibile,
      _saldo
    );
  }

  getsaldocapo(): number {
    let prezzo = (this.prezzoivainclusa - this.saldo) / 100;
    return prezzo;
  }

  getacquistocapo(): any {
    let spesa = this.prezzoivainclusa - this.getsaldocapo();
    console.log(`Il prezzo viene ${spesa}`);
  }
}

const capo1 = new Articoli(
  1,
  2121,
  "primavera",
  "cardigan",
  1231,
  5,
  "nero",
  18.5,
  22.57,
  "negozio",
  45
);
console.log(capo1);
capo1.getacquistocapo();
let id: number = 0;

const URLA: any = "https://655f4653879575426b44fba9.mockapi.io/api/articoli";
fetch(URLA)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((element: any) => {
      if (element.id > id) {
        id = element.id;
      }
      id++;
      element = new Articoli(
        element.id,
        element.codprod,
        element.collezione,
        element.capo,
        element.modello,
        element.quantita,
        element.colore,
        element.prezzoivaesclusa,
        element.prezzoivainclusa,
        element.disponibile,
        element.saldo
      );
      console.log(element);
      element.getacquistocapo();
    });
  });

const btn = document.querySelector("button") as HTMLButtonElement;
btn!.onclick = addProdotto;

function addProdotto() {
  const codprodI = document.getElementById("codprod") as HTMLInputElement;
  const collezioneI = document.getElementById("collezione") as HTMLInputElement;
  const capoI = document.getElementById("capo") as HTMLInputElement;
  const modelloI = document.getElementById("modello") as HTMLInputElement;
  const quantitaI = document.getElementById("quantita") as HTMLInputElement;
  const coloreI = document.getElementById("colore") as HTMLInputElement;
  const prezzoivaesclusaI = document.getElementById(
    "prezzoivaesclusa"
  ) as HTMLInputElement;
  const prezzoivainclusaI = document.getElementById(
    "prezzoivainclusa"
  ) as HTMLInputElement;
  const disponibileI = document.getElementById(
    "disponibile"
  ) as HTMLInputElement;
  const saldoI = document.getElementById("saldo") as HTMLInputElement;

  const codprod = Number(codprodI.value);
  const collezione = collezioneI.value;
  const capo = capoI.value;
  const modello = Number(modelloI.value);
  const quantita = Number(quantitaI.value);
  const colore = coloreI.value;
  const prezzoivaesclusa = Number(prezzoivaesclusaI.value);
  const prezzoivainclusa = Number(prezzoivainclusaI.value);
  const disponibile = disponibileI.value;
  const saldo = Number(saldoI.value);

  const newProduct = new Articoli(
    Number(id),
    codprod,
    collezione,
    capo,
    modello,
    quantita,
    colore,
    prezzoivaesclusa,
    prezzoivainclusa,
    disponibile,
    saldo
  );

  fetch(URLA, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function cancel() {
  fetch(URLA + "/6", {
    method: "DELETE",
  });
}
/* cancel() */
