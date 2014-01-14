/*
 * jquery-dependency
 *
 *
 * Copyright (c) 2014 Martin Hansen
 * http://martinhansen.no
 * Licensed under the MIT license.
 */

(function ($) {
    $.fn.dependsOn = function (parent) {
        if (parent === undefined) { console.log('Parent is required'); return; }

        var opts = { parent: parent, value: null };

        if ($(opts.parent).attr('type') == 'radio') {
            opts.origparent = $(opts.parent);
            opts.parent = 'input[name=' + $(opts.parent).attr('name') + ']';
        }

        return this.each(function () {
            var caller = $(this);
            $.data(this, 'dependsOnOptions', opts);

            caller.on('click iterate', function (event) {
                var parent = (opts.origparent) ? opts.origparent : $(opts.parent);
                parent.attr('checked', true).trigger('iterate', ['Iterate', 'Event']);
                if (jQuery.ui) parent.button('refresh');
            });

            $(opts.parent).each(function (i) {
                var pp = $(this);

                var checked = pp.attr('checked');
                if (checked) {
                    $.fn.dependsOn.check(pp, caller, opts);
                }

                pp.on('change', function (event) {
                    $.fn.dependsOn.check($(this), caller, opts);
                });
            });

        });
    };

    $.fn.dependsOn.check = function (parent, child, opts) {
        if (!parent.is(':checked') || (opts.origparent && !$(opts.origparent).is(':checked'))) {
            child.attr('checked', false).trigger('change');
            if (jQuery.ui) parent.button('refresh');
        }
    };
})(jQuery);
