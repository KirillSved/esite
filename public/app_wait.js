// const App ={
//     data(){
//         return{
//             servers:[]
//         }
//     },
//     async mounted(){
//         const res = await fetch("/api/server")
//         this.servers = await res,json()
//     }
// } ;
// Vue.createApp(App).mount("#app")
const App = {
  data() {
    return {
      servers: {},
      name: "",
      status:"",
      userServers: {},
    };
  },
  methods: {
    async createServer() {
      const data = {
        name: this.name,
        status: this.status,
      };
      const res = await fetch("/api/server", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      this.name = "";
      this.status="";
      this.userServers = await res.json();
      // makeToast({ header: 'Успіх', body: res, type: 'success', data_delay: 7000 })
    },

    async remove(id){
      function isEmptyObject(obj) {
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                return false;
            }
        }
        return true;
      }
      await fetch(`/api/server/${id}`,{method:"DELETE"}) 
      .then((data) => {
        // refresh page here
    });
      let donyCon = Object.values(this.userServers.data)
      donyCon= donyCon.filter(s=>s.id !== id)
      if(donyCon.length == 0){
        window.location.replace("/welcome");
      }
      donyCon = Object.assign({},donyCon)
      this.userServers.data = donyCon
      // if(isEmptyObject(this.userServers.data)){
      //   window.location.replace("/welcome");
      // }
    },

  },
  async mounted() {
    const res = await fetch("/api/server");
    let servers = await res.json();
    this.servers = servers.serverses;
    this.userServers = servers.userServerses;
  },
};
Vue.createApp(App).mount("#app");
