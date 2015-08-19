
var feedRead = require('feed-read');
var express = require('express');
var cheerio = require('cheerio');
var app = express();

app.use(express.static(__dirname));

app.get('/api', function(req, res) {
  feedRead('http://feeds.macrumors.com/MacRumors-all', function(err, articles) {
    if (err) res.send(err);
    else {
      articles.forEach(function(article) {
        var $ = cheerio.load(article.content);
        $('[clear="all"]').nextAll('*').remove();
        $('iFrame').remove();
        article.content = $.html();
      });

      res.send(articles);
    }
  });
});

app.listen(9000);
