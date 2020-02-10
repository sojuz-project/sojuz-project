window.work_menu = function(t) {
  document.getElementById('menu-ico').classList.add('active');
  document.getElementById('toggle-columns').classList.remove('active');
  document.getElementById('main-wrapper').classList.remove('resize');
  if (localStorage.getItem('work-area-state') == 'work_menu') {
    localStorage.setItem('work-area-state', 'work_menu');
    close_panel();
  } else {
    document.getElementById('work-description').innerHTML = 'Choose option';
    document.getElementById('page-wrapper').classList.add('open');
    document.getElementById('work-wrapper').classList.add('open');
    var data = [
      { name: 'Select project from list', action: 'projects_list', attrs: {}, ico: 'align-justify' },
      { name: 'Save projest as', action: 'save_project', attrs: {}, ico: 'arrow-up-circle' },
      { name: 'Customize project', action: 'customize_project', attrs: {}, ico: 'edit' },
      { name: 'WordPress admin panel', action: 'wp_panel', attrs: {}, ico: 'tool' },
      { name: 'Leave dashboard and preview project', action: 'preview_project', attrs: {}, ico: 'eye' },
      { name: 'Launch project in cloud', action: 'launch_project', attrs: {}, ico: 'upload-cloud' },
      { name: 'Reset WordPress database', action: 'reset_wpdb', attrs: {}, ico: 'upload-cloud' },
      { name: 'Close', action: 'close_panel', attrs: {}, ico: 'x' },
    ];
    console.log('project', app.project);
    appendDot(data, work_menu_tpl, 'work-wrapper-body');

    // document.getElementById('project-name').innerText = project;
    localStorage.setItem('work-area-state', 'work_menu');
  }
};

window.projects_repo = function(t) {
  var data = [
    { name: 'Zero boilerplate', action: 'clone_project', attrs: {}, ico: 'archive' },
    { name: 'Sojuz landing', action: 'clone_project', attrs: {}, ico: 'archive' },
    { name: 'Sojuz blog', action: 'clone_project', attrs: {}, ico: 'archive' },
    { name: 'Sojuz woocommerce', action: 'clone_project', attrs: {}, ico: 'archive' },
  ];
  appendDot(data, work_menu_tpl, 'work-wrapper-body');
  localStorage.setItem('work-area-state', 'work_menu');
};

/* MENU - SIDEBAR */

function create_menu() {
  var sidebar_menu = {};
  try {
    css_collection.map((el) => {
      if (!sidebar_menu[el.group]) {
        sidebar_menu[el.group] = el;
      }
      if (el.selected) sidebar_menu[el.group].selected = true;
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

/* MENU - sub css files */
function create_submenu(_group) {
  try {
    css_collection.map((el) => {
      if (!sidebar_menu[el.group]) {
        sidebar_menu[el.group] = el;
      }
      if (el.selected) sidebar_menu[el.group].selected = true;
      if (el.group == group) {
        sidebar_menu[el.group].active = true;
      } else {
        sidebar_menu[el.group].active = false;
      }
    });
  } catch (error) {}
}
