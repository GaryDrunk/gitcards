const data = {"items":[ {"front":{"title":"破十法做减法","description":"https://wenku.baidu.com/view/1afba388a66e58fafab069dc5022aaea998f41c8.html?rec_flag=default"},"back":{"title":"","description":""},"link":{"name":"","uri":""},"uri":"1614177738","pos":{"x":0,"y":0}}]};//current card 
var currentIndex = -1;
function afterMetroReady() {
var z = 0;
  for (let i = 0; i < data.items.length; i++) {
    const cardDiv = document.getElementById('card_' + i);
    const item = data.items[i];
    cardDiv.addEventListener('mouseenter', e => {
      let theId = _.replace(cardDiv.id, 'card_', '');
      currentIndex = _.parseInt(theId);
      z=z+99;
      cardDiv.style.zIndex = z;
      title = item.front.title + '|'+ item.uri
      document.title = title;
    });
    cardDiv.addEventListener('mouseleave', e => {
      currentIndex = -1;
      z= z-9;
      cardDiv.style.zIndex = z;
    });
    // set initial position
    cardDiv.style.left = data.items[i].pos.x + "px";
    cardDiv.style.top = data.items[i].pos.y + "px";
    // markdown viewer
    const viewer = new toastui.Editor({
      el: document.querySelector("#viewerFront_" + i),
      initialValue: item.front.description
    });
    const viewer_back = new toastui.Editor({
      el: document.querySelector("#viewerBack_" + i),
      initialValue: item.back.description
    });
  }
}
function onDragOver(pos, el) {
  //console.log(pos);
  //console.log(el); el is null
  if (currentIndex < 0) {
    return;
  }
  data.items[currentIndex].pos = pos;
  cardDiv.style.zIndex = (+ new Date() - 1599754550000);
}
function showCharm() {
copyTextToClipboard(JSON.stringify(data));
//navigator.clipboard.writeText(JSON.stringify(data));
//alert("布局数据已复制到剪贴板");
}
document.addEventListener("DOMContentLoaded", function (event) {
  const app = new Vue({
    el: '#app',
    data: {
      items: data.items
    },
    methods: {
      toggleCard: function (index) {
        $('#card_' + index).toggleClass('active');
      }
    },
    mounted: function () {
      Metro.init();
      afterMetroReady();
    }
  });
});



//下面是剪贴板
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.display= "none";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
