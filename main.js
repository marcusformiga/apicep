'use strict';

const clearForm = (address) =>{
    document.getElementById('address').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
}


const fillForm = (address) =>{
    document.getElementById('address').value = address.logradouro;
    document.getElementById('district').value = address.bairro;
    document.getElementById('city').value = address.localidade;
    document.getElementById('state').value = address.uf;
}


const isNumber = (number) => /^[0-9]+$/.test(number);

const cepValidate = (cep) => cep.length == 8 && isNumber(cep); 

const searchCep = async() => {
    clearForm();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValidate(cep)){
        const data = await fetch(url);
        const address = await data.json();
        if (address.hasOwnProperty('erro')){
            document.getElementById('address').value = 'CEP não encontrado!';
        }else {
            fillForm(address);
        }
    }else{
        document.getElementById('address').value = 'CEP incorreto!';
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',searchCep);