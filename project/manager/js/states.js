// delete localstorage collection if storagetoken change
// active if doc is regenerated

// try {
//   if (localStorage.getItem('localStorageToken') != localStorageToken) {
//     localStorage.removeItem('css_collection');
//     localStorage.setItem('localStorageToken', localStorageToken);
//   }
// } catch (error) {}

// update collection from local data
// if (localStorage.css_collection) {
//   css_collection = JSON.parse(localStorage.getItem('css_collection'));
// }

window.setAppState = function(state) {
  localStorage.setItem('work-area-state', state);
  document.getElementById('main-wrapper').dataset.state = state;

  if (state == 'home_page' || state == 'css_guideline' || state == 'frontend_modules' || state == 'gutenberg_blocks') {
    close_work();
  } else {
    open_work();
  }
};

// run last GUI method
var save_action = localStorage.getItem('work-area-state');
var run_stated_action = function() {
  if (save_action && save_action != 'null') {
    window[save_action]();
  }
};

// if (localStorage.getItem('work-area-state') && localStorage.getItem('work-area-state') != 'null') {
//   document.getElementById('menu-ico').classList.add('active');
// }

//

function open_work() {
  main_menu_active('');
  document.getElementById('menu-ico').classList.add('active');
  document.getElementById('page-wrapper').classList.add('open');
  document.getElementById('work-wrapper').classList.add('open');
}
function close_work() {
  main_menu_active('');
  document.getElementById('menu-ico').classList.remove('active');
  document.getElementById('page-wrapper').classList.remove('open');
  document.getElementById('work-wrapper').classList.remove('open');
}
