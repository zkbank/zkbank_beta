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
    newAddress: ()   => zcashApi('z_getnewaddress').result.result,
    exportKey: zaddr => zcashApi('z_exportkey',  [zaddr]).result.result,
    importKey: zkey  => zcashApi('z_importkey',  [zkey]).result.result,
    getBalance:zaddr => zcashApi('z_getbalance', [zaddr]).result.result,
    isValie:  zaddr =>  zcashApi('z_validateaddress', [zaddr]).result.result.isvalid,
    listAddresses: () =>zcashApi('z_listaddresses').result.result
}