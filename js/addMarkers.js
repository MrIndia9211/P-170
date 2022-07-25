AFRAME.registerComponent("create-markers",{
    init:async function(){
        var mainScene = document.querySelector("#main-scene")
        var dishes = await this.getDishes()
        dishes.map(dish=>{
            var marker = document.createElement("a-marker")
            marker.setAttribute("id",toy.id)
            marker.setAttribute("type","pattern")
            marker.setAttribute("url",toy.marker_pattern_url)
            marker.setAttribute("cursor",{
                rayOrigin:"mouse"
            })
            marker.setAttribute("markerhandler",{})
            mainScene.appendChild(marker)
            
            var model = document.createElement("a-entity")
            model.setAttribute("id",`model-${toy.id}`)
            model.setAttribute("position",toy.model_geometry.position)
            model.setAttribute("rotation",toy.model_geometry.rotation)
            model.setAttribute("scale",toy.model_geometry.scale)
            model.setAttribute("gltf-model",`url(${toy.model_url})`)
            model.setAttribute("gesture-handler",{})
            marker.appendChild(model)

            var mainPlane = document.querySelector("a-plane")
            mainPlane.setAttribute("id",`main-plane-${toy.id}`)
            mainPlane.setAttribute("position",{x:0,y:0,z:0})
            mainPlane.setAttribute("rotation",{x:-90,y:0,z:0})
            mainPlane.setAttribute("width",1.7)
            mainPlane.setAttribute("height",1.5)
            marker.appendChild(mainPlane)

            var titlePlane = document.createElement("a-plane")
            titlePlane.setAttribute("id",`title-plane-${toy.id}`)
            titlePlane.setAttribute("position",{x:0,y:0.89,z:0.02})
            titlePlane.setAttribute("rotation",{x:0,y:0,z:0})
            titlePlane.setAttribute("width",1.69)
            titlePlane.setAttribute("height",0.3)
            mainPlane.appendChild(titlePlane)

            var dishTitle = document.createElement("a-entity")
            dishTitle.setAttribute("id",`dish-title-${dish.id}`)
            dishTitle.setAttribute("position",{x:0,y:0,z:0.1})
            dishTitle.setAttribute("rotation",{x:0,y:0,z:0})
            dishTitle.setAttribute("text",{
                font:"monoid",
                color:"black",
                width:2,
                align:"center",
                value:dish.dish_name.toUpperCase()
            })
            titlePlane.appendChild(dishTitle)

            var ingredients = document.createElement("a-entity")
            ingredients.setAttribute("id",`toys-${dish.id}`)
            ingredients.setAttribute("position",{x:0.3,y:0,z:0.1})
            ingredients.setAttribute("rotation",{x:0,y:0,z:0})
            ingredients.setAttribute("text",{
                font:"monoid",
                color:"black",
                width:2,
                align:"left",
                value:`dish.ingredients.join("\n\n")`
            })    
            })

    },
    getDishes:async function(){
        return await firebase.firesstore.colletion("dishes").get().then(data=>{
            return data.docs.map(doc=>doc.data())
        })
    }
    
})