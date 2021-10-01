import CryptoJS from 'crypto-js'
import SecureStorage from 'secure-web-storage'

var SECRET_KEY = JSON.stringify(process.env.REACT_APP_SECURE_STORE_ENCRYPTION_KEY);

/**App Signature is prefixed with the tokens of the keystore to differ tokens of this App from other applications deployed
 * on the same Context root*/
var appSignature= JSON.stringify(process.env.REACT_APP_SIGNATURE);

function hash(key) {
    key = CryptoJS.SHA256(key,SECRET_KEY);

    return appSignature+key.toString();
}
 function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);

    data = data.toString();

    return data;
}
function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
}

var SecureStore={

    clearStore : function(){
      for(let i=0;i<window.localStorage.length;i++){  
        let key = window.localStorage.key(i)
        if(key.startsWith(appSignature)){
            window.localStorage.removeItem(key)
        }
      }
    },
   setItem : function setItem(key,value) {
    
     key = hash(key);  
     value = JSON.stringify(value);
     value = encrypt(value);
     return window.localStorage.setItem(key,value)
   },
    
   getItem : function getItem(key){
       
    key = hash(key)
    var value = window.localStorage.getItem(key);
    if (typeof value !== 'string') {
        return value;
    }
    value = decrypt(value);
    return JSON.parse(value);

   },

   removeItem : function removeItem(key){
          key = hash(key);
          window.localStorage.removeItem(key)
   }

}

export var secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
      key = CryptoJS.SHA256(key,SECRET_KEY);

      return key.toString();
  },
  encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
  },
  decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
  }
});

export default SecureStore;