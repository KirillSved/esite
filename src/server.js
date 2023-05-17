// import { bgBlack } from "chalk";
import { v4 as uuid } from "uuid";
function newName(limit) {
  let textBank = "ABCDEFGHIKLMNOPQRSTVXYZ_:)";
  let word = "";

  for (let i = 0; i < limit; i++) {
    word += textBank[Math.floor(Math.random() * (textBank.length - 1))];
  }
  return word;
}
class objServ {
  constructor() {
    (this.id = 1), this.name, (this.data = {});//,(this.hightData=[]);
  }
  // add(el){
  //   var id = this.id++
  //   this.hightData[id]={id:id,dateUpdate:new Date().toLocaleString("ru"),content: this.content +=el }
  // }
  push(el) {
    var id = this.id++;
    this.name = newName(5);
    this.data[id] = el;
  }
  clearr() {
    this.id = 1;
    this.data = {};
    this.name = "";
  }
  deleteOne(uid){
    let b =Object.values(this.data)
   b= b.filter(s=>s.id !== uid)
   b= Object.assign({},b)
   this.data = b;
   if(isEmptyObject(this.data)){
     this.clearr()
   }
  }
}
let userServerses = new objServ();
let serverses = new objServ();
function createServers(num, obj) {
  function someName() {
    let word = ["Some", "Any", "Cool", "Kirill`s_"],
      result;
    word = word[Math.floor(Math.random() * word.length)];
    return (result = word + newName(3));
  }
  //let word

  let servers = [];

  for (let i = 0; i < num; i++) {
    let el = {
      id: uuid(),
      name: someName(),
      status: newName(6),
    };
    servers.push(el);
    obj.push(el);
  }
  return servers;
}
setInterval(() => {
  createServers(5, serverses);
  console.log(serverses.data);
}, 25000);
setInterval(() => {
  serverses.clearr();
  console.log(serverses.data);
}, 40000);

let serversaa = [
  { id: "1", name: "SomeName", status: "working" },
  { id: "2", name: "OtherName", status: "working" },
  { id: "3", name: "Kirilo", status: "working" },
  { id: "4", name: "SomeName", status: "working" },
];
function isEmptyObject(obj) {
  for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
          return false;
      }
  }
  return true;
}




export const getAll = (req, res) => {
  
    res.status(200).json({serverses, userServerses})

};
export const restgetAll = (req, res) => {

  res.status(200).json(serverses)
};

export const createNewServ = (req,res)=>{
    let data4user = {
      id:uuid(),
      ...req.body // всю боди здесь
    }
    userServerses.push(data4user)
    res.status(201).json(userServerses);
   
}
export const remove = (req,res)=>{

  let reqId =req.params.id
    console.log("id",reqId); // params.id --> id связан с тем что указан в роутере после :
    
    userServerses.deleteOne(reqId)
   
    res.json(userServerses)
  
 
    //userServers
}