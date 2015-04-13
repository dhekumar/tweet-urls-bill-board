module.exports = function(tweet){
	
	//Regular Expression
	var urlRegex = /(https?:\/\/[^\s]+)/g;
    var matches = [];

    tweet.replace(urlRegex, function(url) {

    	//Each Matched Url is pushed to array after extracting domain name
    	if(matches.indexOf(extractDomain(url))==-1)
            matches.push(extractDomain(url));
        return url;
    });
    
    return matches;
}


//Extracts dommain Name from the Url
var extractDomain = function(url){
	var domain;
    
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    //Rwmoving www from the url for simplification
    if(domain.match(/^www\./))
    {
        domain = domain.substring(4);
    }

    return normalizeDomain(domain);
}

//Normalizes famous domain names
var normalizeDomain = function(domain){

	var famousDomainNames = {
		"t.co"		: 	"twitter.com"
		,"bit.ly"	: 	"bitly.com"
		,"goo.gl" 	:  	"google.com"
		,"fb.me" 	:  	"facebook.com"
		,"y2u.be" 	: 	"youtube.com"
	}

	//If the domain matches these famous shortners then their full domain name is returned
	if(famousDomainNames[domain])
		return famousDomainNames[domain];
	else
		return domain;
}



