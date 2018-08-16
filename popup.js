/*
'use strict';

let changeColor = document.getElementById('track');
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/

$(function(){
  console.log("Start");
  $("#track").click(track)
})

function track() {
  console.log("Clicked");
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    const fullUrl = tabs[0].url;
    const converted = new URL(fullUrl);
    
    let filters = [
      /\b.*(?=(\.com))/,
      /\b.*(?=(\.org))/,
      /\b.*(?=(\.es))/,
      /\b.*(?=(\.io))/,
      /\b.*(?=(\.net))/
    ];

    let domain = null;
    // Cortar hasta los posibles filtros (.com, .es, etc)
    for (let i = 0; i <= filters.length; i += 1) {
      if (!domain) {
        domain = filters[i].exec(converted.hostname);
      }
    }
    //console.log("Antes de filtrar www:", domain[0]);

    // Eliminar el "www"
    if (domain[0]) {
      let wwwFilter = /(?<=www\.).*$/
      if (wwwFilter.exec(domain[0])) {
        domain = wwwFilter.exec(domain[0]);
      }
    }
    
    console.log(domain[0]);
    $.get( `https://boards-api.greenhouse.io/v1/boards/${domain[0]}/jobs`, function( data ) {
      console.log(data);
    });
  });
}