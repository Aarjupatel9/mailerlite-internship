
var form_body = document.getElementById('form_body')
var action_url = `http://localhost:5000/${form_id}/form_response`;

jQuery(function ($) {

    var formRenderOpts = {
        formData: form_data,
        dataType: 'json'
    };
    const $markup = $("<div/>");
    $markup.formRender(formRenderOpts);




    var html = `<form id="rendered_form" action=\'${action_url}\' method="post">` + $markup.formRender("html") + '</form>' + '<div class="conatainer d-flex align-items-center text-center form_success" style="display: none !important"><div class="card"><h4>Thank you!</h4><p>You have successfully joined our subscriber list.</p></div></div >' + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' + '<script src="http://localhost:5000/static/form_response_handler.js"></script>' + '<link rel="stylesheet" href="http://localhost:5000/static/form_response.css">' + '<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>';


    form_body.innerHTML = html;

}) 