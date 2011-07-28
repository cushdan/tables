/**
 * Created by .
 * User: cushdan
 * Date: 7/27/11
 * Time: 9:00 PM
 * To change this template use File | Settings | File Templates.
 */
var Category = Spine.Model.setup("Category",["name","color","index","current"]);

Category.extend({
    setCurrent:function(category){
        category.current = true;
        for(var record in this.records){
            var cat = this.records[record];
            if(cat.id != category.id){
                cat.current = false;
            }
        }
        return category;
    },
    getCurrent:function(){
        return this.select(function(item){return item.current;})[0];
    }
});