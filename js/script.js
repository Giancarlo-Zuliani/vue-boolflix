const APP = new Vue({
  el:'#root',
  data:{
    apiKey : '7a61773aa391abd450409993c20193bd',
    filmsArray : [],
    seriesArray:[],
    searchinput:"",
    imgsrc:'https://image.tmdb.org/t/p/w342'
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
      let films = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' + this.searchinput.replace(/\s/g,'+');
      let series = 'https://api.themoviedb.org/3/search/tv?api_key=' + this.apiKey  + '&query=' + this.searchinput.replace(/\s/g,'+');
      let filmRequest = axios.get(films);
      let seriesRequest = axios.get(series);
      axios.all([filmRequest , seriesRequest])
      .then(axios.spread((...responses) => {
      this.filmsArray = responses[0].data.results;
      this.seriesArray = responses[1].data.results;
    }));
    }
  }
})
