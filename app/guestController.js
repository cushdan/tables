/**
 * Created by JetBrains WebStorm.
 * User: indyUser
 * Date: 7/21/11
 * Time: 1:24 PM
 * To change this template use File | Settings | File Templates.
 */
jQuery(function($) {
    window.GuestController = Spine.Controller.create(
    {
        events:{
            "dragstart":"dragging",
            "dragend":"dragEnd"
        },
        init: function(){
            this.item.save();
        },
        proxied:["render","dragging","dragEnd"],
        render: function(){
            this.el.html($('#guestTemplate').tmpl(this.item));
            this.refreshElements();
            return this;
        },
        dragging:function(event) {
            var dt = event.originalEvent.dataTransfer;
            dt.setData("Text", this.item.id);
            return true;
        },
        dragEnd:function(event) {
            this.App.trigger("guestDropped",this.item);
            return true;
        }
    });

    window.GuestCreator = Spine.Controller.create({
        el:$("#guestContainer"),
        events:{
            "click #guestAdder":"create"
        },
        elements:{"#guests":"guests"},
        proxied: ["associateWithController"],
        init:function(){
            Guest.bind("create",this.associateWithController);
        },
        associateWithController: function(newGuest){
            var newGuestPlaceholder = $('<div/>');
            var newGuestView = GuestController.init({item:newGuest,el:newGuestPlaceholder});
            this.guests.append(newGuestView.render().el);
        },
        create:function(){
            var currentCategory = Category.getCurrent();
            Guest.create({category:currentCategory,name:"new guest"});
        }
    });
});