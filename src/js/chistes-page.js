import { obtenerChiste } from './http-provider';
import regeneratorRuntime from "regenerator-runtime";

const body = document.body;
const container = document.querySelector('.container');
let btnOtro, olList, divLoader; // No lo inicializo a sus respectivos selectores porque tengo que esperar a que se ejecute primero 
                                //CrearChistehtml() antes de poder llamarlos o asignarlos a unas variables.

//Agregar un loader a la carga de chistes                                
const loading = () => {
    const preload = `
    <div class="col-md-12 d-flex justify-content-center mt-2">
    <div class="loader loader--style1" title="0" style="display: none">
      <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
  </div> 
    `;

    const divLoader = document.createElement('div');
    divLoader.classList.add('row');
    divLoader.innerHTML = preload;
    container.append(divLoader);

}

const crearChistesHtml = () => {

    const html = `
    <div class="col-md-12 text-center">
    
        <div class=" img-fluid ">
        <img src="./assets/img/chuck-norris.png" alt="imagen">
        </div>
        
        <button class="btn btn-dark m-16">Another Joke</button>
        
        
        <ol class="mt-2 list-group"> </ol>

    </div>
    `;

    const divChistes = document.createElement('div');
    divChistes.classList.add('row');
    divChistes.innerHTML = html;
    body.append(divChistes);

}

let eventos = () => {

    // Preload insert
    loading();

    olList  = document.querySelector('.list-group');
    btnOtro = document.querySelector('.btn');
    divLoader = document.querySelector('.loader')

    btnOtro.addEventListener('click', async() => {
       // Bloquear el btn de btnOtro para que no imprima doble 
       btnOtro.disabled = true;
       // Enable loader
       divLoader.style.display = 'block';
       // Obtener el chiste para dibujarlo en el innerHTML
       dibujarChiste( await obtenerChiste());
       btnOtro.disabled = false;
       divLoader.style.display = 'none';

    });
}

// chiste { id, value, icon_url }
const dibujarChiste = ( chiste ) => {

    const contador = document.querySelectorAll('li').length + 1;
    const olItem = document.createElement('li');
    olItem.innerHTML = `
    <b>${ contador }</b>: ${ chiste.value }`;
    olItem.classList.add('list-group-item');

    olList.append(olItem);

};


export const init = () => {
    crearChistesHtml();
    eventos();
}