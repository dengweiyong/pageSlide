/*
精悍页面切换插件
gooddeng 20150808
每个页面自己定义切换的动画
*/
$.fn.pageSlide = function(options) {
  
  pageWrap = $('#pageWrap');

  //当前页
  curPage = null;

  //建仓导航条
  var ul = $('<ul id="pageNav">');
  
  pageWrap.find('>.page').each(function(i, ep) {
    var page = $(this);

    var li = $('<li>'+(i+1)+'</li>')
      .data('page', page)
      .click(function(){        
        var _page = $(this).data('page');
        gotoPage(_page);
      })
      .appendTo(ul);

    page.data('li', li);

    if(i==0){
      curPage=page.show();
      li.addClass('active');
    } 
    
  });

  $("body").append(ul);
  ul.css('margin-left', - ul.outerWidth() / 2);

  //生成前后按钮
  var nextButton = $('<button id="nextButton">></button>')
    .click(function(){
      _page = curPage.next();
      gotoPage(_page)
    })
    .appendTo('body');

  var prevButton = $('<button id="prevButton"><</button>')
    .click(function(){
      _page = curPage.prev();
      gotoPage(_page)
    })
    .hide()
    .appendTo('body');

  
  var canScroll = true;
  pageWrap.on("webkitAnimationEnd AnimationEnd", function() {
    canScroll = true;
    console.log(this);
  });

  $(document).on("mousewheel DOMMouseScroll", function MouseWheelHandler(e) {
    e.preventDefault();
    var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    var delta = Math.max(-1, Math.min(1, value));
    
    //if (!canScroll) { return;}

    gotoPage(delta < 0 ? curPage.next() : curPage.prev());
    
    return false;
  });  

  function gotoPage(page){

    if(page && page.length){
      canScroll = false;
      curPage.hide();     
      curPage.data('li').removeClass('active');

      curPage = page;
      curPage.show();
      curPage.data('li').addClass('active');

      console.log(curPage,  curPage.next().length, curPage.prev().length);

      $(nextButton).toggle(curPage && curPage.next().length === 1);
      $(prevButton).toggle(curPage && curPage.prev().length === 1);
    }    
  }

};
