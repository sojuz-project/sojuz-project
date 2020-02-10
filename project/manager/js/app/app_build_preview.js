/**
 *
 * @param global_function
 * customize_project( this )
 */
window.build_preview = function(t) {
  const project = localStorage.getItem('project');
  css = JSON.stringify(css_collection);
  fetch(`/sojuz-project/${'build_preview'}?project=${project}&collection=${css}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {},
      (el) => {
        console.log(el);
        msg(`Start rebuilding project to default dev`, 'success');
        terminial_msg('<p> Write: /app/projects_archive/' + el + '/nuxt.css.js</p>');
        terminial_msg('<p> Write: /app/projects_archive/' + el + '/nuxt.layout.js</p>');
        setTimeout(function() {
          window.location.href = 'https://docker.local/';
        }, 2000);
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
};
