async function Delete_form(form_id, form_title) {
    console.log("delete", form_title);
    if (!window.confirm("Are you sure you want to delete the form: " + form_title + " ?")) {

    } else {

        var form_details = {
            form_id: `${form_id}`,
        };
        console.log(form_details);
        let fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(form_details),
        };
        // api for making post requests
        // let fetchRes = fetch("/form/delete", options);
        let res = await fetch('/form/delete', fetchOptions);

        // console.log(res);

        //If the response is not ok throw an error (for debugging)
        if (res.ok) {
            document.location.reload(true);
        } else {
            window.alert("Server side error accure............");
        }
        //If the response was OK, return the response body.
    }
}


async function Preview_form(form_id) {
    console.log("preview", form_id);

    var form_details = {
        form_id: `${form_id}`,
    };
    console.log(form_details);
    let fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(form_details),
    };
    // api for making post requests
    // let fetchRes = fetch("/form/delete", options);
    let res = await fetch('/form/preview', fetchOptions);

    // console.log(res);

    //If the response is not ok throw an error (for debugging)
    if (res.ok) {
        let response_data = await res.json();
        var formData = response_data[0].formSchema
        console.log(formData)


        var formRenderOpts = {
            formData: formData,
            dataType: 'json'
        };
        const $markup = $("<div/>");
        $markup.formRender(formRenderOpts);
        var preview_html = '<!doctype html><title>Form Preview</title><body class="container">' + `<form id="rendered_form" action="http://localhost:5000/${form_id}/form_response" method="post">` + $markup.formRender("html") + '</form>' + '<div class="conatainer d-flex align-items-center text-center form_success" style="display: none !important"><div class="card" style="padding:20px;    border-radius: 20px;"><h4>Thank you!</h4><p>You have successfully joined our subscriber list.</p></div></div >' + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' + '<script src="http://localhost:5000/static/preview.js"></script>' + '<link rel="stylesheet" href="http://localhost:5000/static/form_response.css">' + '<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>' + '<script>$(document).ready(function () {     console.log("ready!");}); </script>' + '</body></html>';


        // console.log(preview_html);
        var formPreviewWindow = window.open('', 'formPreview', 'height=480,width=640,toolbar=no,scrollbars=yes');

        formPreviewWindow.document.write(preview_html);
    } else {
        window.alert("Server side error accure............");
    }
    //If the response was OK, return the response body.
}

async function create_group(user_key) {
    var group_name = document.getElementById('group_name').value;
    console.log("create group for user", user_key, group_name);


    var details = {
        user_key: `${user_key}`,
        group_name: `${group_name}`
    };
    console.log(details);
    let fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(details),
    };
    // api for making post requests
    // let fetchRes = fetch("/form/delete", options);
    let res = await fetch('/form/create_group', fetchOptions);

    // console.log(res);

    //If the response is not ok throw an error (for debugging)
    if (res.ok) {
        document.location.reload(true);
    } else {
        window.alert("Server side error accure............");
    }
    //If the response was OK, return the response body.

}