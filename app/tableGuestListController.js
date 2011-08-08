/**
 * Created by JetBrains WebStorm.
 * User: indyUser
 * Date: 8/5/11
 * Time: 9:05 AM
 * To change this template use File | Settings | File Templates.
 */

jQuery(function($) {

    window.TableGuestListController = Spine.Controller.create(
    {
        events:{},
        proxied:[],

        init: function(){
        },
        render: function(){
        }
    });

    window.TableGuestListCreator = Spine.Controller.create({
        el:$(""),
        events:{},
        elements:{},
        proxied: ["associateWithController"],
        init:function(){
            TableGuestList.bind("create",this.associateWithController);
        },
        associateWithController: function(newTableGuestList){

        },
        create:function(){
            TableGuestList.create();
        }
    });
});