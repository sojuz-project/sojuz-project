/* eslint-disable max-nested-callbacks */
/**
 *
 * @param get_project [this]
 *
 */
window.set_project = function() {
  // console.log('set project', app_atrs);
  const new_project = app_atrs.name;
  const old_project = app_atrs.project;
  // return false;
  if (app_atrs.project != new_project) {
    msg(`open project:${new_project}`, 'success');
    app_atrs.project = new_project;
    document.getElementById('work-progress').classList.add('active');
    document.getElementById('page-wrapper').classList.add('disable');
    /* 
      set_project: 
      update /app/projects_archive/nuxt.project.js
      read /app/projects_archive/[new_project]/nuxt.layout.js
      read /app/projects_archive/[new_project]/nuxt.css.collection.json
    */
    fetch(`/sojuz-project/${'set_project'}?project=${new_project}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(function(res) {
        if (!res.ok) {
          msg(`Load project error`, 'success');
          // app_action('home-page', this);
          // document.getElementById('work-progress').classList.remove('active');
        } else {
          res.json().then((data) => {
            terminial_msg('<p>Write: app/projects_archive/nuxt.project.js</p>');
            terminial_msg(`<p>Read: app/projects_archive/${new_project}/nuxt.layout.js</p>`);
            terminial_msg(`<p>Read: app/projects_archive/${new_project}/nuxt.css.collection.json</p>`);

            /*
              db_local_to_project:
              archive old database
            */
            console.log('db_local_to_project', old_project);
            msg(`Archive existing DB`, 'success');
            fetch(`/sojuz-project/${'db_local_to_project'}?project=${old_project}`, {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(
              onStreamRes(
                (data) => {
                  /*
                    db_project_to_localt:
                    update WP database from archived copy
                  */
                  console.log('db_project_to_local', new_project);
                  terminial_msg(
                    '<p>SQL: import projects_archive/${new_project}/wordpress/backup_${new_project}.sql</p>'
                  );
                  msg(`Import DB from selected project`, 'success');
                  fetch(`/sojuz-project/${'db_project_to_local'}?project=${new_project}`, {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  }).then(
                    onStreamRes(
                      (data) => {
                        // document.getElementById('work-progress').classList.remove('active');
                        // msg(`Project change to: ${new_project}`, 'success');
                        // console.log('OK', data);

                        /*
                          copy_wordpress_to_project_uploads:
                          update WP database from archived copy
                        */
                        console.log('copy_wordpress_to_project_uploads', old_project);
                        console.log(
                          `rm -Rv /app/projects_archive/${old_project}/wordpress/uploads && cp -Rv /wordpress/wp-content/uploads /app/projects_archive/${old_project}/wordpress/uploads`
                        );
                        msg(`Arch WordPress uploads`, 'success');
                        fetch(`/sojuz-project/${'copy_wordpress_to_project_uploads'}?project=${old_project}`, {
                          method: 'GET',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        }).then(
                          onStreamRes(
                            (data) => {
                              /*
                                copy_project_uploads_to_wordpress:
                                get uploads from new project
                              */
                              console.log('copy_project_uploads_to_wordpress', new_project);
                              console.log(
                                `rm -Rv /wordpress/wp-content/uploads && cp -Rv /app/projects_archive/${new_project}/wordpress/uploads /wordpress/wp-content/uploads && chown -Rv 33:33 /wordpress/wp-content/uploads`,
                                new_project
                              );

                              msg(`Arch WordPress uploads`, 'success');
                              fetch(`/sojuz-project/${'copy_project_uploads_to_wordpress'}?project=${new_project}`, {
                                method: 'GET',
                                headers: {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                },
                              }).then(
                                onStreamRes(
                                  (data) => {
                                    document.getElementById('page-wrapper').classList.remove('disable');
                                    document.getElementById('work-progress').classList.remove('active');
                                    msg(`Project change to: ${new_project}`, 'success');
                                    // console.log('OK', data);
                                  },
                                  (el) => {},
                                  (err) => {
                                    console.log('Error', err);
                                  }
                                )
                              );
                              // !--- copy_project_uploads_to_wordpress
                            },
                            (el) => {},
                            (err) => {
                              console.log('Error', err);
                            }
                          )
                        );

                        // !--- copy_wordpress_to_project_uploads
                      },
                      (el) => {},
                      (err) => {
                        console.log('Error', err);
                      }
                    )
                  );

                  // !--- db_project_to_local
                },
                (el) => {},
                (err) => {
                  console.log('Error', err);
                }
              )
            );
            // !--- Save pld project database

            app_action('project_menu', this);
            Object.assign(app_atrs, data);
            update_app_attrs();
          });
        }
      })
      .catch(function(res) {
        console.log({ res });
      });
  } else {
    app_action('project_menu', this);
  }
  // console.log('SET PROJECT TO:', app_atrs);

  // if (project != app_atrs.project) {

  // } else {
  //   project_menu(t);
  // }
};
