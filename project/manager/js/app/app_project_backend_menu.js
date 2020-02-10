window.project_backend_menu = function(t) {
  setAppState('project_backend_menu');
  var data = [
    { name: 'WP admin panel', action: 'open_wp_admin', attrs: {}, ico: 'layout' },
    { name: 'Reindex elastic search', action: 'alert(`Not avilable on this version`)', attrs: {}, ico: 'search' },
    { name: 'Get DB from local WordPress', action: 'clone_project', attrs: {}, ico: 'database' },
    { name: 'Set DB to local WordPress', action: 'clone_project', attrs: {}, ico: 'database' },
    { name: 'Reset WordPress DB', action: 'alert(`Not avilable on this version`)', attrs: {}, ico: 'database' },
  ];
  data.push({ name: 'back', ico: 'chevron-left', action: 'project_menu' });
  appendDot(data, work_menu_tpl, 'work-wrapper-body');
  document.getElementById('work-wrapper-msg').innerHTML = '';
  load_page('templates/', 'pages', 'project_backend_menu');
};
