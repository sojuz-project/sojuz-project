/**
 *
 * @param global_function
 * customize_project( this )
 */
window.customize_css = function(t) {
  setAppState('customize_css');
  const project = localStorage.getItem('project');
  console.log(`/sojuz-project/${'get_layout'}?project=${project}`);
  fetch(`/sojuz-project/${'get_layout'}?project=${project}`, {
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
          fetch(`/sojuz-project/${'set_layout'}?project=${project}&layout=customize`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(
            onStreamRes(
              (data) => {},
              (el) => {
                console.log('set l', el);
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

  function change_display_to_customize() {
    document.getElementById('work-description').innerHTML = 'Customize project';
    document.getElementById('body-wrapper').classList.remove('shade');
    document.getElementById('toggle-columns').classList.add('active');
    document.getElementById('main-wrapper').classList.add('resize');
    document.getElementById('page-wrapper').classList.add('open');
    document.getElementById('work-wrapper').classList.add('open');
    localStorage.setItem('work-area-state', 'customize_css');

    var data = [];
    appendDot(data, work_prev_tpl, 'work-wrapper-body');
  }

  // setTimeout(function () {
  //   var iframe = document.getElementById('preview');
  //   iframe.src = iframe.src;
  // }, 3000);
  //

  function run_customizer() {
    load_page('css-doc/globals/', 'index', 'index');
    document.getElementById('work-progress').classList.add('active');
    window.document.addEventListener('myCustomEvent', (e) => {
      document.getElementById('work-wrapper-msg').innerHTML = '';
      document.getElementById('work-progress').classList.remove('active');
    });
  }
};
