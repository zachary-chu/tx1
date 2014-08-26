(function() {
    App.alert_message = function(type, title, msg) {
        var $message_container = $("#alert-message");
        var $alert = $message_container.find(".alert-" + type);

        $alert.find("h4 span").html(title || type).end().find(".msg").html(msg || "").end().slideDown()

        $alert.delay(2000).slideUp()
    }

    App.show_error = function(data, status, headers, config) {
        App.alert_message("danger", "出了点问题", "遇到一些未知错误")
    }

    App.handle_json_res = function(data, cb) {
        if (data.ok === "no") {
            return App.alert_message("danger", "出错了", data.message)
        }

        if (data.ok === "yes") {
            return cb(data)
        }

        App.alert_message("danger", "系统错误", "服务暂时不可用")
    }

    // 1是产品 2经分 3两个都是
    var permission_list = {
        "meta_config" : [2, 3],
        "data_config" : [1, 3]
    }

    function get_staff() {
        $.ajax({
            type : "post",
            url  : "/get_staff",
        }).done(function(data) {
            App.handle_json_res(data, function(data) {
                display_nav(data.results)
            })
        })
    }

    function display_nav(results) {
        $("#user_name").text(results.staff.loginName)

        $("ul.sidebar-nav li").each(function(index, item) {
            var action_name = $(this).data("action")

            if (typeof action_name === 'undefined') {
                return
            }

            if (has_permission(action_name, results.permissionId)) {
                $(this).removeClass("hidden")
            }
        })
    }

    function has_permission(action_name, role_id) {
        if (permission_list[action_name].indexOf(role_id) > -1) {
            return true
        } else {
            return false
        }
    }

    get_staff()

})();
