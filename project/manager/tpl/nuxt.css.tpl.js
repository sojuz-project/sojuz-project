/** [project-name] DEFAULT CSS */
/** this file is generated automaticly from SOJUZ CLI */
/** mode info: https://github.com/sojuz-project */
const { SOJUZ_PROJECT } = require('/project/projects_archive/nuxt.project.js');
const { layout } = require(`/project/projects_archive/${SOJUZ_PROJECT}/nuxt.layout.js`);
let outCss;
if (layout == 'default') {
  outCss = [
    /** files list start tag */
    /** !files list stop tag */
  ];
} else {
  outCss = [];
}
export const css = outCss;
