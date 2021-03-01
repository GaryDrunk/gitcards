const data = {"items":[{"front":{"title":"这里是标题，可是看不到标题？有时能看到，有时看不到","description":"这里是卡片正面的内容"},"back":{"title":"这里是卡片的背面","description":"这里是卡片背面的内容"},"link":{"name":"","uri":"如果有链接，可以填写在这里，点击后会跳转到链接"},"uri":"1613765009","pos":{"x":0,"y":0}},{"front":{"title":"第二张卡片标题","description":"第二张卡片的正面内容"},"back":{"title":"第二张卡片的背面标题","description":"第二张卡片的背面内容"},"link":{"name":"","uri":"www.baidu.com"},"uri":"1614007256","pos":{"x":742,"y":72}},{"front":{"title":"第三张卡片","description":"正面"},"back":{"title":"背面标题","description":"背面内容"},"link":{"name":"","uri":""},"uri":"1614009000","pos":{"x":373,"y":43}}]};//current card 
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
