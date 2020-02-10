var css_collection = [];

window.home_page = (i = 'home_page') => {
  create_sidebar_menu();
  load_page('templates/', 'pages', 'home_page');
  setAppState(i);
};
window.css_guideline = (i = 'css_guideline') => {
  create_sidebar_menu();
  load_page('css-doc/globals/', 'index', 'css_guideline');
  setAppState(i);
};
window.frontend_modules = (i = 'frontend_modules') => {
  load_page('templates/', 'pages', 'frontend_modules');
  setAppState(i);
};
window.gutenberg_blocks = (i = 'gutenberg_blocks') => {
  load_page('templates/', 'pages', 'gutenberg_blocks');
  setAppState(i);
};

function main_menu_active(id) {
  [...document.querySelectorAll('#main-menu nav a')].map((el) => {
    el.classList ? el.classList.remove('active') : null;
  });
  console.log(id);
  try {
    const t = document.getElementById(id);

    t.classList.add('active');
  } catch (error) {}
}

function create_sidebar_menu() {
  var sidebar_menu = {};
  try {
    css_collection.map((el) => {
      if (!sidebar_menu[el.group]) {
        sidebar_menu[el.group] = el;
      }
      el.selected_in_group = false;
      if (el.selected) sidebar_menu[el.group].selected_in_group = true;
      if (el.group == group) {
        sidebar_menu[el.group].active = true;
      } else {
        sidebar_menu[el.group].active = false;
      }
    });
  } catch (error) {}

  sidebar_menu = Object.values(sidebar_menu);
  appendDot(sidebar_menu, css_menu_tpl, 'sidebar');
}

function create_submenu(_group) {
  const out = [];
  try {
    css_collection.map((el) => {
      if (el.group == _group) {
        out.push(el);
      }
    });
    appendDot(out, css_submenu_tpl, 'body-bar');
  } catch (error) {}
}

function global_check(event) {
  const out = [];
  try {
    css_collection.map((el) => {
      if (el.file == event.target.defaultValue) {
        el.selected = event.target.checked;
      }
      out.push(el);
    });
    css_collection = out;
    set_css_collection(localStorage.getItem('project'));
    create_sidebar_menu();
    document.getElementById('preview')
      ? document
          .getElementById('preview')
          .contentWindow.postMessage({ call: 'sendValue', value: JSON.stringify(css_collection) }, '*')
      : false;
  } catch (error) {}
}

var load_page = function(_base, _group, _name) {
  document.getElementById('page-wrapper').scrollTop = 0;
  group = _group;
  name = _name;
  document.getElementById('sidebar').innerHTML = '';
  document.getElementById('body-bar').innerHTML = '';
  if (_base == 'css-doc/globals/') {
    create_sidebar_menu();
    create_submenu(_group);
  }
  fetch('/sojuz-project/doc/' + _base + _group + '/' + _name + '.html')
    .then(function(response) {
      terminial_msg('<p> Read: /app/doc/' + _base + _group + '/' + _name + '.html' + '</p>');
      return response.text();
    })
    .then((data) => {
      document.getElementById('body').innerHTML = data;
      main_menu_active(_name);
    });
};

function onMyFrameLoad() {
  document.getElementById('preview')
    ? document
        .getElementById('preview')
        .contentWindow.postMessage({ call: 'sendValue', value: JSON.stringify(css_collection) }, '*')
    : false;
}

/* INIT DOCUMENTATION and INTEGRTATE IT wirth APP */
get_css_collection(localStorage.getItem('project'));
