
function makeToast (args) {
    const id = uuidv4() // Math.floor(Math.random() * (100 - 1 + 1) + 1);
    let color = ''
    if (args.type) color = `bg-${args.type} text-white`
    let toasts = document.getElementById('toasts')
    if (!toasts) {
      document.body.insertAdjacentHTML(
        'beforeend',
        '<div id="toasts" class="toast-container" style="position: absolute;z-index: 10000;right: 1em;top:1em"></div>'
      )
      toasts = document.getElementById('toasts')
    }
  
    toasts.innerHTML += `
  <div class="toast" id="${id}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-delay="${args.data_delay || 6000}">
    <div class="toast-header ${color}">
      <strong class="me-auto">${args.header || ''}</strong>
      <small>${moment(new Date()).format('HH:mm:ss')}</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрити"></button>
    </div>
    <div class="toast-body">${args.body}</div>
  </div>`

  let eachT = document.getElementById(id)
  //let classFor = document.querySelector(`#${id}`)
  let classAll  = document.querySelectorAll(`.toast`)
  let classFor = document.querySelector(".toast")
 classAll.forEach((el)=>{
console.log(el);
 })
  console.log("one:"+classFor.classList)
  // eachT.addEventListener("shown.bs.toast", function(){
  //   let classFor = eachT
  //   setTimeout(()=>{
  //     classFor.classList.remove("show")
  //     classFor.classList.remove("showing")
  //     classFor.classList.remove("shown")
  //     classFor.classList.add("hide");

  //   },2000)
  //  // document.getElementById(id).outerHTML = ''
  // })
  eachT.addEventListener("hide.bs.toast", function(){
    let classFor = eachT
      classFor.classList.remove("show")
      classFor.classList.remove("showing")
      classFor.classList.remove("shown")
      classFor.classList.add("hide");
      document.getElementById(id).outerHTML = ''
  })
  var option = {
    animation :true,
    delay :3000,
}
    const toast = new bootstrap.Toast(document.getElementById(id),option)
    toast.show()
    // var myToastEl = document.getElementById('myToast')
    // myToastEl.addEventListener('hidden.bs.toast', function () {
    //   // сделайте что-нибудь...
    // })
    // toast.on("click",".close",()=>{
    //   toast.hide();
    // })
    // setTimeout(()=>{
    //   document.getElementById(id).outerHTML = ''
    // },7000)
      //
      //toast.hide() 
      // document.getElementById(id).outerHTML = ''
    
    //setTime
    // setTimeout(() => {
    //   document.getElementById(id).outerHTML = ''
    //   //$(`#${id}`).toast('hide');
    // }, args.data_delay);
    // TODO исправить их. Если несколько быстро сделать - не пропадают, скопка закрыть не пашет
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

let toastbtn = document.getElementById("Cteatebutton") ?? "notnull";
let secToastbtn = document.getElementById("Create4i2button")  ?? "notnull"
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

secToastbtn.onclick = async()=>{
  let login =" SomeLog";
  let password ="SomePas";
  const rez = await fetchPost("/truly",{login,password},true);
  makeToast({header:"Облом",body:rez,type:"success",data_delay:6000})
}