
function makeToast (args) {
    const id = uuidv4()
    let color = ''
    if (args.type) color = `bg-${args.type} text-white`
    let toasts = document.getElementById('toasts')
    if (!toasts) {
      document.body.insertAdjacentHTML(
        'afterend',
        '<div id="toasts" class="toast-container" style="position: absolute;z-index: 10000;right: 1em;top:6em;"></div>'
      )
      toasts = document.getElementById('toasts')
    }
  let delay = args.data_delay || 5000;
  if(delay<100) delay = 100
    toasts.innerHTML = `
  <div class="toast show" id="${id}" role="alert" aria-live="assertive" aria-atomic="true"">
    <div class="toast-header ${color}">
      <strong class="me-auto">${args.header || ''}</strong>
      <small>${moment(new Date()).format('HH:mm:ss')}</small>
      <button type="button" class="ml-2 mb-1 close" data-bs-dismiss="toast" aria-label="Закрити" onclick="this.parentElement.parentElement.remove()""></button>
    </div>
    <div class="toast-body">${args.body}</div>
  </div>` + toasts.innerHTML 
  setTimeout(()=>{document.getElementById(id).remove()  },delay)
  }
  
  // makeToast({ header: "Тема", body: "тело", type: "warning" }) type: warning success danger (bg-)
  async function fetchPost (url, data = {}, toastError) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return await readRezult(response, toastError)
  }
  
  async function fetchGet (url, toastError) {
    const response = await fetch(url)
    return await readRezult(response)
  }
  
  async function readRezult (response, toastError) {
    let rez = await response.text()
    try {
      rez = JSON.parse(rez)
    } catch { }
    if (!response.ok) {
      const body = typeof rez === 'string' ? rez : rez.message
      if (toastError) makeToast({ header: 'Помилка', body, type: 'danger', data_delay: 7000 })
      throw rez // prevent then
    }
    return rez
  }
  function loadScript (src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      document.head.append(script)
      script.onload = function () {
        resolve()
      }
    })
  }
  
  function setCookie (name, value) {
    if(value === null) document.cookie = name + '=; Max-Age=0'
    else document.cookie = name + '=' + value + ';'
  }
  
  function getCookie (name) {
    const matches = document.cookie.match(new RegExp(
      // eslint-disable-next-line no-useless-escape
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ))
    return matches ? stringToType(decodeURIComponent(matches[1])) : undefined
  }
  
  function stringToType (s) {
    s = s === 'undefined' ? undefined : s
    s = s === 'null' ? null : s
    s = s === 'true' ? null : s
    s = s === 'false' ? null : s
    return s
  }
  
  function getUrlParameter (name) {
    let result = null; let tmp = []
    const items = location.search.substr(1).split('&')
    for (let index = 0; index < items.length; index++) {
      tmp = items[index].split('=')
      if (tmp[0] === name) result = decodeURIComponent(tmp[1])
    }
    return result
  }
  
  function setUrlParameter (key, value) {
    key = encodeURIComponent(key)
    value = encodeURIComponent(value)
  
    // kvp looks like ['key1=value1', 'key2=value2', ...]
    const kvp = document.location.search.substr(1).split('&')
    let i = 0
  
    for (; i < kvp.length; i++) {
      if (kvp[i].startsWith(key + '=')) {
        const pair = kvp[i].split('=')
        pair[1] = value
        kvp[i] = pair.join('=')
        break
      }
    }
  
    if (i >= kvp.length) {
      kvp[kvp.length] = [key, value].join('=')
    }
  
    // can return this or...
    const params = kvp.join('&')
  
    // reload page with new params
    document.location.search = params
  }
  
  function fallbackCopyTextToClipboard (text) {
    const textArea = document.createElement('textarea')
    textArea.value = text
  
    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
  
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
  
    try {
      const successful = document.execCommand('copy')
      const msg = successful ? 'successful' : 'unsuccessful'
      console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }
  
    document.body.removeChild(textArea)
  }
  
  function copyTextToClipboard (text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text)
      return
    }
    navigator.clipboard.writeText(text).then(function () {
      // console.log('Async: Copying to clipboard was successful!');
      makeToast({ header: 'Зкопійовано', body: '', type: 'success', data_delay: 100 })
    }, function (err) {
      console.error('Async: Could not copy text: ', err)
    })
  }
  
  let mySessionStorage = {
    getItem : function(key){
      let val = sessionStorage.getItem(key)
      if(val == "true") return true
      if(val == "false") return false
      try{parseInt(val); val = parseInt(val); return val}catch{}
      try{parseFloat(val); val = parseFloat(val); return val}catch{}
      return val
    },
    setItem : function(key, value){
      sessionStorage.setItem(key, value)
    }
  }
  let toastbtn = document.getElementById("Cteatebutton") ?? "notnull";
//let secToastbtn = document.getElementById("Create4i2button")  ?? "notnull"
// let classFor = document.querySelector("#toast")
//   let classAll  = document.querySelectorAll("#toast")
//   console.log("all:"+ classAll.classList)
//   console.log("one"+classFor.classList)
toastbtn.onclick =async ()=>{
    let login = "Boris";
    let password = "petrov"
const rez = await fetchPost('/truly', { login, password }, true)
makeToast({ header: 'Успіх', body: rez, type: 'success', data_delay: 7000 })
}

// secToastbtn.onclick = async()=>{
//   let login =" SomeLog";
//   let password ="SomePas";
//   const rez = await fetchPost("/truly",{login,password},true);
//   makeToast({header:"Облом",body:rez,type:"success",data_delay:6000})
// }
 // export { fetchPost, fetchGet, makeToast, setCookie, getCookie, stringToType, loadScript, getUrlParameter, setUrlParameter, copyTextToClipboard, mySessionStorage }
 