window.project_backend_menu = function(project) {
  var data = [
    { name: 'WP admin panel', action: 'open_wp_admin', attrs: {}, ico: 'layout' },
    { name: 'Reindex elastic search', action: 'alert(`Not avilable on this version`)', attrs: {}, ico: 'search' },
    { name: 'DB from local WordPress to project', action: 'db_local_to_project', attrs: {}, ico: 'database' },
    { name: 'DB from project to local WordPress', action: 'db_project_to_local', attrs: {}, ico: 'database' },
    { name: 'DB clear revisions', action: 'db_delete_revisions', attrs: {}, ico: 'database' },
    { name: 'Reset local WordPress DB', action: 'alert(`Not avilable on this version`)', attrs: {}, ico: 'database' },
  ];
  data.push({ name: 'back', ico: 'chevron-left', action: 'project_menu' });
  appendDot(data, work_menu_tpl, 'work-wrapper-body');
  document.getElementById('work-wrapper-msg').innerHTML = '';
};
