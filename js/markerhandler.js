AFRAME.registerComponent("marker-handler",{
    init:async function(){
        this.el.addEventListener("markerFound",()=>{
            this.handleMarkerFound()
        })
        this.el.addEventListener("markerLost",()=>{
            this.handleMarkerLost()
        })

    },
    handleMarkerFound:function(){
        var buttonDiv  = document.getElementById("button-div")
        buttonDiv.style.display = "flex"
        var orderSummary = document.getElementById("order-summary")
        var orderButton = document.getElementById("order-button")
        orderSummary.addEventListener("click",()=>{
            swal({
                icon:"warning"
             , title:"order-summary ",
             text:"work in progress",
            })
        }),
        orderButton.addEventListener("click",()=>{
            swal({
                icon:"https://i.imgur.com/4NZ6uLY.jpg"
               , title:"Thanks for order"
               , text: " "
               ,timer: 2000
               ,buttons:false
            })
        })
    },
    handleMarkerLost:function(){
     var buttonDiv = document.getElementById("button-div")
     buttonDiv.style.display ="none"

    }
})