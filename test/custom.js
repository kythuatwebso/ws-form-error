$(document).ready(function() {
    $("#click_send").on("click", function() {
        $('#frm_test').wsFormError({
            enable: true,
            debug: true,
            notification: true,
            callback: function(data) {
                if (data == 0) {
                    $('#error').html('<div class="alert alert-success">'
                        +'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                        +'<strong>SUCCESS</strong>'
                    +'</div>');
                } else {
                     $('#error').html('<div class="alert alert-danger">'
                        +'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                        +'<strong>ERROR</strong>'
                    +'</div>');
                }
            }
        });
    });
});