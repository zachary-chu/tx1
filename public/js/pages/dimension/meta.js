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


        function get_product_list() {
            $.ajax({
                type : "post",
                url  : "/get_product_list",
            }).done(function(data) {
                App.handle_json_res(data, function(data) {
                    render_product_list(data.results)
                })
            })
        }

        function render_product_list(results) {
            results.meteList.forEach(function(item, index) {
                $("#product_list_select").append('<option value="' + item.pid + '|' + item.pname + '">' + item.pname + '</option>')
            })
            
            // Initialize Chosen
            $('#product_list_select').chosen({width: "100%"});
            
        }

        get_product_list()

    });




    // {"results":{"meteList":[{"defaultValue":null,"description":"测试","columnName":"igoodstype","dataType":"integer","isKey":"yes","isNullable":"NO"},{"defaultValue":null,"description":null,"columnName":"igoodsid","dataType":"integer","isKey":"yes","isNullable":"NO"},{"defaultValue":null,"description":null,"columnName":"vgoodsname","dataType":"character varying","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"vgoodstypename","dataType":"character varying","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"igoodssubtype","dataType":"integer","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"vgoodssubtypename","dataType":"character varying","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"iprice","dataType":"integer","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"ioriginalgoodstype","dataType":"integer","isKey":"yes","isNullable":"NO"},{"defaultValue":null,"description":null,"columnName":"iterm","dataType":"integer","isKey":"yes","isNullable":"NO"},{"defaultValue":null,"description":null,"columnName":"ioriginalterm","dataType":"integer","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"adasdfasf","dataType":"integer","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":"vvvvvv","columnName":"czczc","dataType":"text","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"sdafafasfa","dataType":"integer","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"ssssss","dataType":"integer","isKey":"no","isNullable":"YES"},{"defaultValue":null,"description":null,"columnName":"ewrweew","dataType":"integer","isKey":"no","isNullable":"YES"}],"schemaName":"u_ieg_idog","tableName":"dx_wefeng_rpt_tbgoodsconf","pname":"","pid":""},"total":0,"currentPageNum":1,"currentPageSize":50,"findType":null,"pageNum":1,"startIndex":0,"message":"get data sucessfull","status":"200","createBy":null,"createDate":null,"oK":"yes","lastUpdateBy":null,"lastUpdateDate":null}
})();