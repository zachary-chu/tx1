(function() {
    $(function () {
        var $meta_search_form       = $("#meta_search_form"),
            $data_source_select     = $("#data_source_select"),
            $meta_search_submit_btn = $meta_search_form.find("button[type='submit']"),
            $table_name_input       = $("#table_name_input"),
            $meta_data_table        = $("#meta_data_table"),
            $search_result_block    = $("#search_result_block"),
            $meta_table_name_td     = $("#meta_table_name_td"),
            $meta_product_name_td   = $("#meta_product_name_td"); 

        // search
        $meta_search_form.submit(function (event) {
            event.preventDefault()

            var data_source = $data_source_select.val()

            if (data_source === "blank") {
                return App.alert_message("warning", "请选择数据源")
            }

            // ajax submit
            $meta_search_submit_btn.button("loading")

            var request = $.ajax({
                type : $meta_search_form.attr("method"),
                url  : $meta_search_form.attr("action"),
                data : {schemaName : $data_source_select.val(), tableName : $table_name_input.val() }
            })

            request.always(function() {
                $meta_search_submit_btn.button('reset')
            })

            // success
            request.done(function(data) {
                App.handle_json_res(data, function (result) {
                    render_meta_result(result)
                })
            })
        })

        // render table
        function render_meta_result(result) {
            var $table_body = $meta_data_table.find("tbody");

            $meta_table_name_td.text(result.table_name)
            $meta_product_name_td.text(result.product_name)

            $table_body.empty()

            result.list.forEach(function(meta_item) {
                $table_body.append('<tr><td class="text-center">' + meta_item.col_name
                        + '</td><td class="text-center">' + meta_item.col_type
                        + '</td><td class="text-center">' + meta_item.is_blank
                        + '</td><td class="text-center">' + meta_item.is_primary
                        + '</td><td class="text-center">' + meta_item.default_value
                        + '</td><td>' + meta_item.comment
                        + '</td><td class="text-center"><button class="btn btn-xs btn-info edit_col_comment_btn" title="修改注释">修改注释</button></td></tr>')
            })

            $search_result_block.removeClass("hidden")
        }

        // edit product name
        $("#edit_product_btn").click(function(event) {
            event.preventDefault();

            $("#edit_product_modal").modal()

        })

        // add col
        $("#add_col_btn").click(function(event) {
            event.preventDefault();

            $("#add_meta_col_modal").modal()

        })

        // edit col comment
        $("#meta_data_table").delegate(".edit_col_comment_btn", "click", function(event) {
            $("#edit_col_comment_modal").modal()
        })


    });
})();