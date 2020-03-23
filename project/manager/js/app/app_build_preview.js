/**
 *
 * @param global_function
 * customize_project( this )
 */
window.build_preview = function() {
  css = app_atrs.css_collection.filter((el) => {
    return el.selected;
  });
  css = lzw_encode(JSON.stringify(css));

  // ----------------------------------------------------------------
  fetch(`/sojuz-project/${'copy_project_uploads_to_wordpress'}?project=${app_atrs.project}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(
    onStreamRes(
      (data) => {
        // terminial_msg('<p>done: ' + data + '</p>');
        // -----
        fetch(`/sojuz-project/${'build_preview'}?project=${app_atrs.project}&collection=${css}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then(
          onStreamRes(
            (data) => {},
            (el) => {
              document.getElementById('work-progress').classList.add('active');
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
        // -----
      },
      (el) => {
        // console.log('OK', el);
        terminial_msg('<p> ' + el + '</p>');
      },
      (err) => {
        console.log('Error', err);
      }
    )
  );
  // ----------------------------------------------------------------
};
