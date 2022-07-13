// import '../node_modules/formBuilder/src/js/form-builder'

var preview = document.getElementById('preview');
var clear = document.getElementById('clear');
var save = document.getElementById('save');

jQuery(function ($) {
    const fbEditor = document.getElementById("fb-editor");
    const options = {
        disabledActionButtons: ['save', 'data', 'clear'],
        disabledAttrs: [
            'access'
        ],
        // fieldRemoveWarn: true,
        fields: [{
            label: 'first name',
            placeholder: 'Enter your first name',
            name: 'f_name',
            subtype: 'text',
            attrs: {
                type: 'text'
            },
            icon: 'FN'
        }]
    };
    const formBuilder = $(fbEditor).formBuilder(options);

    const formData = formBuilder.formData;

    // setTimeout(() => {
    //     alert(formData);
    // }, 5000);


    preview.addEventListener("click", (evt, formData) => {
        console.log({ formData });
        console.log("formbuilder saved");
        // toggleEdit(false);
        $(".render-wrap").formRender({ formData });
    });
    clear.addEventListener("click", () => {
        formBuilder.actions.clearFields();
    });
    save.addEventListener("click", () => {
        console.log('save');
        // formBuilder.actions.showData();
        const result = formBuilder.actions.save();
        console.log("result:", result);
    });
})
