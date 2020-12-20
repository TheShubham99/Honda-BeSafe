function load_data(){
   
    var name,phone,id,lon,lat,model;
   
    fetch("http://127.0.0.1:5500/Users/ssahasrabhojane/config.json")
    .then((res)=>{
        res.json().then(
            (data)=>{
                
                name=data['name'];
                phone=data['phone_number'];
                id=data['id'];
                lon=data['lon'];
                lat=data['lat'];
                model=data['car_model'];

            }
        ).catch((err)=>{
            console.log("Failed.")
        })
    })
    .catch((err)=> console.log("Failed"))  


    document.getElementById("name").value="hi";
    console.log(name)


}

