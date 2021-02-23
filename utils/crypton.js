
const crypto=require('crypto')
const alg ="aes-256-ctr"
const pwd ="gjhxhg<xbbhcgxnuwj"
const a={
    crypt:function(text){
        const cipher = crypto.createCipher(alg,pwd)
        const crypted = cipher.update(text,'utf8','hex')
        return crypted
    },
    decrypt:function(text){
        const decipher = crypto.createDecipher(alg,pwd)
        const plain = decipher.update(text,'hex','utf8')
        return plain
    }

}
module.exports = a
