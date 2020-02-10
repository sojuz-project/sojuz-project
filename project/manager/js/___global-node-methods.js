/* minimalize feth method */
var mf = function(endpoint, data, method, callback, onMessage = (param) => console.log(param)) {
  let attrs = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
  };
  if (method == 'POST') {
    attrs.body = JSON.stringify(data);
  }

  fetch(`/sojuz-project/${endpoint}`, attrs)
    .then(function(res) {
      onMessage(res);
    })
    .then((data) => {
      callback(data);
    })
    .catch(function(res) {});
};

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

var terminial_msg = function(msg) {
  var node = document.createElement('DIV');
  node.innerHTML = msg;
  var parent = document.getElementById('work-terminal');
  parent.insertBefore(node, parent.firstChild);
};
/**
 *
 * @param global_function
 * customize_project( this )
 */
window.customize_project = function(t) {
  document.getElementById('work-description').innerHTML = 'Customize project';
  document.getElementById('body-wrapper').classList.remove('shade');
  document.getElementById('toggle-columns').classList.add('active');
  document.getElementById('main-wrapper').classList.add('resize');
  document.getElementById('page-wrapper').classList.add('open');
  document.getElementById('work-wrapper').classList.add('open');
  localStorage.setItem('work-area-state', 'customize_project');

  var data = [];
  appendDot(data, work_prev_tpl, 'work-wrapper-body');

  if (layout == 'customize') {
    /**
     * START REBUILD FRONTEND
     */
    run_customizer();
  } else {
    mf('set_customize_layout', { project }, 'POST', (data) => {
      setTimeout(function() {
        var iframe = document.getElementById('preview');
        iframe.src = iframe.src;
      }, 3000);
      run_customizer();
    });
  }
  function run_customizer() {
    load_page('css-doc/globals/', 'index', 'index');
    document.getElementById('work-progress').classList.add('active');
    window.document.addEventListener('myCustomEvent', (e) => {
      document.getElementById('work-wrapper-msg').innerHTML = '';
      document.getElementById('work-progress').classList.remove('active');
    });
  }
};

/**
 *
 * @param global_function
 * load_project( this )
 */
window.load_project = function(t) {
  document.getElementById('work-progress').classList.add('active');
  document.getElementById('work-wrapper-body').classList.add('hidden');
};
/**
 *
 * @param global_function
 * load_db( this )
 */
window.load_db = function(t) {
  msg('Wait for import project database to local Wordpress', 'process');
  mf('loaddb', { project: t.dataset.name }, 'POST', (data) => {
    msg(`Project ${t.dataset.name} load successfully. Go to admin and reactivate elastic plugin`, 'success');
    document.getElementById('project-name').innerHTML = t.dataset.name;
    document.getElementById('work-wrapper-body').classList.remove('hidden');
    document.getElementById('work-progress').classList.remove('active');
    projects_list('');
  });
};

function readStream(stream) {
  const reader = stream.getReader();
  let charsReceived = 0;
  let result = '';
  reader.read().then(function processText({ done, value }) {
    if (done) {
      // console.log('Stream complete', result);
      return;
    }
    charsReceived += value.length;
    const chunk = value;
    // console.log('Read ' + charsReceived + ' characters so far.Current chunk = ' + chunk);
    result += chunk;
    return reader.read().then(processText);
  });
}

window.clone_project = function() {
  fetch(`/sojuz-project/${'clone_project'}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: { foo: 'bar' },
  }).then(
    onStreamRes(
      () => {
        console.log('DONE!!!!');
      },
      (el) => {
        terminial_msg('<p>' + el + '</p>');
        console.log('chunk', el);
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
