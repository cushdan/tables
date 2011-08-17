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
            this.trigger("newCurrentCategory",this);
        
        this.current = value;
        this.save();
    }
})

Category.extend({
    getCurrent:function(){
        return Category.select(function(item){return item.current == true;})[0]
    },
    isColorUsed:function(color){
        return Category.select(function(item){return item.color === ('#' + color);}).length > 0
    }
});