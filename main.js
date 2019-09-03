$(() => {
    setup();
    handleChange();
})

function setup() {
    $('[label-error]').css({display: 'none', color: 'red'});
    $('[error=true]').css({borderColor: 'red', }).next().slideDown('slow');
    $('[error=false]').css({borderColor: '', }).next().slideUp('slow');
};

const handleChange = (events = ['input[required]', 'select[required]']) => {
    $(events.join()).keyup(async function() {
        if (await validator(this.value, this.type)) {
            $(this).attr('error', 'false');
            setup();
        } else {
            $(this).attr('error', 'true');
            setup();
        }
    });
}

async function validator(value='', type='cep') {

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
        return !erro;
    };
    
    value = value.trim();
    switch(type) {

        case 'text':
            return !!value;
        
        case 'email':
            return validEmail(value);
        
        case 'cep':
            return await validCEP(value);
        
        default:
            break;
    }


}

const isValid = () => {
    // test all inputs and return true or false
}