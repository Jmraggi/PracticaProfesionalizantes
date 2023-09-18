//------------------ DECLARACION DE VARIABLES -----------------------
const carrito = []

let listaCarrito = document.getElementById("listaCarrito")
let valorFinal = document.getElementById("precio")
let valorTotal = document.getElementById("precioFinal")

const lista = document.querySelector("#listado")
let productos = []

let cards = document.getElementById("cartaProducto")


//-----------------   CARTAS DE PRODUCTOS   ----------

$(document).ready(function() {

    $('#carrito-btn').click(function() {
      $('#carrito').toggle();
    })
  
    fetch("./ventas.json")
    .then ( (res) => res.json())
    .then ( (data) =>{
      productos = data;
  
      data.forEach((producto) => {
        let card = document.createElement("div")
        card.className = "col-sm-3 py-5"
        card.innerHTML = `
        <div class="card border-dark text-center" style="width: 18rem;">
          <img src="${producto.img}" class="img-thumbnail" alt="..">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text fs-3">$${producto.precio}</p>
                <button id="compra" onclick="compra(${producto.id})" class="btn btn-primary">Comprar</button>
            </div>
        </div>
        `
        cards.append(card)
      });
      
      })
  });
  

  //----------FUNCION DE COMPRA -------------

const compra = (x) => {
    carrito.push(productos[x])
    $("div.carro").remove();
    
    let total = carrito.reduce((acc, item)=>{
      return acc + item.precio}, 0)
    
    carrito.forEach(producto => {
        let table = document.createElement("div");
        table.classList.add("carro");
        table.innerHTML = `
        <div class="card mb-2" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${producto.img}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body" style="color: black;">
                <h2 class="card-title">${producto.nombre}</h2>
                <p class="card-text" style="font-size: 15px;">Calidad: ${producto.calidad}</p>
                <p class="card-text" style="font-size: 15px;">Precio: $${producto.precio}</p>
              </div>
            </div>
          </div>
        </div>
        `;
        swal.fire({
          title:'Agregado al carrito'
        })
        listaCarrito.appendChild(table);  
      });
    
      //Jquery de sumatoria cantidad carrito
      $('.cantidad-carrito').text($('.carro').length);
    
    
    //Renderizado del total de la compra
    valorTotal.innerHTML=`
    <h2 style="color: white;">Total de compra = $${total}</h2>
    `
    }
  