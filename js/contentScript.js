'use strict';

window.setInterval(function() {
  var player = document.getElementsByClassName('material-player-middle');
  var currentTrack = document.querySelector('tr.song-row.currently-playing');

  if (player && player[0] && currentTrack) {
    var musicId = currentTrack.getAttribute('data-id')
    var songLinkUrl = getSongLinkUrl(musicId);

    var songLinkEl = document.getElementById('songLinkEl')
    if (songLinkEl) {
      songLinkEl.href = songLinkUrl;
    }
    else {
      var a = document.createElement('a');
      a.appendChild(document.createTextNode("song.link"));
      a.id = "songLinkEl"
      a.title = "song.link";
      a.href = songLinkUrl;
      a.target = "_blank";
      player[0].appendChild(a);
    }
  }
}, 1000);

function getSongLinkUrl(musicId) {
  return 'https://song.link/https://play.google.com/music/m/' + musicId;
}
