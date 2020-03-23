window.project_frontend_menu = function(project) {
  var data = [
    { name: 'Customize CSS', action: 'customize_css', attrs: {}, ico: 'layers' },
    { name: 'Customize Vue Modules', action: 'alert(`Not avilable on this version`)', attrs: {}, ico: 'tool' },
    { name: 'Build APP and preview', action: 'build_preview', attrs: {}, ico: 'eye' },
  ];
  data.push({ name: 'back', ico: 'chevron-left', action: 'project_menu' });
  appendDot(data, work_menu_tpl, 'work-wrapper-body');
  document.getElementById('work-wrapper-msg').innerHTML = '';
};
