
function zcashBody(method,params) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://127.0.0.1:8232',false,'denis','020611')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send({
        id: 'test',
        method: method,
        params: params || []
    })
    if (xhr.status != 200) {
        return {
            success : fasle,
            result: {
                status: xhr.status,
                text: xhr.statusText
            }
        }
          // пример вывода: 404: Not Found
    } else {
        xhr.responseText // responseText -- текст ответа.
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
    listAddresses: ()=>{
        let http = new XMLHttpRequest()
        http.open('POST', 'http://127.0.0.1:8232',false,'denis','020611')
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        http.pu
    }
}