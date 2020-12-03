const APP = new Vue({
  el:'#root',
  data:{
    apiKey : '7a61773aa391abd450409993c20193bd',
    dataArray : [],
    searchinput:"",
    imgsrc:'https://image.tmdb.org/t/p/w342',
    cast : [],
    genre :[]
  },
  mounted : function(){
    axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&query=&api_key=' + this.apiKey )
    .then(response => {
      this.dataArray = response.data.results;
    });
    axios.get('https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&query=&api_key=' + this.apiKey )
    .then(response=>{
      this.dataArray = [...this.dataArray , ...response.data.results]
    });
  },
  methods:{
    search(){
      let movies = 'https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&query=' + this.searchinput.replace(/\s/g,'+');
      let series = 'https://api.themoviedb.org/3/search/tv?api_key=' + this.apiKey  + '&query=' + this.searchinput.replace(/\s/g,'+');
      let filmRequest = axios.get(movies);
      let seriesRequest = axios.get(series);
      axios.all([filmRequest , seriesRequest])
      .then(axios.spread((...responses) => {
      this.dataArray = [...responses[0].data.results , ...responses[1].data.results];
      }));
    },
    getCast(id){
      this.cast=[];
      this.genre=[];
      axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.apiKey + '&append_to_response=credits')
      .then(result => {
        console.log(result);
        for(let i = 0;i < 5;i++){
          this.cast.push(result.data.credits.cast[i]);
        }
        result.data.genres.forEach((item, i) => {
          this.genre.push(item.name);
        });

      })
    }
  }
})