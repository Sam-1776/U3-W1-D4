var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Capo = /** @class */ (function () {
    function Capo(_id, _codprod, _collezione, _capo, _modello, _quantita, _colore, _prezzoivaesclusa, _prezzoivainclusa, _disponibile, _saldo) {
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
    return Capo;
}());
var Articoli = /** @class */ (function (_super) {
    __extends(Articoli, _super);
    function Articoli(_id, _codprod, _collezione, _capo, _modello, _quantita, _colore, _prezzoivaesclusa, _prezzoivainclusa, _disponibile, _saldo) {
        return _super.call(this, _id, _codprod, _collezione, _capo, _modello, _quantita, _colore, _prezzoivaesclusa, _prezzoivainclusa, _disponibile, _saldo) || this;
    }
    Articoli.prototype.getsaldocapo = function () {
        var prezzo = (this.prezzoivainclusa - this.saldo) / 100;
        return prezzo;
    };
    Articoli.prototype.getacquistocapo = function () {
        var spesa = this.prezzoivainclusa - this.getsaldocapo();
        console.log("Il prezzo viene ".concat(spesa));
    };
    return Articoli;
}(Capo));
var capo1 = new Articoli(1, 2121, "primavera", "cardigan", 1231, 5, "nero", 18.5, 22.57, "negozio", 45);
console.log(capo1);
capo1.getacquistocapo();
var URLA = "https://655f4653879575426b44fba9.mockapi.io/api/articoli";
fetch(URLA)
    .then(function (resp) { return resp.json(); })
    .then(function (data) {
    console.log(data);
    data.forEach(function (element) {
        element = new Articoli(element.id, element.codprod, element.collezione, element.capo, element.modello, element.quantita, element.colore, element.prezzoivaesclusa, element.prezzoivainclusa, element.disponibile, element.saldo);
        element.getacquistocapo();
    });
});
var btn = document.querySelector("button");
btn.onclick = addProdotto;
function addProdotto() {
    var codprodI = document.getElementById("codprod");
    var collezioneI = document.getElementById("collezione");
    var capoI = document.getElementById("capo");
    var modelloI = document.getElementById("modello");
    var quantitaI = document.getElementById("quantita");
    var coloreI = document.getElementById("colore");
    var prezzoivaesclusaI = document.getElementById("prezzoivaesclusa");
    var prezzoivainclusaI = document.getElementById("prezzoivainclusa");
    var disponibileI = document.getElementById("disponibile");
    var saldoI = document.getElementById("saldo");
    var codprod = Number(codprodI.value);
    var collezione = collezioneI.value;
    var capo = capoI.value;
    var modello = Number(modelloI.value);
    var quantita = Number(quantitaI.value);
    var colore = coloreI.value;
    var prezzoivaesclusa = Number(prezzoivaesclusaI.value);
    var prezzoivainclusa = Number(prezzoivainclusaI.value);
    var disponibile = disponibileI.value;
    var saldo = Number(saldoI.value);
    var id = 0;
    var newProduct = new Articoli(id, codprod, collezione, capo, modello, quantita, colore, prezzoivaesclusa, prezzoivainclusa, disponibile, saldo);
    fetch(URLA, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json",
        }
    });
}
function cancel() {
    fetch(URLA + "/6", {
        method: "DELETE"
    });
}
/* cancel() */
