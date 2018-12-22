const xmlh = require('xmlhttprequest')

function zcashApi(method, params) {
    let xhr = new xmlh.XMLHttpRequest()
    xhr.open('POST', 'http://127.0.0.1:8232',false,'denis','020611')
    xhr.setRequestHeader('Content-type', 'text/plain');
    console.log(JSON.stringify({
        id: 'test',
        method: method,
        params: params || []
    }))
    xhr.send(JSON.stringify({
        method: method,
        params: params || [],
        id: 'test'
    }))
    let b = `{"id":"test","method":"z_listadresses","params":[]}`
    // let b = `{"method": "z_exportkey","params":["zs17m3ms6dyjc7k2q7p64h3nj5xtklsu3yedz2rkqzzy0kut8lp5sn6ftg3k2ywxfdpfhjvycuesdc"],"id":"test"}`
    // xhr.send(b)
    return (xhr.status != 200) ? {
        success : false,
        result: {
            status: xhr.status,
            text: xhr.statusText
        }
    } : {
        success: true,
        result: JSON.parse(xhr.responseText)
    }
}

module.exports = {
    balance: pk => {
      return 13
    },
    send: (pk, from, to, amount) => {
        return "success"
    },
    newAddress: () => zcashApi('z_getnewaddress').result.result,
    listAddresses: () =>zcashApi('z_listaddresses').result.result
}