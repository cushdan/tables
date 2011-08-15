/**
 * Created by JetBrains WebStorm.
 * User: indyUser
 * Date: 8/2/11
 * Time: 4:33 PM
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.categoryPicker = function(onSelect){
        createPicker(this,onSelect);
    };

    var createPicker = function(element,onSelect){
        var picker = $('<div class="categoryPicker modelList border"></div>').hide();
        element.bind('click',function(event){
            createCategories($(this),event,onSelect)
        });
        element.append(picker);
    };
    
    var markup =    '<div class="categoryOption" categoryid="${id}">'+
                        '<div style="float:left;">${name}</div>'+
                        '<div class="categoryMarker border" style="background-color:${color}"></div>'+
                    '</div>';
    
    $.template("categoryRowTemplate", markup );

    var createCategories = function(element,event,onSelect){
        var picker = element.find('.categoryPicker:first');
        if(picker.is(':visible'))
            return;

        var categories = $('<div id="categories"/>').bind("click",doNothing)
        var categoryCount=0;
        $.each(Category.records,function(){
            categoryCount++;
            categories.append($.tmpl("categoryRowTemplate",this));
        });
        picker.html(categories);
        var arrow = $('<div class="arrow"></div>');
        picker.prepend(arrow);
        
        picker.find('.categoryOption').click(function(event){
            onSelect(event);
            destroyBlocker();
        });

        var centerOffset = categoryCount * 20 / 2;
        var yOffset = Math.max(event.pageY - centerOffset,10);
        arrow.css({"top":centerOffset-10});
        picker.css({ "left":(event.pageX + 30)+"px", "top":yOffset+"px"});
        picker.show();
        var blocker = $('<div id="blocker" style="width:120%;height:3000px;position:absolute;top:0px;left:0px;z-index:99;opacity:0.8;background-color:black"></div>');
        $('body').append(blocker);
        var destroyPicker = function(){
            picker.hide();
            blocker.remove();
            picker.html('');
        };

        blocker.bind("click",destroyPicker);        
        return false;
    };
    var destroyBlocker = function(){
        $('#blocker').remove();
    };
    var doNothing = new function(){
        return false;
    };

})(jQuery)