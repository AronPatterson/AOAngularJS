import axios from 'axios';
import alt from '../alt/Alt.jsx';

class DataActions {

    constructor() {
        const appUrl = aoWP.api_url; // Wordpress installation url

        this.pagesEndPoint = `${appUrl}pages`; // Endpoint for getting Wordpress Pages
        this.postsEndPoint = `${appUrl}posts`; // Endpoint for getting Wordpress Posts
    }

    // Method for getting data from the provided end point url
    api(endPoint) {
        return new Promise((resolve, reject) => {
            axios.get(endPoint).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            }); 
        });     
    }

    // Method for getting Pages data
    getPages(cb) {
        this.api(this.pagesEndPoint).then((response)=>{
            this.getPosts(response, cb)
        });
        return true;
    }

    // Method for getting Posts data
    getPosts(pages, cb) {
        this.api(this.postsEndPoint).then((response)=>{
            const posts = response
            const payload = {pages, posts};

            this.getSuccess(payload); // Pass returned data to the store
            cb(payload); // This callback will be used for dynamic rout building
        });
        return true;
    }

    // This returnes an object with Pages and Posts data together
    // The Alt Store will listen for this method to fire and will store the returned data
    getSuccess(payload){
        return payload;
    }
}

export default alt.createActions(DataActions);