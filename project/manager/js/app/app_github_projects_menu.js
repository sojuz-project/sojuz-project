window.github_projects_menu = function(project) {
  var data = [
    { name: 'Work-spaces', repo: 'sojuz-project', action: 'clone_project', attrs: {}, ico: 'github' },
    { name: 'Theme-zero-boilerplate', repo: 'sojuz-project', action: 'clone_project', attrs: {}, ico: 'github' },
  ];
  data.push({ name: 'back', ico: 'chevron-left', action: 'list_projects' });
  document.getElementById('work-description').innerHTML = 'Clone project from github';
  appendDot(data, work_menu_tpl, 'work-wrapper-body');
};
