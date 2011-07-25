/**
 * Created by JetBrains WebStorm.
 * User: indyUser
 * Date: 7/21/11
 * Time: 1:24 PM
 * To change this template use File | Settings | File Templates.
 */
jQuery(function($) {
    var guestId = 0
    window.GuestController = Spine.Controller.create(
    {
        events:{
            "dragstart":"dragging",
            "dragend":"dragEnd"
        },
        init: function(){
        },
        proxied:["render","dragging","dragEnd"],
        render: function(){
            this.el.html(this.item.name);
            this.refreshElements();
            return this;
        },
        dragging:function(event) {
            var dt = event.originalEvent.dataTransfer;
            dt.setData("Text", "Dropped in zone!");
            return true;
        },
        dragEnd:function(event) {
            this.App.trigger("guestDropped",this.item);
            return false;
        }
    });

    window.GuestCreator = Spine.Controller.create({
        el:$("#guestContainer"),
        events:{
            "click #guestAdder":"create"
        },
        gc:{},
        elements:{"#guests":"guests"},
        proxied: ["associateWithController"],
        init:function(){
            Guest.bind("create",this.associateWithController);
        },
        associateWithController: function(newGuest){
            var newGuestPlaceholder = $('<div class="guest" draggable="true"></div>');
            var newGuestView = GuestController.init({item:newGuest,el:newGuestPlaceholder});
            this.guests.append(newGuestView.render().el);
        },
        create:function(){
            Guest.create({category:0,name:"new guest" + guestId});
            guestId++;
        }
    });
});