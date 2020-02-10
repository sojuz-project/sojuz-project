// Save project View
window.save_project = function(t) {
  document.getElementById('work-description').innerHTML = 'Save project';

  // document.getElementById('popup').classList.add('open');
  // appendDot({}, popupbar_tpl, 'popup_bar');
  fetch('/sojuz-project/list', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(function(res) {
      res.json().then((data) => {
        data.list = data.list.map((el) => {
          return { name: el, ico: 'archive' };
        });
        data.list.push({ name: 'back', ico: 'chevron-left', action: 'work_menu' });
        appendDot(data.list, save_project_tpl, 'work-wrapper-body');
      });
    })
    .catch(function(res) {
      console.log(res);
    });
  localStorage.setItem('work-area-state', 'save_project');
};

// Save project action

/**
 *
 * @param global_function
 * export_settings( this )
 */
window.save_project_as = function(event, t) {
  let new_project = false;
  if (t.nodeName == 'BUTTON') {
    new_project = t.previousElementSibling.value;
  }
  if (event.keyCode === 13) {
    new_project = t.value;
  }
  if (new_project) {
    fetch(`/sojuz-project/${'copy_project'}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        project: app.project,
        new_project: new_project,
      },
    }).then(
      onStreamRes(
        () => {
          // const e1 = new CustomEvent('event1');
          // const e1 = createEvent('event1');
          // document.dispatchEvent(e1);
          try {
            fetch(`/sojuz-project/${'export_db'}?project=${new_project}`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(console.log);

            // .then(
            //   onStreamRes(
            //     () => {
            //       console.log('DONE!!!!');
            //     },
            //     (el) => {
            //       document.getElementById('work-terminal').innerHTML += '<p>' + el + '</p>';
            //       console.log('chunk', el);
            //     },
            //     (err) => {
            //       console.log('Error', err);
            //     }
            //   )
            // );
          } catch (error) {
            console.log('');
          }
          //  ! export DB
        },
        (el) => {
          terminial_msg('<p>' + el + '</p>');
          console.log('chunk', el);
        },
        (err) => {
          console.log('Error', err);
        }
      )
    );

    document.addEventListener('event1', function() {
      // ! export DB
      console.log('DONE');
      fetch(`/sojuz-project/${'export_db'}?project=${new_project}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(
        onStreamRes(
          () => {
            console.log('DONE!!!!');
          },
          (el) => {
            document.getElementById('work-terminal').innerHTML += '<p>' + el + '</p>';
            console.log('chunk', el);
          },
          (err) => {
            console.log('Error', err);
          }
        )
      );
      //  ! export DB
    });
  }
};
