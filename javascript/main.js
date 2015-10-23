//Helpers

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}



ready(function(){

  var config = {
    "id": '657286568667914240',
    "domId": '',
    "maxTweets": 10,
    "enableLinks": true,
    "showUser": true,
    "showTime": true,
    "dateFunction": '',
    "showRetweet": false,
    "customCallback": handleTweets,
    "showInteraction": false
  };

  function handleTweets(tweets){
      var x = tweets.length;
      var n = 0;
      var element = document.querySelector('.twitter .list');
      var html = '';
      while(n < x) {
        html += "<div class='tweet-container'>" + tweets[n] + '</div>';
        n++;
      }
      element.innerHTML = html;
  }




  twitterFetcher.fetch(config)

  $.getJSON('http://blog.nuwe.co/articles?format=json&callback=?').done(function(data){
      if (!data.items.length) {return}
      var element = document.querySelector('.blog .list');
      var html = '';
      $.each(data.items, function(i,e){
        if (i < 4) {

          var date = new Date(e.publishOn)
          var day = date.getDate() > 9 ? ''+date.getDate() : '0'+date.getDate()
          var month = date.getMonth() > 8 ? ''+date.getMonth() + 1 : '0'+date.getMonth() + 1
          var year = ''+date.getFullYear()

          text_date = day+'.'+month+'.'+year

          html += "<div class='article'>"
             + "<div class='date'>"
                 + text_date
             + "</div>"
             + "<div class='title'>"
               + "<a href='http://blog.nuwe.co"+e.fullUrl+"'>"
                 + e.title
               + "</a>"
             + "</div>"
             + "<div class='text'>"
                 + e.excerpt
             + "</div>"
           + "</div>"
        }
      })
      element.innerHTML = html;

    })


  $('.portfolio_item').click(function(e){
    var index = $(this).data('index')
    var offset = $(this).position().left
    var width = $(this).width()
    var top = $(this).position().top+$(this).height()+45
    $('.portfolio .details').removeClass('show').each(function(i,e){
      if (i === index){
        $(e).addClass('show');
        $(e).css('top',top+'px');
        $(e).find('.arrow').css('left', offset+114+'px');
      }
    })
  })

  $('.portfolio .details .close').click(function(){
    $(this).parent().removeClass('show')
  })


});


