
// Global Functions

function say(m) {
    console.log(m);
}

function boolRenderer(v) {
    if (v == true || v == 'true') return '<div style="width:16px;margin-left:auto;margin-right:auto"><img src="' + 'resources/icons/yes.gif"></div>';
    if (v == false || v == 'false') return '<div style="width:16px;margin-left:auto;margin-right:auto"><img src="' + 'resources/icons/no.gif"></div>';
    return v;
}

function i18n(key) {
    return window.locale[key] || '*' + key + '*';
}
