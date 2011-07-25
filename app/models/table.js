/**
 * Created by .
 * User: atlasuser
 * Date: 6/6/11
 * Time: 1:43 PM
 * To change this template use File | Settings | File Templates.
 */

var Table = Spine.Model.setup("Table");

Table.extend({
  sections: function(){
    var sections = {};
    for(var index in this.item.tableGuests){
        var guest = this.item.tableGuests[index];
        if(sections[guest.category]){
            sections[guest.category] = sections[guest.category] + 1;
        } else {
            sections[guest.category] = 1;
        }
    }
    return sections;
  },
  addGuest:function(guest){
      this.item.tableGuests.push(guest);
      this.item.trigger("update");
  }
});