var filtroContainer = document.getElementById("filterContainer");
var btnToggleFiltro = document.getElementById("BtnToggleFiltroContainer");
var divContentFiltro = document.getElementById("divContentFiltro");
var body = document.getElementById("body");
var main = document.getElementById("main");

var conteudoJogos;

var aberto = false;

btnToggleFiltro.addEventListener("click", () => {
    if(!aberto){
        abrirMenuFiltro()
        return
    }
    fecharMenuFiltro()
})

function abrirMenuFiltro(){
    filtroContainer.classList.remove("fecharMenu");
    filtroContainer.classList.add("abrirMenu");
    divContentFiltro.classList.remove("visibilityFalse")

    btnToggleFiltro.classList.add("redButtonVariant");
    btnToggleFiltro.classList.remove("blueButtonVariant");

    btnToggleFiltro.innerHTML = "";
    let newIcon = document.createElement("span");
    newIcon.classList.add("material-symbols-outlined");
    newIcon.innerText = "filter_alt_off";
    btnToggleFiltro.appendChild(newIcon);

    aberto = true
}

function fecharMenuFiltro(){
    filtroContainer.classList.add("fecharMenu");
    filtroContainer.classList.remove("abrirMenu");
    divContentFiltro.classList.add("visibilityFalse")

    btnToggleFiltro.classList.add("blueButtonVariant");
    btnToggleFiltro.classList.remove("redButtonVariant");

    btnToggleFiltro.innerHTML = "";
    let newIcon = document.createElement("span");
    newIcon.classList.add("material-symbols-outlined");
    newIcon.innerText = "filter_alt";
    btnToggleFiltro.appendChild(newIcon);

    aberto = false
}

function construirPrateleira(){
    var divPrateleira = document.createElement("div");
    divPrateleira.classList.add("divPrateleira")

    return divPrateleira
}

function construirCard(nome, gen, imgUrl){

    let divContainer = document.createElement("div");
    divContainer.classList.add("containerJogo");

    let divCapa = document.createElement("div");
    divCapa.classList.add("capaJogo");

    let imgJogo = document.createElement("img");
    imgJogo.classList.add("imgJogo");
    imgJogo.src = imgUrl

    let divAnuncio = document.createElement("div");
    divAnuncio.classList.add("div");

    let h1Element = document.createElement("h1");
    h1Element.innerText = nome

    let h2Element = document.createElement("h2");
    h2Element.innerText = gen

    divCapa.appendChild(imgJogo);
    divAnuncio.appendChild(h1Element);
    divAnuncio.appendChild(h2Element);

    divContainer.appendChild(divCapa);
    divContainer.appendChild(divAnuncio);

    return divContainer

}

function imprimirConteudo(){
    let contador = 0
    let prateleira;
    for(i = 0; i < 20; i++){
        if(i === 0){
            prateleira = construirCard()
        }
        if(contador === 4){
            main.appendChild(prateleira);
            prateleira = construirPrateleira();
            contador = 0;
        }
        let nome = conteudoJogos.results[i].name
        let gen = conteudoJogos.results[i].genres[0].name || "Nenhum"
        let imgUrl = conteudoJogos.results[i].background_image
        let newCard = construirCard(nome, gen, imgUrl);
        prateleira.appendChild(newCard);
        contador++;
    }
    console.log(conteudoJogos)
}

async function onLoadTela(){
    try{
        await consumirAPI();
    }catch (e){
        console.log(e)
    }
    imprimirConteudo();
}
    
async function consumirAPI() {
   try{
    const resp = await fetch("https://api.rawg.io/api/games?key=1c5335d6c3b04f68b534fd0d0f078375&page_size=20");
    conteudoJogos = await resp.json();
    console.log
    console.log(conteudoJogos.results[0]);

   }catch (e){
    console.log("Error ", e);
   } 
}

body.addEventListener("load", onLoadTela)


