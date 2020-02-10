// <iframe id="preview" style="width:100% !important; height:100% !important; border:0" src="../../../templates/preview/prev1.html"></iframe>s
var work_prev_tpl = `
  <div class="work-body">
    <iframe onload="onMyFrameLoad(this)" id="preview" style="width:100% !important; height:100vh !important; border:0"   src="https://docker.local"></iframe>
  </div>
`;

var work_menu_tpl = `
  <div class="work-body">
    <table class="doc-table">
      {{~it:item:index}}
        <tr>
          <td onclick="{{=item.action}}(this)" data-name="{{=item.name}}">
            <a class="link" href="#">
              <img class="doc-ico" src="/sojuz-project/manager/assets/{{=item.ico}}.svg">
              <span>{{=item.name}}</span>
              {{? item.current}}
                <img class="doc-ico round" src="/sojuz-project/manager/assets/check.svg">
              {{?}}
            </a>
          </td>
        </tr>
      {{~}}
    </table>
  </div>
`;

var copy_project_tpl = `
  <div class="work-body">
    <p>Copy current project to:</p>
    <div class="option-item">
      <input onkeyup="copy_project_send(event,this)" type="text" placeholder="Name as new project to save"/>
      <button onclick="copy_project_send(event,this)">Save</button>
    </div>
    <p>or overwrite existed</p>
    <hr>
    <table class="doc-table">
      {{~it:item:index}}
        <tr>
          <td onclick="copy_project_send(event,this)" data-name="{{=item.name}}" >
            <a class="link" href="#">
              <img class="doc-ico" src="/sojuz-project/manager/assets/{{=item.ico}}.svg">
              <span>{{=item.name}}</span>
            </a>
          </td>
        </tr>
      {{~}}
    </table>
  </div>
`;

var list_all_tpl = `
<div class="work-body">
  <table class="doc-table">
    {{~it:item:index}}
      <tr>
        <td>{{=item.group}}</td>
        <td>{{=item.name}}</td>
        <td><input onchange="global_check(event)" name="{{=item.group}}-{{=item.name}}" value="{{=item.file}}" {{? item.selected}}checked{{?}} type="checkbox"></td>
      </tr>
    {{~}}
  </table>
</div">
`;

var css_menu_tpl = `
<nav>
  <ul>
    {{~it:item:index}}
      <li {{? item.active}}class="active"{{?}}>
        <a class="menu_item" data-group="{{=item.group}}" data-name="{{=item.name}}" href="#header" onclick="load_page('css-doc/globals/','{{=item.group}}','{{=item.name}}')">
          <img class="doc-ico" src="/sojuz-project/manager/assets/folder.svg">{{=item.group}}
        </a>
        {{? item.selected_in_group}}<span><img class="doc-ico" src="/sojuz-project/manager/assets/check.svg"></span>{{?}}
      </li>
    {{~}}
  </ul>
</nav>  
`;

var css_submenu_tpl = `
<nav id="css-submenu">
  <ul style="display:flex">
    {{~it:item:index}}
      <li {{? item.subactive}}class="active"{{?}}>
        <a  class="sub_menu_item" data-group="{{=item.group}}" data-name="{{=item.name}}" href="#" onclick="load_page('css-doc/globals/','{{=item.group}}','{{=item.name}}')">{{=item.name}}</a>
        <input onchange="global_check(event)" name="{{=item.group}}-{{=item.name}}" value="{{=item.file}}" {{? item.selected}}checked{{?}} type="checkbox">
      </li>
    {{~}}
    <li onclick="add_new_css('{{=item.group}}')"><a href="#">+</a> </li>
  </ul>
</nav>
`;

var popupbar_tpl = `
  <button class="close" onclick="close_popup()">Close</button>
`;

var popupbar_editcss_tpl = `
  <button class="close" onclick="close_popup()">Close</button>
  <button>Save</button>
`;

var message_tpl = `
<p class="{{=it.class}}">
	{{=it.text}}
</p>
`;
