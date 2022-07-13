// jQuery(function ($) {
//     const fbEditor = document.getElementById("build-wrap");
//     const options = {
//         defaultFields: [
//             { type: "text" },
//             { type: "checkbox-group" },
//             { type: "text" },
//             { type: "radio-group" }
//         ]
//     };
//     const formBuilder = $(fbEditor).formBuilder(options);

//     const clearFieldsButton = document.getElementById("clear-all-fields")
//     clearFieldsButton.addEventListener('click', () => formBuilder.actions.clearFields(), false)
// });


jQuery(function ($) {
    var container = document.getElementById('build-wrap');
    var fields = [{
        label: 'first name',
        placeholder: 'Enter your first name',
        name: 'f_name',
        subtype: 'email',
        attrs: {
            type: 'text'
        },
        icon: ''
    }];
    $(container).formBuilder({
        fields
    });
});