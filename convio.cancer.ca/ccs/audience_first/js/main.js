/* ===========================================================================
Variables
============================================================================== */
var CCS = CCS || {};

/* ===========================================================================
jQuery Document Ready
============================================================================== */
jQuery(function(){
  CCS.init();
});

CCS = {
  init : function() {
    var isHomePage = function() { if(jQuery('#js_rotator').length > 0) { isHomePage = true; } };
    isHomePage();

    MEGAMENU.init();
    // var obj = this;
    if (isHomePage == true) {
      //JQTWEET.loadTweets();
      ROTATOR.setTimeEvent();
      ROTATOR.setUpButtons();
      ROTATOR.setUpBottomNav();
    }
    if (jQuery("#accordion")){
	    jQuery( "#accordion" ).accordion(200);
   }
  }
}


MEGAMENU = { // functionality of the mega menu
  init: function() {
	if (jQuery('.js_nav_main')) {
		jQuery('.js_nav_main').find('.main_menu').each(function() {
		  jQuery(this).find('.mega_title').on('click', function() {
			MEGAMENU.menuOnClick(jQuery(this).parent());
			return false;
		  })
		})
	
		jQuery(document).on('click', function() {
		  if(!jQuery(event.target).is('.menu_sub_1')) {
			jQuery('.menu_sub_1').each(function() {
			  jQuery(this).parent().removeClass('active');
			  jQuery(this).css('display','none');
			});
		  }
		})
	}
  },
  menuOnClick: function(selected) {
    jQuery('.menu_sub_1').each(function() { jQuery(this).css('display','none'); jQuery(this).parent().removeClass('active'); })
    var show_the_dropdown = selected.find('.menu_sub_1');

    // get the position of the navigation and all the first position sub menus
    var menu_start_position = jQuery('.js_nav_main .main_menu:first-child').position().left;
    var menu_selected_position = show_the_dropdown.parent().position().left;
    var menu_offset_item = (menu_start_position - menu_selected_position);

    if(selected.hasClass('active')) {
      selected.removeClass('active');
      if(show_the_dropdown.length > 0) {
        //show_the_dropdown.fadeTo(200,0);
        show_the_dropdown.css({
          'display': 'none'
        });
      }
    } else {
      selected.addClass('active');
      if(show_the_dropdown.length > 0) {
        //show_the_dropdown.fadeTo(200,1);
        show_the_dropdown.css({
          'marginLeft': menu_offset_item,
          'display': 'block'
        });
      }
    }
    return false;
  }
} // END MEGA MENU

ROTATOR = { // perform the functions of the rotator
    jQuerycontrols: '#js_sel',
    jQuerynavigate: '#js_rotator_nav',
    banner_timer: 15000, // set the time between transitions
    iSliderIsOpen: true,
    curSelBanner: '',
    timer: '',
    setTimeEvent: function(selector) {
      if(selector != undefined) {
        selector = selector.next();
      } else {
        selector = jQuery(this.jQuerycontrols).find('span').next();
      }
      timer = setTimeout(function() { ROTATOR.rotateBanner(selector); }, ROTATOR.banner_timer);
    },
    rotateBanner: function(selector) {
      if(selector.attr('data-rsel') == undefined) {
        selector = jQuery(this.jQuerycontrols).find('span:first-child');
      }
      if(ROTATOR.curSelBanner.next().attr('data-rsel') == undefined) {
        ROTATOR.curSelBanner = jQuery(this.jQuerycontrols).find('span:first-child');
        ROTATOR.rotatorBannerSwitch(ROTATOR.curSelBanner);
      } else {
        ROTATOR.rotatorBannerSwitch(ROTATOR.curSelBanner.next());
      }
      ROTATOR.setTimeEvent(selector);
    },
    rotatorBannerSwitch: function(targetObj) {
      var initBG = targetObj.attr('data-rsel');
      var imgURL = '../../img/'+ initBG +'.jpg';
      targetObj.parent().find('span').each(function() { jQuery(this).removeClass('active'); })
      targetObj.addClass('active');
      ROTATOR.curSelBanner = targetObj; // Identify the current banner
      jQuery('.banner_holder').each(function() { jQuery(this).find('.banner_copy').fadeTo(200,0); jQuery(this).fadeOut(400); })
      jQuery('.banner_holder.' + initBG).fadeTo(400,1, function() { jQuery(this).find('.banner_copy').fadeTo(400, 1); });
    },
    setUpButtons: function() {
      jQuery('.js_i_pro').on('click', ROTATOR.dropOpenI);
      jQuery(this.jQuerycontrols).find('span').each(function(i) {
        if(i == 0) { // set the first button on load to be active
          jQuery(this).addClass('active'); 
          ROTATOR.curSelBanner = jQuery(this); // Identify the current banner
          ROTATOR.rotatorBannerSwitch(jQuery(this));
        }
        jQuery(this).on('click', ROTATOR.rotatorClick); // set up the on click event for the buttons
      })
    },
    dropOpenI: function() {
      if(ROTATOR.iSliderIsOpen == true) {
        var closedHeight = (jQuery('.i_profile .js_i_pro').height()) + (jQuery('.js_ihave li:first-child').height()) * -1 - 34;
        jQuery('.i_profile').animate({'top': closedHeight}, 200);
        ROTATOR.iSliderIsOpen = false;
      } else {
        ROTATOR.setUpBottomNav();
        ROTATOR.iSliderIsOpen = true;
      }
    },
    setUpBottomNav: function() {
      var jQueryiprofile = jQuery('.i_profile');
      var iProHeight = (jQueryiprofile.height() * -1) + 77;
      jQueryiprofile.delay(200).animate({'top': iProHeight}, 200);
      ROTATOR.iSliderIsOpen = true;
      jQueryiprofile.find('.i_have').each(function() {
        jQuery(this).off('click');
        jQuery(this).on('click', ROTATOR.selectINav);
      })
    },
    selectINav: function() {
        clearTimeout(timer);
        var getSelLi = jQuery(this);
        var iTitle = getSelLi.attr('data-itype');
        getSelLi.remove();
        ROTATOR.setUpBottomNav();
        ROTATOR.iSliderIsOpen = false;
        jQuery('.i_profile .js_ihave').first('.ihave').prepend(getSelLi);
        var closedHeight = (jQuery('.i_profile .js_i_pro').height()) + (getSelLi.height()) * -1 - 34;
        jQuery('.i_profile').animate({'top': closedHeight}, 200);
        jQuery('#js_sel').find('span').each(function() { jQuery(this).removeClass('active'); })
        if(jQuery('#js_sel span:last-child').hasClass('js_added_sel')) { jQuery('#js_sel span:last-child').remove(); }
        jQuery('#js_sel').append('<span class="js_added_sel" data-rsel="'+ iTitle +'" class="active"></span>');
        var selectIObg = jQuery('#js_sel span:last-child');
        ROTATOR.curSelBanner = selectIObg; // Identify the current banner
        ROTATOR.rotatorBannerSwitch(selectIObg);
        selectIObg.on('click', ROTATOR.rotatorClick);
    },
    rotatorClick: function() {
      var user_selected_nav = jQuery(this).attr('data-rsel');
      var current_selected_banner = ROTATOR.curSelBanner.attr('data-rsel');
      if(user_selected_nav != current_selected_banner) { ROTATOR.rotatorBannerSwitch(jQuery(this)); }
    }
  } // END ROTATOR

  JQTWEET = {  
      user: 'cancersociety', // Set twitter username, number of tweets & id/class to append tweets
      numTweets: 3,
      appendTo: '#js_twitter',
      loadTweets: function() { // core function of jqtweet
          jQuery.ajax({
              url: 'http://api.twitter.com/1/statuses/user_timeline.json/',
              type: 'GET',
              dataType: 'jsonp',
              data: {
                  screen_name: JQTWEET.user,
                  include_rts: true,
                  count: JQTWEET.numTweets,
                  include_entities: true
              },
              success: function(data, textStatus, xhr) {
                   var html = '<div class="tweet">TWEET_TEXT<div class="time">AGO</div>';
                   // append tweets into page
                   for (var i = 0; i < data.length; i++) {
                      jQuery(JQTWEET.appendTo).append(
                          html.replace('TWEET_TEXT', JQTWEET.ify.clean(data[i].text) )
                              .replace(/USER/g, data[i].user.screen_name)
                              .replace('AGO', JQTWEET.timeAgo(data[i].created_at) )
                              .replace(/ID/g, data[i].id_str)
                      );
                   }
              }   
          });  
      }, 
      timeAgo: function(dateString) {
          var rightNow = new Date();
          var then = new Date(dateString);     
          if (jQuery.browser.msie) {
              then = Date.parse(dateString.replace(/( \+)/, ' UTCjQuery1')); // IE can't parse these crazy Ruby dates
          }
          var diff = rightNow - then;
          var second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24,
          week = day * 7;
          if (isNaN(diff) || diff < 0) { return ""; }
          if (diff < second * 2) {  return "right now"; }
          if (diff < minute) { return Math.floor(diff / second) + " seconds ago"; }
          if (diff < minute * 2) { return "about 1 minute ago"; }
          if (diff < hour) { return Math.floor(diff / minute) + " minutes ago"; }
          if (diff < hour * 2) { return "about 1 hour ago"; }
          if (diff < day) { return  Math.floor(diff / hour) + " hours ago"; }
          if (diff > day && diff < day * 2) { return "yesterday"; }
          if (diff < day * 365) { return Math.floor(diff / day) + " days ago"; }
          else { return "over a year ago"; }
      }, // timeAgo()
      ify:  {
        link: function(tweet) {
          return tweet.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|jQuery))/g, function(link, m1, m2, m3, m4) {
            var http = m2.match(/w/) ? 'http://' : '';
            return '<a class="twtr-hyperlink" target="_blank" href="' + http + m1 + '">' + ((m1.length > 25) ? m1.substr(0, 24) + '...' : m1) + '</a>' + m4;
          });
        },
        at: function(tweet) {
          return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20})/g, function(m, username) {
            return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name=' + username + '">@' + username + '</a>';
          });
        },
        list: function(tweet) {
          return tweet.replace(/\B[@＠]([a-zA-Z0-9_]{1,20}\/\w+)/g, function(m, userlist) {
            return '<a target="_blank" class="twtr-atreply" href="http://twitter.com/' + userlist + '">@' + userlist + '</a>';
          });
        },
        hash: function(tweet) {
          return tweet.replace(/(^|\s+)#(\w+)/gi, function(m, before, hash) {
            return before + '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search?q=%23' + hash + '">#' + hash + '</a>';
          });
        },
        clean: function(tweet) {
          return this.hash(this.at(this.list(this.link(tweet))));
        }
      } // ify  
  };