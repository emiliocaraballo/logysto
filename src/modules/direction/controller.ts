import { general } from '../../config/general';
import { Request, Response } from 'express';
import axios from 'axios';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3 });
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.resolve(error);
  }
);


class DirectionController {
    public FindDirection= async (req: Request, res: Response): Promise<Response> => {

        // language por defecto en español

        var direction=String(req.query.direction);
        var country=String(req.query.country);
        var lat=Number(req.query.lat);
        var lon=Number(req.query.lon);

        

        if(!general.validateData("string",direction,1)){
            return res.status(400).json({
                code:0,
                message: 'Verifique el campo de dirección.'
            });
        }
        
        if(!general.validateData("string",country) && country!="undefined" && country!=""){
            return res.status(400).json({
                code:0,
                message: 'Verifique el campo de pais.'
            });
        }else{
            if(country=="undefined"){
                country="";
            }
        }
        

        if(!general.validateData("real",lat) && isNaN(lat)){
            return res.status(400).json({
                code:0,
                message: 'Verifique el campo de latitud.'
            });
        }

        if(!general.validateData("real",lon) && isNaN(lon)){
            return res.status(400).json({
                code:0,
                message: 'Verifique el campo de latitud.'
            });
        }
       
       
       
        var resultDirection: { title: any; localidad: any; postalcode: any; position: { lat: any; lon: any; }; }[]=[];

        // se implementa el primer proveedor
        
        var proximity=lat+","+lon;;
        const response2 = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+direction+'.json?language=es&country='+country+'&access_token=pk.eyJ1IjoiZW1pbGlvY2FyYWJhbGxvOTgiLCJhIjoiY2t6MjZibjhrMXJrMDJwdGJkN3ljbnFpciJ9.qoXIWVsJeYKiwCEpOjJYaQ&proximity='+proximity+"&bbox=30",{timeout:5000});        
        if(!(response2.data==undefined)){
            await Promise.all(response2.data.features.map(async (item:any) => {
                resultDirection.push({
                    title:item.place_name,
                    localidad:"",
                    postalcode:"",
                    position:{
                        lat:item.geometry.coordinates[0],
                        lon:item.geometry.coordinates[1]
                    }
                });
            }));
        }
        
        if(resultDirection.length==0){
            // se implementa el segundo proveedor tomtom

            
            const response = await axios.get('https://api.tomtom.com/search/2/geocode/'+direction+'.json?key=FOoIXACETMopUhiGCBmrvRVqwJPcaHdk&storeResult=&typeahead=&limit=10&ofs=0&countrySet='+country+'&language=ca-ES&extendedPostalCodesFor=None&view=AR&mapcodes=Local&lat='+lat+"&lon"+lon,{timeout:5000});
            if(!(response.data==undefined)){
                await Promise.all(response.data.results.map(async (item:any) => {
                    resultDirection.push({
                        title:item.address.freeformAddress,
                        localidad:item.address.localName,
                        postalcode:item.address.postalCode,
                        position:{
                            lat:item.position.lat,
                            lon:item.position.lon,
                        }
                    });
                }));
            }
        }
        var status=resultDirection.length>0;
        return res.status((status)?200:404).json({code:resultDirection.length>0?1:0,data:resultDirection,message:status?'':'No hay resultado en los 2 proveedores.'});
    }
}
export const directionController = new DirectionController;