/**
 * Created by JetBrains WebStorm.
 * User: indyUser
 * Date: 7/21/11
 * Time: 1:22 PM
 * To change this template use File | Settings | File Templates.
 */
var Guest = Spine.Model.setup("Guest", ["category","name","guestId","parentTable"]);

Guest.extend({
    findById:function(guestId){
        return this.select(function(item){return item.id == guestId})[0];
    },
    count:function(){
        return this.records.length;
    }
});

Guest.include({
    setParentTable:function(newTable){
        var parentTable = this.parentTable;
        if(parentTable){
            parentTable.removeGuest(this);
        }
        this.parentTable = newTable;
        this.save();
    }
})