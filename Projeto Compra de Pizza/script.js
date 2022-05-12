const c = (el) => document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);

let modalQt = 1;
let cart = [];
let modalKey = 0;

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    pizzaItem.setAttribute('data-key', index);
    //Preencher as infos em pizzaItem
    //Nome da pizza
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    //Descrição
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    //Preço padronizado
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    //Imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    //Clicando na pizza....Previne o evento normal de um link pois não queremos que abra uma nova janela ou que feche a de seleção
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        modalQt = 1;
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key;

        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex === 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c('.pizzaInfo--qt').innerHTML= modalQt;

        //Animação de opacidade pro modal da pizza
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=> {
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
        


    } );
    //Preencher o body com cada pizza
    c('.pizza-area').append( pizzaItem );
});


//Eventos fora do Modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt>1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML= modalQt;
    }
    
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML= modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', ()=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //Qual pizza?
    //modalKey;

    //Qual tamanho?
    let size = c('.pizzaInfo--size.selected').getAttribute('data-key');

    //Quantas pizzas?
    //modalQt;

    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=> item.identifier == identifier);
    if(key>-1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size: parseInt(size),
            qt: modalQt
    
        });
    }

    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length >  0){
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});

function updateCart(){

    c('.menu-openner span').innerHTML = cart.length;



    if(cart.length>0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);
            subTotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);
            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
                default:
                    pizzaSizeName = 'Deu merda';
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                
                if(cart[i].qt>1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }

                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });
            c('.cart').append(cartItem);

        }
        desconto = subTotal * 0.1;
        total = subTotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subTotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}