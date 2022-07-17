
var preview_div = document.getElementById('preview_div');
var code_area = document.getElementById('html_code')
var action_url = `http://${domain}:8080/${user}/${form_id}/form_response`;

jQuery(function ($) {

    var formRenderOpts = {
        formData: form_data,
        dataType: 'json'
    };
    const $markup = $("<div/>");
    $markup.formRender(formRenderOpts);

    preview_div.innerHTML = $markup.formRender("html");


    var html = `<form id="rendered_form" action=\'${action_url}\' method="post">` + $markup.formRender("html") + '</form>' + '<div class="conatainer d-flex align-items-center text-center form_success" style="display: none !important"><div class="card"><h4>Thank you!</h4><p>You have successfully joined our subscriber list.</p></div></div >' + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' + `<script src="http://${domain}:8080/static/form_response_handler.js"></script><link rel="stylesheet" href="http://${domain}:8080/static/form_response.css"><script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>`;


    const addLineBreaks = html => html.replace(new RegExp("><", "g"), ">\n<");
    formated_html = addLineBreaks(html)
    // console.log(formated_html)
    code_area.innerText = formated_html;

}) 