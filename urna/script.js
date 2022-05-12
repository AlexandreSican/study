let votos = [];

const c = (el)=> document.querySelector(el);

let seuVoto = c('.d-1-1 span');
let cargo = c('.d-1-2 span');
let descricao = c('.d-1-4');
let aviso = c('.d-2');
let lateral = c('.d-1-right');
let numeros = c('.d-1-3');
let legenda = c('.legendas');
let legendaD = c('.legendas--deputados');
let legendaP = c('.legendas--presidente');

let etapaAtual = 0;
let numero = '';
let branco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    branco = false;

    for(let i = 0; i< etapa.numeros;i++){
        if(i===0){
            numeroHtml = '<div class="numero pisca"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
        
    }

    seuVoto.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;


    //Atualização

    legendaP.innerHTML = `
        <p>${legendas[0].titulo}</p>
        <p>${legendas[0].candidatos[0].numero}, ${legendas[0].candidatos[0].candidato}, ${legendas[0].candidatos[0].partido} </p>
        <p>${legendas[0].candidatos[1].numero}, ${legendas[0].candidatos[1].candidato}, ${legendas[0].candidatos[1].partido}</p>
        <p>${legendas[0].candidatos[2].numero}, ${legendas[0].candidatos[2].candidato}, ${legendas[0].candidatos[2].partido}</p>
        <p>${legendas[0].candidatos[3].numero}, ${legendas[0].candidatos[3].candidato}, ${legendas[0].candidatos[3].partido}</p>
    `;

    legendaD.innerHTML= `
    <p>${legendas[1].titulo}</p>
    <p>${legendas[1].candidatos[0].numero}, ${legendas[1].candidatos[0].nome}, ${legendas[1].candidatos[0].partido} </p>
    <p>${legendas[1].candidatos[1].numero}, ${legendas[1].candidatos[1].nome}, ${legendas[1].candidatos[1].partido} </p>
    <p>${legendas[1].candidatos[2].numero}, ${legendas[1].candidatos[2].nome}, ${legendas[1].candidatos[2].partido} </p>
    `;


}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });

    if(candidato.length>0){
        candidato = candidato[0];
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small">
                             <img src="images/${candidato.fotos[i].url}" alt="">
                             ${candidato.fotos[i].legenda}
                          </div>`;
            }else{
            fotosHtml += `<div class="d-1-image">
                             <img src="images/${candidato.fotos[i].url}" alt="">
                             ${candidato.fotos[i].legenda}
                          </div>`;
        }}

        lateral.innerHTML = fotosHtml;
    } else{
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">Voto Nulo!</div>`
    }
}

function clicou(n) {
    let elemento  = document.querySelector('.numero.pisca');
    if(elemento != null){
        elemento.innerHTML = n;
        numero = `${numero}${n}`;

        elemento.classList.remove('pisca');
        if(elemento.nextElementSibling!= null){
            elemento.nextElementSibling.classList.add('pisca');
        }else{
            if(numero =='17'){
                alert('Sério?');
                alert('Você vai mesmo fazer isso?');
                alert('Ainda da Tempo');
                alert('Não erre de novo');
                alert('PUFAVO!, CLICA NO CORRIGIR');
            }
            atualizaInterface();
        }
        


    }
}

function votoBranco() {
    
        numero = ''; 
        branco = true;
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descricao.innerHTML = `<div class="aviso-grande pisca">Voto em Branco!</div>`
    
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;


    if(branco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
        }else if(numero.length === etapa.numeros) {
            votoConfirmado = true;
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            });
        }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] != undefined){
            comecarEtapa();
        }else{
            c('.tela').innerHTML = `<div class="aviso-gigante pisca">FIM</div>`;
            console.log(votos);
        }
    }
}




comecarEtapa();