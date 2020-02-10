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
  Blur content
*/
const shade_left = () => {
  if (localStorage.getItem('work-area-state') != 'customize_project') {
    document.getElementById('body-wrapper').classList.add('shade');
  }
};
const unshade_left = () => {
  document.getElementById('body-wrapper').classList.remove('shade');
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
