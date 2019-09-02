$(() => {
    setup();
    validator();
})

function setup() {
    $('[label-error]').css({display: 'none', color: 'red'});
    $('[error]').css({borderColor: 'red', }).next().slideDown('slow');
    $('[error=false]').css({borderColor: '', }).next().slideUp('slow');
};

async function validator(value = '') {
    value = value.trim();

    if (!value) {
        return false;
    }

    const validEmail = (email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLocaleLowerCase());
    };

    const validCEP = async (cep) => {
        cep = cep.replace('-', '');
        if (cep < 8) {
            return false; 
        }
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        let {erro} =  await $.ajax(url);
        return erro;
    };

}

const isValid = () => {
    // test all inputs and return true or false
}