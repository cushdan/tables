/**
 * Date: 5/20/11
 * Time: 1:13 PM
 * To change this template use File | Settings | File Templates.
 */

jQuery(function($) {

    window.TableController = Spine.Controller.create(
    {   colors:["#FF6600","#0000FF","#00FF00"],
        events:{
                    "dragenter":"highlightOnDrag",
                    "dragleave":"unhighlight",
                    "dragover":"dragover",
                    "drop":"dropReceived"
                },
        proxied:["render","mouseupEvent","highlightOnDrag","guestAdded","dropReceived"],

        init: function(){
            this.el.easydrag();
            this.item.bind("update",this.render);
            //this.App.bind("guestDropped",this.guestAdded);
        },
        dragover:function(){return false;},
        highlightOnDrag: function(event){
            event.originalEvent.preventDefault();
            this.el.addClass("dropready");
            return true;
        },
        unhighlight:function(event){
            this.el.removeClass("dropready");
            return false;
        },
        dropReceived:function(event){
            event.preventDefault();
            this.unhighlight();
            
            var data = event.originalEvent.dataTransfer;
            var guestId = data.getData("Text");
            var guest = Guest.findById(guestId);

            this.guestAdded(guest);            
        },
        guestAdded:function(guest){
            if(guest.parentTable == this.item)
                return;
            
            this.item.addGuest(guest);
            guest.setParentTable(this.item);
            this.item.save();
        },
        render: function(){
            var canvas = $('<canvas width=80 height=80 style="position:absolute"></canvas>');
            var myDrawing = canvas[0].getContext("2d");

            var startDegree = 0;
            var sections = this.item.sections();
            var colorIndex = 0;
            var renderedTotal = 0;

            for(var prop in sections){
                var section = sections[prop];
                renderedTotal += section.count;
                startDegree = this._renderSection(myDrawing,startDegree,this.item.max,section.count,section.color);
                colorIndex++;
            }
            if(renderedTotal < this.item.max){
                var remainingSeats = this.item.max - renderedTotal;
                this._renderRemainder(myDrawing,startDegree,this.item.max,remainingSeats);
            }
            this.el.html(canvas);
            this.refreshElements();
            return this;
        },
        _renderSection: function(canv,startDegree,total,sectionCount,color){
            var endDegree = this._renderArc(sectionCount, total, startDegree, canv, color);
            canv.fill();
            canv.stroke();
            return endDegree;
        },
        _renderArc: function(sectionCount, total, startDegree, canv, color) {
                var endDegree = ((sectionCount / total) * Math.PI * 2) + startDegree;
                canv.beginPath();
                canv.fillStyle = color;
                canv.strokeStyle = "#000000";
                this._drawArc(canv, startDegree, endDegree);
                canv.closePath();
                return endDegree;
        },
        _renderRemainder: function(canv,startDegree,total,sectionCount,color){
            var endDegree = this._renderArc(sectionCount, total, startDegree, canv, color);
            canv.stroke();
            return endDegree;
        },
        _drawArc: function(canv,startDegree,endDegree){
            var circleCenter = new Coordinate(40,40);
            var radius = 35;
            var arcStartX = (Math.cos(startDegree)*radius)+circleCenter.x;
            var arcStartY = (Math.sin(startDegree)*radius)+circleCenter.y;
            canv.arc(circleCenter.x,circleCenter.y,radius,startDegree,endDegree,false);
            canv.lineTo(circleCenter.x,circleCenter.y);
        }
    });

    window.TableCreator = Spine.Controller.create({
        el:$("#newTableLand"),
        events:{
            "click #tableAdder":"create"
        },
        elements:{"#newTableHolder":"bucket"},
        proxied: ["associateWithController"],
        init:function(){
            Table.bind("create",this.associateWithController);
        },
        associateWithController: function(newTable){
            var newTablePlaceholder = $('<div class="table"></div>');
            var tableView = TableController.init({item:newTable,el:newTablePlaceholder});
            this.bucket.append(tableView.render().el);
        },
        create:function(){
            Table.create({max:10,tableGuests:[]});
        }
    });

//    var newTable = Table.create({max:10,guests:[
//                                                {category:0},
//                                                {category:0},
//                                                {category:0},
//                                                {category:1},
//                                                {category:1},
//                                                {category:2},
//                                                {category:2}
//                                                ]});
//    var view = TableController.init({item:newTable});
});