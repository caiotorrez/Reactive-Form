$(() => {
    handleChange();
})

function setup() {
    $('[label-error]').css({display: 'none', color: 'red'});
    $('[error=true]').css({borderColor: 'red', }).next().slideDown();
    $('[error=false]').css({borderColor: '', }).next().slideUp();
};

const handleChange = (events = ['input[required]', 'select[required]']) => {
    setup();
    $(events.join()).keyup(async function() {
        if (await validator(this.value, $(this).attr('type'))) {
            $(this).attr('error', 'false');
            setup();
        } else {
            $(this).attr('error', 'true');
            setup();
        }
    });
}

async function validator(value='', type='text') {

    const validEmail = (email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLocaleLowerCase());
    };

    const validCEP = async (cep) => {
        cep = cep.replace('-', '');
        if (cep.length < 8) {
            return false; 
        }
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        let {erro} =  await $.ajax(url);
        return !erro;
    };

    const validCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, cpf);
        return cpf.length === 11;
    }

    const validCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/\D/g, cnpj);
        return cnpj.length === 12;
    }
    
    value = value.trim();
    switch(type) {

        case 'text':
            return !!value;
        
        case 'email':
            return validEmail(value);
        
        case 'cep':
            return await validCEP(value);

        case 'cpf':
            return validCPF(value);
        
        case 'cnpj':
            return validCNPJ(value);
        
        default:
            break;
    }
    
}

function isValid(form) {
    $(form).find('input[required], select[required]').each(function() {
        $(this).keyup();
    });
    return !$('[error=true]').length;
}