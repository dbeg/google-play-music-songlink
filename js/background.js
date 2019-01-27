'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'play.google.com/music' },
          })
        ],
        actions: [
          new chrome.declarativeContent.ShowPageAction()
        ]
    }]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
     // https://play.google.com/music/listen?u=0#/album/<MUSIC_ID>/<BAGGAGE_METADATA>
     var tabUrl = tabs[0].url;
     var stripFront = tabUrl.substring(tabUrl.indexOf('/album/') + 7);
     var musicId = stripFront.substring(0, stripFront.indexOf('/'))
     chrome.tabs.create({ url: getSongLinkUrl(musicId), active: true });
  });
});

function getSongLinkUrl(musicId) {
  return 'https://song.link/https://play.google.com/music/m/' + musicId;
}
