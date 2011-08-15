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
            "dragend":"dragEnd",
            "dblclick":"edit",
            "submit form":"saveName",
            "blur input":"saveName"
        },
        init: function(){
            this.onNewCategory();
        },
        proxied:["render","dragging","dragEnd","colorChanged","updateCategory","edit","saveName"],
        render: function(){
            this.el.html($('#guestTemplate').tmpl(this.item));
            this.el.find('.categoryMarker').categoryPicker(this.updateCategory);
            this.refreshElements();
            return this;
        },
        dragging:function(event) {
            var dt = event.originalEvent.dataTransfer;
            dt.setData("Text", this.item.id);
            return true;
        },
        dragEnd:function(event) {
            return true;
        },
        colorChanged:function(changedCategory){
            this.item.reload();
            this.item.category.reload();
            if(this.item.category.id != changedCategory.id){
                return;
            }
            
            this.render();
            var parentTable = this.item.parentTable;
            if(parentTable){
                parentTable.trigger("update",parentTable);
            }
        },
        updateCategory:function(event){
            var newId = $(event.currentTarget).attr("categoryid");
            this.item.category = Category.find(newId);
            this.onNewCategory();
            this.colorChanged(this.item.category);
        },
        onNewCategory:function(){
            this.item.category.bind("colorChanged",this.colorChanged);
            this.item.save();
        },
        edit:function(){
            this.toggleEdit();
            this.el.find('input').focus();
        },
        toggleEdit:function(){
            this.el.toggleClass("guestEdit");
        },
        saveName:function(){
            var newName = this.el.find('input').val();
            this.item.name = newName;
            this.item.save();
            this.toggleEdit();
            this.render();
            return false;
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