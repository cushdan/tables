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
        events:{},
        init: function(){
            this.item.save();
        },
        proxied:["render"],
        render: function(){
            this.item.reload();
            this.el.html($('#categoryTemplate').tmpl(this.item));
            this.refreshElements();
            return this;
        }
    });

    window.CategoryCreator = Spine.Controller.create({
        maxId:0,
        el:$("#categorySection"),
        events:{
            "click #categoryAdder":"create"
        },
        elements:{"#categories":"categories"},
        proxied: ["associateWithController","renderAll"],
        init:function(){
            Category.bind("create",this.associateWithController);
            Category.bind("newCurrentCategory",this.renderAll);
            this.create();
        },
        associateWithController: function(newCategory){
            var newCategoryPlaceholder = $('<div/>');
            var newCategoryView = CategoryController.init({item:newCategory,el:newCategoryPlaceholder});
            Category.setAllCurrent(newCategory);
            this.categories.append(newCategoryView.render().el);
            this.bind("renderAll",newCategoryView.render);
        },
        create:function(){
            var newCategory = Category.create({name:"new category",color:"#000000",index:this.maxId});
            this.maxId++;
        },
        renderAll:function(){
            this.trigger("renderAll");
        }
    });


});