const app = {
  group: '',
  name: '',
  project: '',
  layout: '',
};

window.launch_project = function(t) {
  alert('3, 2, 1, Boom!!!');
};
window.wp_panel = function() {
  window.location.href = 'https://docker.local/backend/wp-admin';
};
window.preview_project = function() {
  window.location.href = 'https://docker.local';
};

function close_panel() {
  document.getElementById('page-wrapper').classList.remove('open');
  document.getElementById('work-wrapper').classList.remove('open');
  localStorage.setItem('work-area-state', null);
  document.getElementById('work-wrapper-body').innerHTML = '';
  document.getElementById('body-wrapper').classList.remove('shade');
  document.getElementById('main-wrapper').classList.remove('resize');
  document.getElementById('menu-ico').classList.remove('active');
}

function shade_left() {
  if (localStorage.getItem('work-area-state') != 'customize_project') {
    document.getElementById('body-wrapper').classList.add('shade');
  }
}
function unshade_left() {
  document.getElementById('body-wrapper').classList.remove('shade');
}

/**
 * Helpers
 */

function global_check(event) {
  css_collection.map((el) => {
    if (el.file == event.target.defaultValue) {
      // console.log(el);
      return (el.selected = event.target.checked);
    }
  });
  store_collection();
  create_menu();

  document.getElementById('preview')
    ? document
        .getElementById('preview')
        .contentWindow.postMessage({ call: 'sendValue', value: JSON.stringify(css_collection) }, '*')
    : false;
}

function store_collection() {
  localStorage.setItem('css_collection', JSON.stringify(css_collection));
}

function appendDot(data, tpl, target_id) {
  var tempFn = doT.template(tpl);
  var resultText = tempFn(data);
  document.getElementById(target_id).innerHTML = resultText;
}

var add_new_css = function(group) {
  fetch('/sojuz-project/newcss', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ group: group }),
  })
    .then(function(response) {
      return response.text();
    })
    .then((data) => {
      document.getElementById('popup').classList.add('open');
      open_editor(data);
      appendDot({}, popupbar_editcss_tpl, 'popup_bar');
    });
};

function onMyFrameLoad() {
  document.getElementById('preview')
    ? document
        .getElementById('preview')
        .contentWindow.postMessage({ call: 'sendValue', value: JSON.stringify(css_collection) }, '*')
    : false;
}

get_project();
