/**
 * HÀM BẮT LỖI TRONG FORM
 * Gia tri truyen vao la class [ws-required]
 * Author: Webso Company
 */
(function($) {
    $.fn.wsFormError = function(options) {

        // Khai Bao
        var selector = this.selector,
            error    = 0,
            message  = '',
        opts = $.extend({
            enable: true,
            notification: false
        }, options);

        if ($('body').find(this).length) {
            if (typeof(opts.enable) !== "boolean") {
                console.warn('option (enable) is not type boolean !');
                return;
            }
            if (typeof(opts.notification) !== "boolean") {
                console.warn('option (message) is not type boolean !');
                return;
            }
            var viewMessage = function(message) {
                if (message != "") {
                    return '<span class="wserror-message"'
                            +'style="'
                            +'display:block;'
                            +'color:white;'
                            +'text-align:left;'
                            +'position: fixed;'
                            +'bottom: 0;'
                            +'right: 0;'
                            +'background-color:#000;'
                            +'z-index: 99999;'
                            +'padding: 10px 20px;'
                            +'border-radius: 3px;'
                            +'box-shadow: 0px 3px 10px 0px white;'
                            +'">'+message+'</span>';
                }
            }
            var isEmail = function(emailAddress) {
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                return pattern.test(emailAddress);
            }
            var isNumber = function(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            if (opts.enable) {
                // Enable Plugin
                $(selector).find('input,textarea,select').each(function() {
                    var item     = $(this);
                    var itemval  = item.val();
                    var itemtype = item.prop('nodeName');
                    // CHECK EMPTY
                    if (item.hasClass('ws-required')) {
                        if (!itemval.length) {
                            // Require is not null (default check)
                            error = 1;
                            item.addClass('isError');
                            if (typeof(item.data('wserror-null')) !== "undefined") {
                                message = item.data('wserror-null');
                            } else {
                                message = "Please enter in fields required.";
                            }
                        } else {
                            item.removeClass('isError');
                        }
                    }
                    // CHECK NUMBER
                    if (item.hasClass('ws-required-number')) {
                        if (!parseFloat(itemval) || !isFinite(itemval)) {
                            // require is number (option check)
                            error = 1;
                            item.addClass('isError');
                            if (typeof(item.data('wserror-number')) !== "undefined") {
                                message = item.data('wserror-number');
                            }
                        } else {
                            item.removeClass('isError');
                        }
                    }
                    // CHECK EMAIL
                    if (item.hasClass('ws-required-email')) {
                        if (!isEmail(itemval)) {
                            // require is email (option check)
                            error = 1;
                            item.addClass('isError');
                            if (typeof(item.data('wserror-email')) !== "undefined") {
                                message = item.data('wserror-email');
                            }
                        } else {
                            item.removeClass('isError');
                        }
                    }
                    // CHECK PHONE
                    if (item.hasClass('ws-required-phone')) {
                        if ((itemval.length < 10 || itemval.length > 11) || (!isNumber(itemval))) {
                            // require is phone (option check)
                            error = 1;
                            item.addClass('isError');
                            if (typeof(item.data('wserror-phone')) !== "undefined") {
                                message = item.data('wserror-phone');
                            }
                        } else {
                            item.removeClass('isError');
                        }
                    }
                    // VIEW ERROR
                    if (item.hasClass('isError')) {
                        // Add class has-error when error is 1
                            item.parent('.form-group').addClass('has-error');
                    } else {
                        // remove Class has-error
                        item.parent('.form-group').removeClass('has-error');
                    }
                    if (opts.notification) {
                        if (!$('body').find('.wserror-message').length) {
                            $('body').append(viewMessage(message));
                            setTimeout(function() {
                                $('body').find('.wserror-message').remove();
                            }, 2000);
                        }
                    }
                });
                var callback = opts.callback;
                if ($.isFunction(callback)) {
                    callback.call(this, error);
                }
            }
        } else {
            console.error("element [ "+selector+" ] is not exists !");
        }
    }
})(jQuery);