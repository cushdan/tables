/**
 * Created by .
 * User: cushdan
 * Date: 7/27/11
 * Time: 9:00 PM
 * To change this template use File | Settings | File Templates.
 */
var Category = Spine.Model.setup("Category",["name","color","index","current"]);

Category.include({
    setCurrent:function(value){
        if(value)
            this.parent.trigger("newCurrentCategory",this.id);
        
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
        return category;
    },
    getCurrent:function(){
        return Category.select(function(item){return item.current == true;})[0]
    }
});