/**
 * Created by .
 * User: cushdan
 * Date: 7/27/11
 * Time: 9:02 PM
 * To change this template use File | Settings | File Templates.
 */

jQuery(function($) {
    window.CategoryController = Spine.Controller.create(
    {
        elements:{".colorPicker":"colorInput"},
        events:{
            "click":"setAsCurrent",
            "change .colorPicker":"colorChanged"
        },
        init: function(){
            this.item.setCurrent(true);
            this.item.save();
        },
        proxied:["render","updateCurrentCategory","setAsCurrent","colorChanged"],
        render: function(){
            this.item.reload();
            this.el.html($('#categoryTemplate').tmpl(this.item));
            this.el.find(".colorPicker").colorPicker();
            this.refreshElements();
            return this;
        },
        updateCurrentCategory:function(newCurrent){
            if(this.item === newCurrent)
                return;

            this.item.setCurrent(false);
            this.item.save();
            this.render();
        },
        setAsCurrent:function(){
            this.item.setCurrent(true);
            this.render();
        },
        colorChanged:function(){
            this.item.color = this.colorInput.val();
            this.item.save();
            this.render();
            this.item.trigger("colorChanged",this.item);
        }

    });

    window.CategoryCreator = Spine.Controller.create({
        maxId:0,
        el:$("#categorySection"),

        events:{
            "click #categoryAdder":"create"
        },
        elements:{"#categories":"categories"},
        proxied: ["associateWithController","updateAllCategories","getUnusedColor"],
        init:function(){
            Category.bind("create",this.associateWithController);
            Category.bind("newCurrentCategory",this.updateAllCategories);
            this.create();
        },
        associateWithController: function(newCategory){
            var newCategoryPlaceholder = $('<div/>');
            var newCategoryView = CategoryController.init({item:newCategory,el:newCategoryPlaceholder});
            this.categories.append(newCategoryView.render().el);
            
            this.bind("updateCurrentCategories",newCategoryView.updateCurrentCategory);
        },
        create:function(){
            var unusedColor = "#" + this.getUnusedColor();
            Category.create({name:"new category",color:unusedColor,index:this.maxId});
            this.maxId++;
        },
        updateAllCategories:function(newCurrent){
            this.trigger("updateCurrentCategories",newCurrent)
        },
        getUnusedColor:function(){
            var allColors = $('<div/>').colorPicker.defaultColors;
            return $.grep(allColors,function(color){
                        return !Category.isColorUsed(color);
                    })[0];
        }
    });


});