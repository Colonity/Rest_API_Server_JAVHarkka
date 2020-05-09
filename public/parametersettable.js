//JQuery(document)
$(document).ready(() => {
    let table = $("#parametersettable").DataTable({  //.-viittaa luokkiin, #-viitaa html:n id:een
        ajax: {
            type: "GET",
            datatype: "json",
            url: "/api/machining-parameter-sets",
            dataSrc: ""
        },
        rowId: "_id", //tulee Postmanin taulukon id:n ID:stä
        columns: [
            {data: "_id",type:"readonly", visible:false},
            {data: "tool_name",type:"text", required: true},
            {data: "material",type:"text", required: true},
            {data: "cutting_speed",type:"float", required: true},
            {data: "feed_rate",type:"float", required: true}
        ],

        dom: "Bfrtip",
        select: "single",
        responsive:true,
        altEditor: true,
        buttons: [
            "columnsToggle",
            {
                text: "Create",
                name: "add" //osaa kutsua tämän mukaan oikeaa funktiota
            },
            {
                text: "Edit",
                name: "edit" //osaa kutsua tämän mukaan oikeaa funktiota
            },
            {
                text: "Delete",
                name: "delete" //osaa kutsua tämän mukaan oikeaa funktiota
            },
            {
                text: "Refresh",
                name: "refresh" //osaa kutsua tämän mukaan oikeaa funktiota
            }
        ],
        onAddRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/machining-parameter-set",
                type: "POST",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/machining-parameter-set/"+rowdata._id,
                type: "DELETE",
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: (datatable, rowdata, success, error) => {
            $.ajax({
                url: "/api/machining-parameter-set/"+rowdata._id,
                type: "PUT",
                data: rowdata,
                success: success,
                error: error
            });
        }

    });
})



