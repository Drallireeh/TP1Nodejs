const axios = require("axios");

const baseUrl = "https://swapi.py4e.com/api";
let urlWookie = axios.get(baseUrl + "/people/13?format=wookiee");
let urlVador = axios.get(baseUrl + "/people?search=vader");
let urlPlanets = axios.get(baseUrl + "/planets");
let urlStarship = axios.get(baseUrl + "/starships/10");
let urlR2 = axios.get(baseUrl + "/people?search=r2");
let urlR2Planet = axios.get(baseUrl + "/planets/8");

const calls = axios.all([urlWookie, urlVador, urlPlanets, urlStarship, urlR2, urlR2Planet]);

async function execute() {
    try {
        const promise = await calls;
        console.log(promise);
    } catch(e) {
        console.log(e);
    }
}

execute();