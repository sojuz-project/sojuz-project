function main_menu_active(t) {
  [...document.querySelectorAll('#main-menu nav a')].map((el) => {
    el.classList ? el.classList.remove('active') : null;
  });
  try {
    t.classList.add('active');
  } catch (error) {}
}

function create_sidebar_menu() {
  var sidebar_menu = {};
  try {
    app_atrs.css_collection.map((el) => {
      if (!sidebar_menu[el.group]) {
        sidebar_menu[el.group] = el;
      }
      el.selected_in_group = false;
      if (el.selected && app_atrs.customize_css) {
        sidebar_menu[el.group].selected_in_group = true;
      }

      if (el.group == app_atrs.group) {
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
    app_atrs.css_collection.map((el) => {
      if (!app_atrs.customize_css) {
        el.is_checked = false;
      } else {
        el.is_checked = true;
      }
      if (el.name == app_atrs.name) {
        el.subactive = true;
      } else {
        el.subactive = false;
      }

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
    app_atrs.css_collection.map((el) => {
      if (el.file == event.target.defaultValue) {
        el.selected = event.target.checked;
      }
      out.push(el);
    });
    app_atrs.css_collection = out;
    update_app_attrs();
    set_css_collection(app_atrs.project, function(res) {
      // app_atrs.css_collection = res;
      create_sidebar_menu();
      document.getElementById('preview')
        ? document
            .getElementById('preview')
            .contentWindow.postMessage({ call: 'sendValue', value: JSON.stringify(app_atrs.css_collection) }, '*')
        : false;
    });
  } catch (error) {
    console.log(error);
  }
}

function onMyFrameLoad() {
  document.getElementById('preview')
    ? document
        .getElementById('preview')
        .contentWindow.postMessage({ call: 'sendValue', value: JSON.stringify(app_atrs.css_collection) }, '*')
    : false;
}

var load_page = function(base, group, name, callback) {
  document.getElementById('page-wrapper').scrollTop = 0;
  document.getElementById('sidebar').innerHTML = '';
  document.getElementById('body-bar').innerHTML = '';
  read_page(`${app_host}sojuz-project/doc/${base}${group}/${name}.html`, (data) => {
    try {
      callback(data);
    } catch (error) {
      console.log('read_page callback error', base, group, name);
    }
  });
};

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
