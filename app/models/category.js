/**
 * Created by .
 * User: cushdan
 * Date: 7/27/11
 * Time: 9:00 PM
 * To change this template use File | Settings | File Templates.
 */
var Category = Spine.Model.setup("Category",["name","color","index"]);

Category.include({
    setCurrent:function(value){
        this.current = value;
        this.save();
    }
})

Category.extend({
    setAllCurrent:function(category){
        category.setCurrent(true);
        for(var record in this.records){
            var cat = this.records[record];
            if(cat.id != category.id){
                cat.setCurrent(false);
            }
        }
        category.parent.trigger("newCurrentCategory");
        return category;
    },
    getCurrent:function(){
        return this.select(function(item){return item.current;})[0];
    }
});