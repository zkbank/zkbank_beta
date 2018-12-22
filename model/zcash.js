const xmlh = require('xmlhttprequest')

function zcashApi(method,params) {
    let xhr = new xmlh.XMLHttpRequest()
    xhr.open('POST', 'http://127.0.0.1:8232',false,'denis','020611')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify({
        id: 'test',
        method: method,
        params: params || []
    }))
    return (xhr.status != 200) ? {
        success : false,
        result: {
            status: xhr.status,
            text: xhr.statusText
        }
    } : {
        success: true,
        result: xhr.responseText
    }
}

module.exports = {
    test: x => {
        return `pk: ${x}`
    },
    balance: pk => {
      return 13
    },
    send: (pk, from, to, amount) => {
        return "success"
    },
    listAddresses: ()=>zcashApi('listadresses')
}