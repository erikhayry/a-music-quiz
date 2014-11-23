"use strict";var spotifyService=function(){function a(b,c){var d=c||{},e=d.deferred||Q.defer(),f=d.playlist||{},g=d.url||i+"/users/"+b+"/playlists?limit=50&offest=0";return h[b]?e.resolve(h[b]):$.ajax(g,j).then(function(c){c.items.forEach(function(a){f[a.id]={name:a.name,id:a.id,total:a.tracks.total,owner:a.owner.id}}),c.next?a(b,{playlist:f,url:c.next,deferred:e}):(h[b]=f,e.resolve(h[b]))},function(){e.reject(new Error("Unable to get playlists"))}),e.promise}function b(b,c){var d=Q.defer();return h[b]&&h[b][c]?d.resolve(h[b][c]):a(b).then(function(a){a[c]?d.resolve(a[c]):d.reject(new Error("Failed loading playlist info"))},function(){d.reject(new Error("Failed loading playlist info"))}),d.promise}function c(a,b,c){var d=Q.defer(),e=100,f=c||0,h=e>=f?0:Math.floor(Math.random()*(f-e)),k=i+"/users/"+a+"/playlists/"+b+"/tracks?limit="+e+"&offset="+h,l=function(a){d.resolve(Helpers.shuffle(a))},m=function(a){var b=[];a.forEach(function(a){b.push({artist:{name:a.track.artists[0].name,id:a.track.artists[0].id},track:{name:a.track.name,url:a.track.preview_url}})}),g[k]=b,l(g[k])};return g[k]?l(g[k]):$.ajax(k,j).then(function(a){m(a.items)},function(a){d.reject(a)}),d.promise}function d(a){return j={headers:{Authorization:"Bearer "+a}},$.ajax(i+"/me",j)}function e(a){var b=0===a.indexOf("?")?a.slice(1).split("&"):a.split("&"),c={};return b.forEach(function(a){var b=a.split("=");c[b[0]]=b[1]}),{access_token:c.access_token,refresh_token:c.refresh_token}}function f(a){var b=e(a);return{accessToken:b.access_token,refreshToken:b.refresh_token}}var g={},h={},i="https://api.spotify.com/v1",j={};return{getTracks:function(a,d){return b(a,d).then(function(b){return c(a,d,b.total)})},getPlaylists:a,getTokens:f,getUser:d}}();