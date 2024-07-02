sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("todolist.controller.todolist", {
        onInit: function () {
 
        },
 
 
        onEdit:function(oEvent){
            var that=this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false)
            if(oEvent.getSource().getText() === "Edit"){
               oEvent.getSource().setText("Submit");
               oEvent.getSource().getParent().getParent().getCells()[4].setEditable(true);
            }else{
               oEvent.getSource().setText("Edit");
               oEvent.getSource().getParent().getParent().getCells()[4].setEditable(false);
               var oInput =  oEvent.getSource().getParent().getParent().getCells()[4].getValue();
               var oId =  oEvent.getSource().getBindingContext().getProperty("ID");
               oModel.update("/Products("+oId+")",{Rating:oInput},{success:function(odata){
                   that.getView().byId("idProductsTable").getModel().refresh();
               },error: function(oErr){
                   console.log(oErr)
               }
           })
            }
   },
   onDuplicate:function(oEvent){
       var that=this;
       var oModel=this.getOwnerComponent().getModel();
       oModel.setUseBatch(false);
       var oDuplicate=oEvent.getSource().getBindingContext().getProperty();
       var oDuplicateProduct = JSON.parse(JSON.stringify(oDuplicate));
       oDuplicateProduct.ID = 100 + oDuplicateProduct.ID;
        oModel.create("/Products",oDuplicateProduct,{success:function(odata){
           that.getView().byId("idProductsTable").getModel().refresh();
        },error: function(oErr){
            console.log(oErr)
        }})
   },
   onDelete:function(oEvent){
       var that=this;
       var oModel=this.getOwnerComponent().getModel();
       oModel.setUseBatch(false);
       var oId=oEvent.getSource().getBindingContext().getProperty("ID");
       oModel.remove("/Products("+oId+")",{
           success:function(odata){
               that.getView().byId("idProductsTable").getModel().refresh();
           },error: function(oErr){
               console.log(oErr)}
           
       })
    }
    });
    
});
