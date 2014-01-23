/*! ========================================================================
 * Project #iamdash2 v0.0.1
 * Authored by: Victor S. Barba [vsbarba@gmail.com]
 *
 * @File Information:
 * ------------------
 * This javascript file is using semantic versioning (http://semver.org)
 * The APIs declared may change anytime as the project requires, it will bump
 * to version 1.0.0 once the team had established and finalised flow and
 * functionality.
 *
 * @Synopsis:
 * ------------------
 * I love #iamdash2 :))
 * ========================================================================= */

+ function($) {
  "use strict";

  var GlobalConfig = {};
  GlobalConfig.accessToken = '178940740.dcfa734.dd4c485b4eb6453baec6324b47f5b01b';
  GlobalConfig.hashtag = 'iamdash2';

  // End Points
  var InstagramAPI = {};
  InstagramAPI.recentMediaEp = 'https://api.instagram.com/v1/tags/' + GlobalConfig.hashtag + '/media/recent?access_token=' + GlobalConfig.accessToken;

  /*
   *  Escape Characters
   */

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|\"]/g, '\\$&');
  }



  var DashTwo = function() {
    return this;
  }
  
  DashTwo.default = {
    accessToken: null,
    hashtag: null
  }
  
  DashTwo.prototype.loggerIG = {

    _startWebservice: function(url, timestamp) {
      console.log('===== Instagram Web Service Call =====');
      console.log('URL: ' + url);
      console.log('Timestamp: ' + timestamp);
    },

    _endWebservice: function(url, timestamp) {
      console.log('URL: ' + url);
      console.log('Timestamp: ' + timestamp);
      console.log('===== Ending Instagram Web Service Call =====');
    }

  }

  DashTwo.prototype.webservice = {

    _getRecentMedia: function() {
      $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        url: InstagramAPI.recentMediaEp,
        success: function(data) {
          dashTwo.loggerIG._startWebservice(InstagramAPI.recentMediaEp, 'today');
          console.log(data);
          for (var i = 0; i < data.data.length; i++) {
            $('.temp-append').append(dashTwo.template._timeline(data.data[i]));
          }
          dashTwo.loggerIG._endWebservice(InstagramAPI.recentMediaEp, 'today');
        },
        error: function(data) {
          console.log('error');
        }
      });
    }

  }
  
  DashTwo.prototype.template = {
    
    _timeline : function(data) {
      var timelineHtml = "";
      console.log(data.images.thumbnail.url);
      timelineHtml += '<img src=' + data.images.thumbnail.url + '>';
      return timelineHtml;

    }
    
  }

  // TODO MODULARIZE ALL PROTO

  DashTwo.prototype.start = {

    _init: function() {
      dashTwo.webservice._getRecentMedia();
    }

  } //End CodeEditor

  // Globalise!!
  // =======================
  window.dashTwo = new DashTwo();

  // Start plugin on Document Load
  // =============================
  $(document).ready(function() {
    dashTwo.start._init(dashTwo);
  });

}(window.jQuery);
