window.rebuild_css_collection = function(project) {
  fetch(`/sojuz-project/${'rebuild_css_collection'}?project=${project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {},
      (el) => {
        app_atrs.css_collection = JSON.parse(el);
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
