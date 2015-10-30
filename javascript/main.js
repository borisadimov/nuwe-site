//Helpers

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
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



  window.posts = function(data) {
    if (!data.items.length) {return}
    var element = document.querySelector('.blog .list');
    var html = '';
    Array.prototype.forEach.call(data.items, function(e, i){
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

  }

  var scr = document.createElement('script')
  scr.src = 'http://blog.nuwe.co/articles?format=json&callback=posts'
  document.body.appendChild(scr)

  var timeout = null
  var inprogress = false

  function showDetalails(item){
    var index = $(item).data('index');
    var offset = $(item).position().left;
    var width = $(item).innerWidth();
    $(item).parent().find('.arrow').css('left', offset+(width / 2)-60+'px');
    var height = $(item).height()+$(item).next().height();
    $(item).parent().css({height: 100+height+'px'}).addClass('show');
    $(item).parent().find('.details').slideDown(function(){
      inprogress = false
    });

    $('html, body').animate({
      scrollTop: $(item).offset().top+400
    }, 700);

  }

  var handleProtfolioItemClick = function(item){
    inprogress = true
    if ($('.portfolio .item_container.show').length > 0) {
      $('.portfolio .item_container').removeClass('show').find('.details').slideUp()
      clearTimeout(timeout);
      timeout = setTimeout(function(){showDetalails(item)}, 500)
    } else {
      showDetalails(item)
    }
  }

  $('.portfolio_item').click(function(e){
    var that = this
    if (inprogress){
      clearTimeout(timeout)
      timeout = setTimeout(function(){handleProtfolioItemClick(that)}, 500)
    } else {
      handleProtfolioItemClick(this)
    }

  })




  $('.portfolio .details .close').click(function(){
    $(this).parent().slideUp()
    $(this).parent().parent().removeClass('show')
  })

  $('.logo').click(function(e){
    $('.fullpage_menu').addClass('show');
    $('body').addClass('noscroll');
  })

  $('.fullpage_menu .close').click(function(){
    $('.fullpage_menu').removeClass('show');
    $('body').removeClass('noscroll')
  })

  $('.toggle_menu').click(function(){
    $('.fullpage_menu').toggleClass('show');
    $('body').toggleClass('noscroll');
  })

});


