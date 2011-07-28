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
        proxied:[],
        render: function(){
            this.el.html(this.item.name);
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
        proxied: ["associateWithController"],
        init:function(){
            Category.bind("create",this.associateWithController);
            this.create();
        },
        associateWithController: function(newCategory){
            var newCategoryPlaceholder = $('<div class="category"></div>');
            var newCategoryView = CategoryController.init({item:newCategory,el:newCategoryPlaceholder});
            this.categories.append(newCategoryView.render().el);
        },
        create:function(){
            var newCategory = Category.create({name:"new category",color:"#000000",index:this.maxId});
            Category.setCurrent(newCategory);
            newCategory.save();
            this.maxId++;
        }
    });


});