(function($) {
    $.fn.wsFormError = function(options) {

        var selector = this.selector,
            error    = 0,
            mess     = '',
        opts = $.extend({
            enable: true,
            select: 'input',
            message: false
        }, options);

        if ($('body').find(this).length) {
            if (typeof(opts.enable) !== "boolean") {
                console.warn('option (enable) is not type boolean !');
                return;
            }
            if (opts.select == "" || opts.select == null) {
                console.warn('option (select) is null !');
                return;
            }
            if (typeof(opts.select) !== "string") {
                console.warn('option (select) is not type string !');
                return;
            }
            if (typeof(opts.message) !== "boolean") {
                console.warn('option (message) is not type boolean !');
                return;
            }

            var viewMessage = function(message) {
                if (message != "") {
                    return '<span class="ws-error-mess"'
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
                $(this).find(opts.select).each(function() {
                    var item     = $(this);
                    var itemval  = item.val();
                    var itemtype = item.attr('type');
                    if (item.hasClass('ws-required')) {
                        $.each(item, function(index, val) {
                            _item    = $(val);
                            _itemval = _item.val();
                            if (!_itemval.length) {
                                // Require is not null (default check)
                                error = 1;
                                _item.addClass('isError');
                                if (typeof(_item.data('wserror-null')) !== "undefined") {
                                    mess = _item.data('wserror-null');
                                } else {
                                    mess = "Please enter in fields required.";
                                }
                            } else {
                                _item.removeClass('isError');
                            }
                            if (_item.hasClass('ws-required-number')) {
                                if (!parseFloat(_itemval) || !isFinite(_itemval)) {
                                    // require is number (option check)
                                    error = 1;
                                    _item.addClass('isError');
                                    if (typeof(_item.data('wserror-number')) !== "undefined") {
                                        mess = _item.data('wserror-number');
                                    }
                                } else {
                                    _item.removeClass('isError');
                                }
                            }
                            if (_item.hasClass('ws-required-email')) {
                                if (!isEmail(_itemval)) {
                                    // require is email (option check)
                                    error = 1;
                                    _item.addClass('isError');
                                    if (typeof(_item.data('wserror-email')) !== "undefined") {
                                        mess = _item.data('wserror-email');
                                    }
                                } else {
                                    _item.removeClass('isError');
                                }
                            }
                            if (_item.hasClass('ws-required-phone')) {
                                if ((_itemval.length < 10 || _itemval.length > 11) || (!isNumber(_itemval))) {
                                    // require is phone (option check)
                                    error = 1;
                                    _item.addClass('isError');
                                    if (typeof(_item.data('wserror-phone')) !== "undefined") {
                                        mess = _item.data('wserror-phone');
                                    }
                                } else {
                                    _item.removeClass('isError');
                                }
                            }
                            // VIEW ERROR
                            if (_item.hasClass('isError')) {
                                // Add class has-error when error is 1
                                    _item.parent('.form-group').addClass('has-error');
                            } else {
                                // remove Class has-error
                                _item.parent('.form-group').removeClass('has-error');
                            }

                            if (opts.message) {
                                if (!$('body').find('.ws-error-mess').length) {
                                    $('body').append(viewMessage(mess));
                                    setTimeout(function() {
                                        $('body').find('.ws-error-mess').remove();
                                    }, 2000);
                                }
                            }
                        });
                    }
                });
                return error;
            }
        } else {
            console.error("element [ "+selector+" ] is not exists !");
        }

    }
})(jQuery);