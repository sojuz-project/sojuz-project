window.github_projects_menu = function(t) {
  setAppState('github_projects_menu');
  localStorage.setItem('project', t.dataset.name);
  var data = [
    { name: 'Theme-zero-biolerplate', repo: 'sojuz-project', action: 'clone_project', attrs: {}, ico: 'github' },
    { name: 'Theme-zero-landing', repo: 'sojuz-project', action: 'clone_project', attrs: {}, ico: 'github' },
  ];
  document.getElementById('work-description').innerHTML = 'Clone project from github';
  appendDot(data, work_menu_tpl, 'work-wrapper-body');
};
