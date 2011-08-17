/**
 * Created by JetBrains WebStorm.
 * User: indyUser
 * Date: 8/16/11
 * Time: 3:32 PM
 * To change this template use File | Settings | File Templates.
 */
(function($){
    $.fn.divEditor = function(onEdit){
        createEditor(this,onEdit);
    };

    var createEditor = function(element,onEdit){
        var editor = $('<form class="editorForm"></form>').hide();
        var initialValue = element.text();
        var input = $('<input type="text" class="editorInput" style="float:left;height:14px" value="'+ initialValue + '"/>');
        editor.append(input);

        input.bind('blur',function(){
                commitEdit($(element),input,onEdit);
            });

        editor.bind('submit',function(){
            commitEdit($(element),input,onEdit);
            $('body').focus();
            return false;
        });
        element.bind('dblclick',function(event){
            element.hide();
            editor.show();
            input.focus();
        });
        editor.hover(function(){return false;});

        element.after(editor);
    };

    var commitEdit = function(element,input,onEdit){
        var newValue = input.val();
        element.text(newValue);
        element.show();
        input.parent().hide();
        onEdit(newValue);
        //input.unbind('blur');
        //input.parent().unbind('submit');
    }

})(jQuery)