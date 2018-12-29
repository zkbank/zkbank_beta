const xmlh = require('xmlhttprequest')

function zcashApi(method, params) {
    const node = process.env.RPCURL
    const user = process.env.RPCUSER
                .split(":")
                .reduce((o,v,i) => {
                    o[i==0?'name':'password'] = v
                    return o
                },{})
    console.log(node, user)
    const xhr = new xmlh.XMLHttpRequest()
    xhr.open('POST', node, false, user.name, user.password)
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
    newZAddress: ()   => zcashApi('z_getnewaddress').result.result,
    newTAddress: ()   => zcashApi('getnewaddress').result.result,
    importTAddress:
        dumpKey       => zcashApi('importprivkey',[dumpKey]).result.result,
    exportTAddress:
        address       => zcashApi('dumpprivkey',[address]).result.result,
    exportZAddress: zaddr => zcashApi('z_exportkey',  [zaddr]).result.result,
    importZAddress: zkey  => zcashApi('z_importkey',  [zkey]).result.result,
    getBalance: addr => zcashApi('z_getbalance', [addr]).result.result,
    isValid: addr =>  zcashApi(addr[0] == 'z'?'z_validateaddress': 'validateaddress', [addr]).result.result.isvalid,
    listAddresses: () =>zcashApi('z_listaddresses').result.result,
    getOperationStatus: opid => zcashApi('z_getoperationstatus',[[opid]]).result.result[0],
    getOperationResult: opid => zcashApi('z_getoperationresult',[[opid]]).result.result[0],
    send: (from,to,amount,minConfirm,fee) => zcashApi('z_sendmany',[from,[{
        address: to,
        amount: amount
    }], minConfirm || 2, fee || 0.00001 ]).result.result
}