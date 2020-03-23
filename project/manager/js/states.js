const app_host = 'https://docker.local/';
let app_atrs;
const app_routing = {
  home_page: {
    page: ['templates/', 'pages', 'home_page'],
    action: 'list_projects',
    worker: false,
    customize_css: false,
  },
  css_guideline: {
    page: null,
    action: 'get_css_guideline',
    worker: 'close',
  },
  gutenberg_blocks: {
    page: ['templates/', 'pages', 'gutenberg_blocks'],
    action: 'gutenberg_blocks',
    worker: 'close',
  },
  list_projects: {
    page: ['templates/', 'pages', 'home_page'],
    action: 'list_projects',
    worker: false,
    customize_css: false,
  },
  set_project: {
    page: null,
    action: 'set_project',
    worker: false,
    customize_css: false,
  },
  project_menu: {
    page: ['templates/', 'pages', 'project_menu'],
    action: 'project_menu',
    worker: 'open',
  },
  project_frontend_menu: {
    page: ['templates/', 'pages', 'project_frontend_menu'],
    action: 'project_frontend_menu',
    worker: 'open',
  },
  project_backend_menu: {
    page: ['templates/', 'pages', 'project_backend_menu'],
    action: 'project_backend_menu',
    worker: 'open',
  },
  open_wp_admin: {
    page: null,
    action: 'open_wp_admin',
    worker: 'open',
  },
  customize_css: {
    page: ['templates/', 'pages', 'css_guideline'],
    action: 'customize_css',
    worker: 'open',
    customize_css: true,
  },
  github_projects_menu: {
    page: ['templates/', 'pages', 'list_projects'],
    action: 'github_projects_menu',
    worker: 'open',
  },
  db_local_to_project: {
    page: null,
    action: 'db_local_to_project',
    worker: false,
  },
  db_delete_revisions: {
    page: null,
    action: 'db_delete_revisions',
    worker: false,
  },
  clone_project: {
    page: null,
    action: 'clone_project',
    worker: false,
  },
  delete_project: {
    page: null,
    action: 'delete_project',
    worker: false,
  },
  build_preview: {
    page: null,
    action: 'build_preview',
    worker: false,
  },
};

if (localStorage.getItem('app_atrs')) {
  app_atrs = JSON.parse(localStorage.getItem('app_atrs'));
} else {
  app_atrs = {
    project: '',
    css_collection: [],
    layout: '',
    group: 'index',
    action: '',
  };
}

window.update_app_attrs = () => {
  localStorage.setItem('app_atrs', JSON.stringify(app_atrs));
};

window.buildApp = () => {
  const postHash = window.location.hash.substr(1);
  // TODO - set undefined action to first app_routing key
  const action = postHash ? postHash : 'home_page';
  Object.assign(app_atrs, app_routing[action], getUrlParams(window.location.search));
  update_app_attrs();
  app_routing[action] && app_routing[action].worker == 'open' ? open_work() : null;
  app_routing[action] && app_routing[action].worker == 'close' ? close_work() : null;
  // console.log('custom css', app_atrs.customize_css);
  try {
    if (app_routing[action].page) {
      document.getElementById('main-wrapper').dataset.state = app_routing[action].page[2];
      load_page(
        app_routing[action].page[0],
        app_routing[action].page[1],
        app_routing[action].page[2],
        (callback = function(data) {
          document.getElementById('body').innerHTML = data;
          // RUN APP STATE ACTION
          app_routing[action].action ? window[app_routing[action].action]() : null;
        })
      );
    } else {
      // RUN APP STATE ACTION
      app_routing[action].action ? window[app_routing[action].action]() : null;
    }
  } catch (error) {
    terminial_msg(`<p> app_action method is: ${app_routing[action]}. Check states.js to resolve it.</p>`);
  }

  try {
    main_menu_active(document.getElementById(app_routing[action].page[2]));
  } catch (error) {
    // console.log(error);
  }

  document.getElementById('work-project').innerHTML = app_atrs.project;

  function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&');
    return hashes.reduce((params, hash) => {
      let [key, val] = hash.split('=');
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
  }
};

window.app_action = (action, t) => {
  var url = new URL(app_host + 'sojuz-project');
  url.hash = action;
  try {
    var searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(t.dataset)) {
      searchParams.set(key, value);
    }
    url.search = searchParams.toString();
  } catch (error) {}

  window.history.pushState(
    {
      id: action,
    },
    action,
    url.toString()
  );
  buildApp();
};

buildApp();

// /* Rebuild css_collection */
// if (!app_atrs.project) {
//   msg(`get_css_collection error: project not exist`, 'success');
// } else {
//   fetch(`/sojuz-project/${'rebuild_css_collection'}?project=${app_atrs.project}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   }).then(
//     onStreamRes(
//       (data) => {},
//       (el) => {
//         app_atrs.css_collection = JSON.parse(el);
//         update_app_attrs();
//       },
//       (err) => {
//         console.log('Error', err);
//       }
//     )
//   );
// }

// if (_base == 'css-doc/globals/') {
//   create_sidebar_menu();
//   create_submenu(_group);
// }
