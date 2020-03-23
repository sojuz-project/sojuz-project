/*
  Render DOT template
*/
const appendDot = (data, tpl, target_id) => {
  var tempFn = doT.template(tpl);
  var resultText = tempFn(data);
  document.getElementById(target_id).innerHTML = resultText;
};
/*
  Streaming server responce
*/
const onStreamRes = (onDone, onChunk, onError) => (res) => {
  const reader = res.body.getReader();
  new ReadableStream({
    start(controller) {
      function push() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              onDone();
              controller.close();
              return;
            }
            const chunkString = new TextDecoder('utf-8').decode(value);
            onChunk(chunkString);
            controller.enqueue(value);
            push();
          })
          .catch(onError);
      }
      push();
    },
  });
};

/*
  Close popup
*/
var close_popup = function() {
  document.getElementById('popup').classList.remove('open');
  document.getElementById('container').innerHTML = '';
};
/*
  Resize app columns
*/
var resize_columns = function() {
  document.getElementById('main-wrapper').classList.toggle('resize');
};
var close_columns = function() {
  document.getElementById('main-wrapper').classList.remove('resize');
};
/*
  Terminal message
*/
const terminial_msg = (msg) => {
  var node = document.createElement('DIV');
  node.innerHTML = msg;
  var parent = document.getElementById('work-terminal');
  parent.insertBefore(node, parent.firstChild);
};
/*
  User friendly message
*/
var msg = function(msg, type) {
  appendDot(
    {
      text: msg,
      class: type,
    },
    message_tpl,
    'work-wrapper-msg'
  );
};

window.open_work = () => {
  console.log(app_atrs);
  document.getElementById('menu-ico').classList.add('active');
  document.getElementById('page-wrapper').classList.add('open');
  document.getElementById('work-wrapper').classList.add('open');
};
window.close_work = () => {
  if (app_atrs.customize_css == true) {
    // exerption for css customizer
    document.getElementById('main-menu').style = 'display:block';
    app_atrs.customize_css = false;
    app_action('project_frontend_menu', this);
    close_columns();
  } else {
    // main_menu_active('');
    document.getElementById('menu-ico').classList.remove('active');
    document.getElementById('page-wrapper').classList.remove('open');
    document.getElementById('work-wrapper').classList.remove('open');
    // customize css exerption
    document.getElementById('toggle-columns').classList.remove('active');
  }
};

// LZW-compress a string
function lzw_encode(s) {
  var dict = {};
  var data = (s + '').split('');
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  for (var i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
    } else {
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      dict[phrase + currChar] = code;
      code++;
      phrase = currChar;
    }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i = 0; i < out.length; i++) {
    out[i] = String.fromCharCode(out[i]);
  }
  return out.join('');
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
  var dict = {};
  var data = (s + '').split('');
  var currChar = data[0];
  var oldPhrase = currChar;
  var out = [currChar];
  var code = 256;
  var phrase;
  for (var i = 1; i < data.length; i++) {
    var currCode = data[i].charCodeAt(0);
    if (currCode < 256) {
      phrase = data[i];
    } else {
      phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
    }
    out.push(phrase);
    currChar = phrase.charAt(0);
    dict[code] = oldPhrase + currChar;
    code++;
    oldPhrase = phrase;
  }
  return out.join('');
}
