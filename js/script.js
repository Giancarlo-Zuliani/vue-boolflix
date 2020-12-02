const APP = new Vue({
  el:'#root',
  data:{
    apiKey : '7a61773aa391abd450409993c20193bd',
    filmsArray : [],
    searchinput:""
  },
  mounted : function(){
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=ritorno+al+futuro')
    .then(response => {
      this.filmsArray = response.data.results;
      console.log(response.data.results);
    })
  },
  methods:{
    search(){
      let x = this.searchinput.replace(/\s/g,'+');
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' + x)
      .then(response => {
        this.filmsArray = response.data.results;
        console.log(response.data.results);
      })
    }
  }
})
