window.project_menu = function(project) {
  var data = [
    { name: 'Frontend app', action: 'project_frontend_menu', attrs: {}, ico: 'home' },
    { name: 'WordPress', action: 'project_backend_menu', attrs: {}, ico: 'server' },
    { name: 'Copy project', action: 'copy_project', attrs: {}, ico: 'copy' },
    { name: 'Push project to GITHUB', action: 'alert(`Not avilable on this version`)', attrs: {}, ico: 'github' },
    { name: `Delete project (${app_atrs.project})`, action: 'delete_project', attrs: {}, ico: 'trash-2' },
  ];
  data.push({ name: 'back', ico: 'chevron-left', action: 'list_projects' });
  document.getElementById('work-description').innerHTML = `Project:`;
  appendDot(data, work_menu_tpl, 'work-wrapper-body');
};
