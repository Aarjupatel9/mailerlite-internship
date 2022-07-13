var preview = document.getElementById('preview');
var clear = document.getElementById('clear');
var save = document.getElementById('save');

var action_url = `http://localhost:5000/${form_id}/form_response`;
// console.log(action_url)

jQuery(function ($) {
    const fbEditor = document.getElementById("fb-editor");
    const options = {
        formData: form_data,
        dataType: 'json',
        disabledFieldButtons: {
            header: ['remove'], // disables the remove butotn for text fields
            button: ['remove']
        },
        disabledSubtypes: {
            text: ['password', 'color']
        },
        defaultFields: [{
            type: "header",
            subtype: "h1",
            label: "Subscribe form",
            className: "text-center"
        },
        {
            type: "paragraph",
            subtype: "p",
            label: "subscribe for more",
        },
        {
            className: "form-control",
            label: "Email",
            placeholder: "Enter your email",
            name: "email",
            required: true,
            type: "text",
            subtype: 'email'
        },
        {
            type: "button",
            subtype: "submit",
            label: "Subscribe",
            className: "btn-success btn form-control",
            name: "button",
        }
        ],
        disabledActionButtons: ['save', 'data', 'clear'],
        disabledAttrs: [
            'access',
            'maxlength',
            'description',
            'value',
            'step',
            'min',
            'max',
        ],
        disableFields: ['autocomplete', 'file', 'hidden', 'date', 'button', 'checkbox-group', 'radio-group', 'paragraph', 'textarea', 'select', 'number'],
        controlOrder: [
            'header',
            'email',
            'text',
            'textarea',
            // 'first name',
            // 'last name'
        ],
        // fieldRemoveWarn: true,
        fields: [
            {
                label: 'Email',
                placeholder: 'Enter your email',
                name: 'email',
                subtype: 'email',
                attrs: {
                    type: 'text'
                },
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"/></svg>'
            },
            {
                label: 'first name',
                placeholder: 'Enter your first name',
                name: 'fname',
                subtype: 'text',
                attrs: {
                    type: 'text'
                }
            },
            {
                label: 'Last name',
                placeholder: 'Enter your last name',
                name: 'lname',
                subtype: 'text',
                attrs: {
                    type: 'text'
                }
            },
            {
                label: 'Company',
                placeholder: 'Enter your Company name',
                name: 'company_name',
                subtype: 'text',
                attrs: {
                    type: 'text'
                },
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M336 0C362.5 0 384 21.49 384 48V464C384 490.5 362.5 512 336 512H240V432C240 405.5 218.5 384 192 384C165.5 384 144 405.5 144 432V512H48C21.49 512 0 490.5 0 464V48C0 21.49 21.49 0 48 0H336zM64 272C64 280.8 71.16 288 80 288H112C120.8 288 128 280.8 128 272V240C128 231.2 120.8 224 112 224H80C71.16 224 64 231.2 64 240V272zM176 224C167.2 224 160 231.2 160 240V272C160 280.8 167.2 288 176 288H208C216.8 288 224 280.8 224 272V240C224 231.2 216.8 224 208 224H176zM256 272C256 280.8 263.2 288 272 288H304C312.8 288 320 280.8 320 272V240C320 231.2 312.8 224 304 224H272C263.2 224 256 231.2 256 240V272zM80 96C71.16 96 64 103.2 64 112V144C64 152.8 71.16 160 80 160H112C120.8 160 128 152.8 128 144V112C128 103.2 120.8 96 112 96H80zM160 144C160 152.8 167.2 160 176 160H208C216.8 160 224 152.8 224 144V112C224 103.2 216.8 96 208 96H176C167.2 96 160 103.2 160 112V144zM272 96C263.2 96 256 103.2 256 112V144C256 152.8 263.2 160 272 160H304C312.8 160 320 152.8 320 144V112C320 103.2 312.8 96 304 96H272z"/></svg>'
            },
            {
                label: 'Country',
                placeholder: 'Enter your country name',
                name: 'country',
                // subtype: 'text',
                attrs: {
                    type: 'select'
                },
                values: [{
                    label: 'India',
                    value: 'IN'
                }, {
                    label: 'Other Country',
                    value: 'other'
                }],
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 496C64 504.8 56.75 512 48 512h-32C7.25 512 0 504.8 0 496V32c0-17.75 14.25-32 32-32s32 14.25 32 32V496zM476.3 0c-6.365 0-13.01 1.35-19.34 4.233c-45.69 20.86-79.56 27.94-107.8 27.94c-59.96 0-94.81-31.86-163.9-31.87C160.9 .3055 131.6 4.867 96 15.75v350.5c32-9.984 59.87-14.1 84.85-14.1c73.63 0 124.9 31.78 198.6 31.78c31.91 0 68.02-5.971 111.1-23.09C504.1 355.9 512 344.4 512 332.1V30.73C512 11.1 495.3 0 476.3 0z"/></svg>'
            },
            {
                label: 'City',
                placeholder: 'Enter your city name',
                name: 'city',
                subtype: 'text',
                attrs: {
                    type: 'text'
                },
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"/></svg>'
            },
            {
                label: 'State',
                // placeholder: 'Enter state',
                name: 'state',
                subtype: 'text',
                attrs: {
                    type: 'text'
                },
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M273.2 311.1C241.1 271.9 167.1 174.6 167.1 120C167.1 53.73 221.7 0 287.1 0C354.3 0 408 53.73 408 120C408 174.6 334.9 271.9 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1V311.1zM416 503V200.4C419.5 193.5 422.7 186.7 425.6 179.8C426.1 178.6 426.6 177.4 427.1 176.1L543.1 129.7C558.9 123.4 576 135 576 152V422.8C576 432.6 570 441.4 560.9 445.1L416 503zM15.09 187.3L137.6 138.3C140 152.5 144.9 166.6 150.4 179.8C153.3 186.7 156.5 193.5 160 200.4V451.8L32.91 502.7C17.15 508.1 0 497.4 0 480.4V209.6C0 199.8 5.975 190.1 15.09 187.3H15.09zM384 504.3L191.1 449.4V255C212.5 286.3 234.3 314.6 248.2 331.1C268.7 357.6 307.3 357.6 327.8 331.1C341.7 314.6 363.5 286.3 384 255L384 504.3z"/></svg>'
            },
            {
                label: 'Mobile no.',
                placeholder: 'Enter your mobile number',
                name: 'mob_no',
                // subtype: 'text',
                attrs: {
                    type: 'number'
                },
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"/></svg>'
            },
            {
                label: 'Zip code',
                placeholder: 'Enter your zip code',
                name: 'zip',
                // subtype: 'text',
                attrs: {
                    type: 'number'
                },
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>'
            }
        ]
    };
    const formBuilder = $(fbEditor).formBuilder(options);





    document.getElementById("getData").addEventListener("click", function () {
        console.log(formBuilder.formData);
        var formRenderOpts = {
            formData: formBuilder.formData,
            dataType: 'json'
        };
        // console.log(formData);
        const $markup = $("<div/>");
        $markup.formRender(formRenderOpts);

        var html = `<form id="rendered_form" action=\'${action_url}\' method="post">` + $markup.formRender("html") + '</form>' + '<div class="conatainer d-flex align-items-center text-center form_success" style="display: none !important"><div class="card"><h4>Thank you!</h4><p>You have successfully joined our subscriber list.</p></div></div >' + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' + '<script src="http://localhost:5000/static/form_response_handler.js"></script>' + '<link rel="stylesheet" href="http://localhost:5000/static/form_response.css">' + '<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>';

        navigator.clipboard.writeText(html);

        alert("Form's HTML code successfully copied to clipboard.");

    });



    preview.addEventListener("click", () => {

        var formRenderOpts = {
            formData: formBuilder.formData,
            dataType: 'json'
        };
        const $markup = $("<div/>");
        $markup.formRender(formRenderOpts);
        var preview_html = '<!doctype html><title>Form Preview</title><body class="container">' + '<form id="rendered_form" action="http://localhost:5000/form_response" method="post">' + $markup.formRender("html") + '</form>' + '<div class="conatainer d-flex align-items-center text-center form_success" style="display: none !important"><div class="card"><h4>Thank you!</h4><p>You have successfully joined our subscriber list.</p></div></div >' + '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">' + '<script src="http://localhost:5000/static/form_response_handler.js"></script>' + '<link rel="stylesheet" href="http://localhost:5000/static/form_response.css">' + '<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>' + '</body></html>';


        var formPreviewWindow = window.open('', 'formPreview', 'height=480,width=640,toolbar=no,scrollbars=yes');

        formPreviewWindow.document.write(preview_html);
    });
    clear.addEventListener("click", () => {
        formBuilder.actions.clearFields();
    });
    save.addEventListener("click", () => {
        console.log(formBuilder.formData);

        $.post('http://localhost:5000/form/' + form_id + '/save_form', {
            formSchema: formBuilder.formData
        }, (res) => {
            if (res === 'success') location.replace(`http://localhost:5000/form/${form_id}/form_overview`)
            console.log('failed to save the form data')
        });
    });
})

