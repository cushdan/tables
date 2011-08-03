/**
 * Created by JetBrains WebStorm.
 * User: indyUser
 * Date: 8/2/11
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.categoryPicker = function(){
        createPicker(this);
    };

    var picker;
    createPicker = function(element){
        picker = $('<div class="categoryPicker modelList"></div>');
        element.bind('click',createCategories);
        element.append(picker);
    };
    var markup = '<div><div style="float:left;">${name}</div><div class="categoryMarker" style="background-color:${color}"></div></div>'
    $.template("categoryRowTemplate", markup );
    createCategories = function(){
        var categories = $('<div/>')
        $.each(Category.records,function(){
            categories.append($.tmpl("categoryRowTemplate",this));
        });
        picker.html(categories);
    }
})(jQuery)