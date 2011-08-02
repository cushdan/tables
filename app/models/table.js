/**
 * Created by .
 * User: atlasuser
 * Date: 6/6/11
 * Time: 1:43 PM
 * To change this template use File | Settings | File Templates.
 */

var Table = Spine.Model.setup("Table",["max","tableGuests"]);

Table.include({
  sections: function(){
    var sections = {};
    for(var index in this.tableGuests){
        var guest = this.tableGuests[index];
        if(sections[guest.category.index]){
            sections[guest.category.index].count = sections[guest.category.index].count + 1;
        } else {
            sections[guest.category.index] = {};
            sections[guest.category.index].count = 1;
            sections[guest.category.index].color = guest.category.color;
        }
    }
    return sections;
  },
  addGuest:function(guest){
      this.tableGuests.push(guest);
      this.parent.trigger("update");
  },
  removeGuest:function(guestToRemove){
      this.tableGuests = $.grep(this.tableGuests,function(tableGuest){return tableGuest.id != guestToRemove.id});
      this.save();
      this.parent.trigger("update");
  }
});