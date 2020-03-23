/**
 *
 * @param get_project [this]
 *
 */
window.get_css_collection = function() {
  console.log('get css');
  if (!app_atrs.project) {
    msg(`get_css_collection error: project not exist`, 'success');
  }
  console.log('get_css_collection');
};
