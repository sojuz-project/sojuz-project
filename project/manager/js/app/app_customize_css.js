/**
 *
 * @param global_function
 * customize_project( this )
 */

window.customize_css = function() {
  document.getElementById('toggle-columns').classList.add('active');
  const guard = document.getElementById('preview');
  if (!guard) {
    fetch(`/sojuz-project/${'get_layout'}?project=${app_atrs.project}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(
      onStreamRes(
        (data) => {},
        (el) => {
          if (el == 'customize') {
            change_display_to_customize();
            run_customizer();
          }
          if (el == 'default') {
            fetch(`/sojuz-project/${'set_layout'}?project=${app_atrs.project}&layout=customize`, {
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
                  msg(`Start rebuilding project to customize dev`, 'success');
                  terminial_msg('<p> Write: /app/projects_archive/' + el + '/nuxt.css.js</p>');
                  setTimeout(function() {
                    change_display_to_customize();
                    run_customizer();
                    // window.location.href = 'https://docker.local/sojuz-project';
                  }, 2000);
                },
                (err) => {
                  console.log('Error', err);
                }
              )
            );
          }
        },
        (err) => {
          console.log('Error', err);
        }
      )
    );
  }

  function change_display_to_customize() {
    document.getElementById('work-description').innerHTML = 'Customize project';
    var data = [];
    app_routing.css_guideline.worker = 'open';
    update_app_attrs();
    appendDot(data, work_prev_tpl, 'work-wrapper-body');
  }

  // setTimeout(function () {
  //   var iframe = document.getElementById('preview');
  //   iframe.src = iframe.src;
  // }, 3000);
  //

  function run_customizer() {
    document.getElementById('main-menu').style = 'display:none';
    document.getElementById('work-progress').classList.add('active');
    window.document.addEventListener('myCustomEvent', (e) => {
      document.getElementById('work-wrapper-msg').innerHTML = '';
      document.getElementById('work-progress').classList.remove('active');
    });

    create_sidebar_menu();
    create_submenu(app_atrs.group);
  }
};
