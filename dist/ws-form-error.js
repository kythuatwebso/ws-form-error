/**
 * HÀM BẮT LỖI TRONG FORM
 * Gia tri truyen vao la class [ws-required]
 * Author: Webso Company
 */
(function($) {
    $.fn.wsFormError = function(options) {
        // KHAI BAO CAC THONG SO BAN DAU
        var selector = this.selector, error = 0, message = "", opts = $.extend({
            enable: true,
            debug: false,
            notification: false
        }, options);
        // TIM TRONG BODY XEM CO CLASS KHOI TAO KHONG?
        if ($("body").find(this).length) {
            // KIEM TRA XEM TUY CHON "ENABLE" CO PHAI LA KIEU BOOL KHONG
            if (typeof opts.enable !== "boolean") {
                console.warn("option (enable) is not type boolean !");
                return;
            }
            // KIEM TRA XEM TUY CHON "NOTIFICATION" CO PHAI LA KIEU BOOL KHONG
            if (typeof opts.notification !== "boolean") {
                console.warn("option (message) is not type boolean !");
                return;
            }
            // FUNCTION HIEN THI THONG BAO
            _mess = function(message) {
                if (message != "") {
                    return '<span class="ws-error-mess"' + 'style="' + "display:block;" + "color:white;" + "text-align:left;" + "position: fixed;" + "bottom: 0;" + "right: 0;" + "background-color:#000;" + "z-index: 99999;" + "padding: 10px 20px;" + "border-radius: 3px;" + "box-shadow: 0px 3px 10px 0px white;" + '">' + message + "</span>";
                }
            };
            // HAM CHECK EMAIL
            _isEmail = function(emailAddress) {
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                return pattern.test(emailAddress);
            };
            // HAM CHECK KIEU SO
            _isNumber = function(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };
            var sTop = function(item) {
                $("html, body").animate({
                    scrollTop: $(item).offset().top - 10
                }, 1e3);
            };
            // TRUONG HOP ENABLE PLUGIN
            if (opts.enable) {
                // QUET QUA CAC TAGS HTML TU VUNG CHON XUONG
                $(selector).find("input,textarea,select").each(function(index, item) {
                    var item = $(this);
                    var itemval = item.val();
                    var itemtype = item.prop("nodeName");
                    // CHECK EMPTY
                    if (item.hasClass("ws-required")) {
                        // KIEM TRA XEM VALUE CO KHAC RONG KO? [INPUT,TEXTARE]
                        if (!itemval.length) {
                            error = 1;
                            item.addClass("ws-input-error");
                            if (typeof item.data("wserror-null") !== "undefined") {
                                message = item.data("wserror-null");
                            } else {
                                message = "Please enter in fields required.";
                            }
                        } else {
                            item.removeClass("ws-input-error");
                        }
                    }
                    // KIEM TRA KIEU SO
                    if (item.hasClass("ws-required-number")) {
                        if (!parseFloat(itemval) || !isFinite(itemval)) {
                            // require is number (option check)
                            error = 1;
                            item.addClass("ws-input-error");
                            if (typeof item.data("wserror-number") !== "undefined") {
                                message = item.data("wserror-number");
                            }
                        } else {
                            item.removeClass("ws-input-error");
                        }
                    }
                    // KIEM TRA KIEU EMAIL
                    if (item.hasClass("ws-required-email")) {
                        if (!_isEmail(itemval)) {
                            // require is email (option check)
                            error = 1;
                            item.addClass("ws-input-error");
                            if (typeof item.data("wserror-email") !== "undefined") {
                                message = item.data("wserror-email");
                            }
                        } else {
                            item.removeClass("ws-input-error");
                        }
                    }
                    // KIEM TRA KIEU PHONE
                    if (item.hasClass("ws-required-phone")) {
                        if (itemval.length < 10 || itemval.length > 11 || !_isNumber(itemval)) {
                            // require is phone (option check)
                            error = 1;
                            item.addClass("ws-input-error");
                            if (typeof item.data("wserror-phone") !== "undefined") {
                                message = item.data("wserror-phone");
                            }
                        } else {
                            item.removeClass("ws-input-error");
                        }
                    }
                    // HIEN NOTIFICATION RA THONG BAO
                    if (opts.notification) {
                        if (!message.length && opts.debug) {
                            console.warn("notification is not define (code: notifi404)");
                        }
                        if (!$("body").find(".ws-error-mess").length) {
                            $("body").append(_mess(message));
                            setTimeout(function() {
                                $("body").find(".ws-error-mess").remove();
                            }, 2e3);
                        }
                    }
                });
                // KHAI BAO CALLBACK
                var callback = opts.callback;
                if ($.isFunction(callback)) {
                    callback.call(this, error);
                }
            }
        } else {
            console.error("element [ " + selector + " ] is not exists !");
        }
    };
})(jQuery);