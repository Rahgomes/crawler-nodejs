const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function top100MoviesIMDB() {
    request('https://www.imdb.com/chart/moviemeter', (err, res, body) => {
        if (err) console.log('Erro: ' + err);

        let $ = cheerio.load(body);

        $('.lister-list tr').each(function () {
            let title = $(this).find('.titleColumn a').text().trim();
            let rating = $(this).find('.imdbRating strong').text().trim();
            let dataMovie = `Título: ${title} / Nota: ${rating} \n`;
            let cb = err => { if (err) console.log(err) };

            fs.appendFile('imdb.txt', dataMovie, cb)
        });
    });
}

function articlesGEsporte() {
    request('https://globoesporte.globo.com/', (err, res, body) => {
        if (err) console.log('Erro: ' + err);

        let $ = cheerio.load(body);

        $('.bastian-page .bastian-feed-item').each(function(){
            let categoryArticle = $(this).find('.feed-post .feed-post-header span').text().trim();
            let titleArticle = $(this).find('.feed-post .feed-post-body-title a:first-child').text().trim();

            categoryArticle === '' ? categoryArticle = 'Sem categoria' : categoryArticle;
            titleArticle === '' ? titleArticle = 'Sem título' : titleArticle;
            
            let catTitleArticle = `Categoria: ${categoryArticle} \nArtigo: ${titleArticle} \n-------------------------`;

            console.log(catTitleArticle);
        })
    })
}

top100MoviesIMDB();
articlesGEsporte();