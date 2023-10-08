const key = process.env.REACT_APP_APIKEY;

const request = {
    requestPopular: 'https://api.themoviedb.org/3/movie/popular?api_key=${key)&language=en-US&page=1',

};

export default request