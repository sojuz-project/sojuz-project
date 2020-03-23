/**
 *
 * @param get_project [this]
 *
 */
window.get_css_guideline = function() {
  console.log(app_atrs);
  // ----------------------------------
  if (!app_atrs.project) {
    msg(`get_css_collection error: project not exist`, 'success');
  }
  create_sidebar_menu();
  create_submenu(app_atrs.group);
  main_menu_active(document.getElementById('css_guideline'));

  const target = `${app_host}sojuz-project/doc/css-doc/globals/${app_atrs.group}/${app_atrs.name}.html`;
  if (!app_atrs.customize_css) {
    project_frontend_menu();
    close_work();
  } else {
    open_work();
    customize_css();
  }

  read_page(target, (data) => {
    document.getElementById('body').innerHTML = data;
  });

  const css_target = `/sojuz-project/css/global/${app_atrs.group}/${app_atrs.name}.css`;
  document.getElementById('doc_page_css').href = css_target;
  //  alert(css_target);
};
