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
            this.el = $('<div class="tableGuestList"></div>');
            for(var guest in this.item.table.tableGuests){

            }
            
        }
    });

    window.TableGuestListCreator = Spine.Controller.create({
        el:$("#tableGuestLists"),
        events:{},
        elements:{},
        proxied: ["associateWithController"],
        init:function(){
            //TableCreator.bind("newTable",this.create);
            //TableGuestList.bind("create",this.associateWithController);
        },
        associateWithController: function(newTableGuestList){
            var newTableGuestListController = TableGuestListController.create({item:newTableGuestList});
            this.el.append(newTableGuestListController.render().el);
        },
        create:function(table){
            TableGuestList.create({table:table});
        }
    });
});