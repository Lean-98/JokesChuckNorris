const jokeUrl = 'https://api.chucknorris.io/jokes/random';
import regeneratorRuntime from "regenerator-runtime";

const obtenerChiste = async() => {

    try {
        const resp = await fetch( jokeUrl );

        if( !resp.ok )  throw('No se pudo realizar la petición');

        const { icon_url, id, value } = await resp.json();

        return { icon_url, id, value };

    } catch (err) {

        throw err;

    }
}





// Aquí voy colocando cada uno de los servicios que yo voy a llamar externamente a mi aplicación
export {
    obtenerChiste
}