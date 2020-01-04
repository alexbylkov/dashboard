export default class ApiService {

    getApi = (search, apiName) => {

        switch(apiName) {
            case 'books':
                return this.getBooks(search);
            case 'youtube':
                return this.getYoutube(search);
            case 'films':
                return this.getFilms(search);
            case 'recipe':
                return this.getRecipe(search);
            case 'music':
                return this.getMusic(search);
            case 'vimeo':
                return this.getVimeo(search);
            default:
                return null;
        }       
    }
         
    getYoutube = async (search) => {

        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=AIzaSyC6vePT-vSpezn6nSutMrJAeAk40EWxJu4&p&maxResults=20`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`);
        }
        const rest = await res.json();

        return rest.items.map((item) => {
            return {
                title: item.snippet.title,
                link: item.id.videoId,
                author: item.snippet.channelTitle,
                img: item.snippet.thumbnails.medium.url,
                description: item.snippet.description,
                date: item.snippet.publishedAt 
            }
        })
    }

    getBooks = async (search) => {

        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyC6vePT-vSpezn6nSutMrJAeAk40EWxJu4`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`);
        }
        const rest = await res.json();
        
        return rest.items.map((item) => {
            return {
                title: item.volumeInfo.title,
                link: item.volumeInfo.canonicalVolumeLink,
                author: item.volumeInfo.authors,
                img: item.volumeInfo.imageLinks.smallThumbnail,
                description: item.volumeInfo.description,
                date: item.volumeInfo.publishedDate
            }
        })
    } 
    
    getFilms = async (search) => {

        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5006d8ec9c04cba5bd4df7235a95daa0&query=${search}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`);
        }
        const rest = await res.json();

        return rest.results.map((item) => {
            return {
                title: item.title,
                link: `https://www.themoviedb.org/movie/${item.id}`,
                img: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                description: item.overview,
                date: item.release_date
            }
        })
    } 

    getRecipe = async (search) => {

        const res = await fetch(`https://api.edamam.com/search?q=${search}&app_id=7a170d61&app_key=63f897fe6642ff4abdb0deb4775176e0`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`);
        }
        const rest = await res.json();

        return rest.hits.map((item) => {
            return {
                title: item.recipe.label,
                author: item.recipe.source,
                link: item.recipe.url,
                img: item.recipe.image,
                description: item.recipe.ingredientLines.join(', '),
                date: Math.round(item.recipe.calories)
            }
        })
    } 

    getMusic = async (search) => {

        const res = await fetch(`https://itunes.apple.com/search?term=${search}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`);
        }
        const rest = await res.json();

        return rest.results.map((item) => {
            return {
                title: item.trackName,
                author: item.artistName,
                link: item.trackViewUrl,
                img: item.artworkUrl100,
                description: item.collectionName,
                date: item.releaseDate
            }
        })
    } 

    getVimeo = async (search) => {

        const res = await fetch(`https://api.vimeo.com/videos?query=${search}&access_token=2e6ade2524704081280dfbc9e80fc221`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res.status}`);
        }
        const rest = await res.json();

        return rest.data.map((item) => {
            return {
                title: item.name,
                author: item.user.name,
                link: item.link,
                img: item.pictures.sizes[2].link,
                description: item.description,
                date: item.created_time
            }
        })
    } 
}