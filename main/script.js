function ex1(){
    let nome = window.prompt('Qual o seu nome? ');
    window.alert(`Olá ${nome} seja bem vindo!`);
}

function ex2(){
    let nome = window.prompt('Qual o seu nome? ');
    document.querySelector('.ex').innerHTML = `Olá ${nome}, Seja bem vindo!`;
    
}

function ex3(){
    let numero = window.prompt('Digite o número: ');
    document.querySelector('.ex').innerHTML = `O dobro do número ${numero} é ${numero*2} e sua metade é ${numero/2}`
}

function ex4(){
    let a = Number(window.prompt('Digite seu primeiro número: '));
    let b = Number(window.prompt('Digite seu segundo número: '));

    document.querySelector('.ex').innerHTML= `A soma do número ${a} e ${b} é igual a: ${a+b}`;
}

function ex5(){
    let nome = window.prompt('Qual o nome do aluno? ');
    let a = Number(window.prompt(`Qual a primeira nota do ${nome}? `));
    let b = Number(window.prompt(` Além da ${a}, qual a outra nota do ${nome}? `));

    let res = document.querySelector('.ex');

    res.innerHTML = `A nota do ${nome} será calculada`;
    res.innerHTML += `As notas obtidas foram ${a} e ${b}`;
    res.innerHTML += `A média final do ${nome} é de: ${(a+b)/2}`


}

function ex6(){
    let a = Number(window.prompt(`Qual o número? `));

    let res = document.querySelector('.ex');

    res.innerHTML = `<p> O número escolhido foi: ${a}</p>`;
    res.innerHTML += `<p> O seu valor absoluto é:  ${Math.abs(a)}</p>`;
    res.innerHTML += `<p> A sua parte inteira é: ${Math.trunc(a)}</p>`;
    res.innerHTML += `<p> O valor arredondado é: ${Math.round(a)}</p>`;
    res.innerHTML += `<p> A sua raiz quadrada é: ${Math.sqrt(a)}</p>`;
    res.innerHTML += `<p> A sua raiz cúbica é: ${Math.cbrt(a)}</p>`;
    res.innerHTML += `<p> O número ${a}<sup>2</sup> é: ${Math.pow(a, 2)}</p>`;
    res.innerHTML += `<p> O número ${a}<sup>3</sup> é: ${Math.pow(a, 3)}</p>`;
}


let contador = 0;
function ex7c(){
    contador++;
    document.querySelector('.ex').innerHTML = `<p> Clicou ${contador} vezes.</p>`;
}

function ex7z(){
    contador = 0;
    document.querySelector('.ex').innerHTML = null;
}


