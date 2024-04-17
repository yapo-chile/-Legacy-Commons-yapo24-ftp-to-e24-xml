const fs = require('fs');
const XLSX = require('xlsx');
const js2xmlparser = require('js2xmlparser');

// Lee el archivo XLS
const workbook = XLSX.readFile('1482.xls');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convierte los datos del XLS a formato JSON
const data = XLSX.utils.sheet_to_json(worksheet);

let country = 5247;

//Bienes Raíces > Venta > Casas	173
//Bienes Raíces > Venta > Apartamentos	179
//Bienes Raíces > Venta > Edificios	170

const regionMap = [
    {"yapoLabel":"Alhué","e24Label":"Alhué","yapoId":295,"e24ID":5532},
    {"yapoLabel":"Buin","e24Label":"Buin","yapoId":296,"e24ID":5531},
    {"yapoLabel":"Calera de Tango","e24Label":"Calera de Tango","yapoId":297,"e24ID":5530},
    {"yapoLabel":"Cerrillos","e24Label":"Cerrillos","yapoId":298,"e24ID":5529},
    {"yapoLabel":"Cerro Navia","e24Label":"Cerro Navia","yapoId":299,"e24ID":5528},
    {"yapoLabel":"Colina","e24Label":"Colina","yapoId":300,"e24ID":5527},
    {"yapoLabel":"Conchalí","e24Label":"Conchalí","yapoId":301,"e24ID":5526},
    {"yapoLabel":"Curacaví","e24Label":"Curacaví","yapoId":302,"e24ID":5525},
    {"yapoLabel":"El Bosque","e24Label":"El Bosque","yapoId":303,"e24ID":5524},
    {"yapoLabel":"El Monte","e24Label":"El Monte","yapoId":304,"e24ID":5523},
    {"yapoLabel":"Estación Central","e24Label":"Estación Central","yapoId":305,"e24ID":5522},
    {"yapoLabel":"Huechuraba","e24Label":"Huechuraba","yapoId":306,"e24ID":5521},
    {"yapoLabel":"Independencia","e24Label":"Independencia","yapoId":307,"e24ID":5520},
    {"yapoLabel":"Isla de Maipo","e24Label":"Isla de Maipo","yapoId":308,"e24ID":5519},
    {"yapoLabel":"La Cisterna","e24Label":"La Cisterna","yapoId":309,"e24ID":5518},
    {"yapoLabel":"La Florida","e24Label":"La Florida","yapoId":310,"e24ID":5517},
    {"yapoLabel":"La Granja","e24Label":"La Granja","yapoId":311,"e24ID":5516},
    {"yapoLabel":"La Pintana","e24Label":"La Pintana","yapoId":312,"e24ID":5515},
    {"yapoLabel":"La Reina","e24Label":"La Reina","yapoId":313,"e24ID":5514},
    {"yapoLabel":"Lampa","e24Label":"Lampa","yapoId":314,"e24ID":5513},
    {"yapoLabel":"Las Condes","e24Label":"Las Condes","yapoId":315,"e24ID":5512},
    {"yapoLabel":"Lo Barnechea","e24Label":"Lo Barnechea","yapoId":316,"e24ID":5511},
    {"yapoLabel":"Lo Espejo","e24Label":"Lo Espejo","yapoId":317,"e24ID":5510},
    {"yapoLabel":"Lo Prado","e24Label":"Lo Prado","yapoId":318,"e24ID":5509},
    {"yapoLabel":"Macul","e24Label":"Macul","yapoId":319,"e24ID":5508},
    {"yapoLabel":"Maipú","e24Label":"Maipú","yapoId":320,"e24ID":5507},
    {"yapoLabel":"María Pinto","e24Label":"María Pinto","yapoId":321,"e24ID":5506},
    {"yapoLabel":"Melipilla","e24Label":"Melipilla","yapoId":322,"e24ID":5505},
    {"yapoLabel":"Ñuñoa","e24Label":"Ñuñoa","yapoId":323,"e24ID":5481},
    {"yapoLabel":"Padre Hurtado","e24Label":"Padre Hurtado","yapoId":324,"e24ID":5504},
    {"yapoLabel":"Paine","e24Label":"Paine","yapoId":325,"e24ID":5503},
    {"yapoLabel":"Pedro Aguirre Cerda","e24Label":"Pedro Aguirre Cerda","yapoId":326,"e24ID":5502},
    {"yapoLabel":"Peñaflor","e24Label":"Peñaflor","yapoId":327,"e24ID":5501},
    {"yapoLabel":"Peñalolén","e24Label":"Peñalolén","yapoId":328,"e24ID":5500},
    {"yapoLabel":"Pirque","e24Label":"Pirque","yapoId":329,"e24ID":5499},
    {"yapoLabel":"Providencia","e24Label":"Providencia","yapoId":330,"e24ID":5498},
    {"yapoLabel":"Pudahuel","e24Label":"Pudahuel","yapoId":331,"e24ID":5497},
    {"yapoLabel":"Puente Alto","e24Label":"Puente Alto","yapoId":332,"e24ID":5496},
    {"yapoLabel":"Quilicura","e24Label":"Quilicura","yapoId":333,"e24ID":5495},
    {"yapoLabel":"Quinta Normal","e24Label":"Quinta Normal","yapoId":334,"e24ID":5494},
    {"yapoLabel":"Recoleta","e24Label":"Recoleta","yapoId":335,"e24ID":5493},
    {"yapoLabel":"Renca","e24Label":"Renca","yapoId":336,"e24ID":5492},
    {"yapoLabel":"San Bernardo","e24Label":"San Bernardo","yapoId":337,"e24ID":5491},
    {"yapoLabel":"San Joaquín","e24Label":"San Joaquín","yapoId":338,"e24ID":5490},
    {"yapoLabel":"San José de Maipo","e24Label":"San José de Maipo","yapoId":339,"e24ID":5489},
    {"yapoLabel":"San Miguel","e24Label":"San Miguel","yapoId":340,"e24ID":5488},
    {"yapoLabel":"San Pedro","e24Label":"San Pedro","yapoId":341,"e24ID":5487},
    {"yapoLabel":"San Ramón","e24Label":"San Ramón","yapoId":342,"e24ID":5486},
    {"yapoLabel":"Santiago","e24Label":"Santiago","yapoId":343,"e24ID":5485},
    {"yapoLabel":"Talagante","e24Label":"Talagante","yapoId":344,"e24ID":5484},
    {"yapoLabel":"Tiltil","e24Label":"Tiltil","yapoId":345,"e24ID":5483},
    {"yapoLabel":"Vitacura","e24Label":"Vitacura","yapoId":346,"e24ID":5482},
    {"yapoLabel":"Arica","e24Label":"Arica","yapoId":1,"e24ID":5274},
    {"yapoLabel":"Camarones","e24Label":"Camarones","yapoId":2,"e24ID":5273},
    {"yapoLabel":"General Lagos","e24Label":"General Lagos","yapoId":3,"e24ID":5272},
    {"yapoLabel":"Putre","e24Label":"Putre","yapoId":4,"e24ID":5271},
    {"yapoLabel":"Alto Hospicio","e24Label":"Alto Hospicio","yapoId":5,"e24ID":5609},
    {"yapoLabel":"Camiña","e24Label":"Camiña","yapoId":6,"e24ID":5608},
    {"yapoLabel":"Colchane","e24Label":"Colchane","yapoId":7,"e24ID":5607},
    {"yapoLabel":"Huara","e24Label":"Huara","yapoId":8,"e24ID":5606},
    {"yapoLabel":"Iquique","e24Label":"Iquique","yapoId":9,"e24ID":5605},
    {"yapoLabel":"Pica","e24Label":"Pica","yapoId":10,"e24ID":5604},
    {"yapoLabel":"Pozo Almonte","e24Label":"Pozo Almonte","yapoId":11,"e24ID":5603},
    {"yapoLabel":"Antofagasta","e24Label":"Antofagasta","yapoId":12,"e24ID":5601},
    {"yapoLabel":"Calama","e24Label":"Calama","yapoId":13,"e24ID":5600},
    {"yapoLabel":"María Elena","e24Label":"María Elena","yapoId":14,"e24ID":5599},
    {"yapoLabel":"Mejillones","e24Label":"Mejillones","yapoId":15,"e24ID":5598},
    {"yapoLabel":"Ollagüe","e24Label":"Ollagüe","yapoId":16,"e24ID":5597},
    {"yapoLabel":"San Pedro de Atacama","e24Label":"San Pedro de Atacama","yapoId":17,"e24ID":5596},
    {"yapoLabel":"Sierra Gorda","e24Label":"Sierra Gorda","yapoId":18,"e24ID":5595},
    {"yapoLabel":"Taltal","e24Label":"Taltal","yapoId":19,"e24ID":5594},
    {"yapoLabel":"Tocopilla","e24Label":"Tocopilla","yapoId":20,"e24ID":5593},
    {"yapoLabel":"Alto del Carmen","e24Label":"Alto del Carmen","yapoId":21,"e24ID":5591},
    {"yapoLabel":"Caldera","e24Label":"Caldera","yapoId":22,"e24ID":5590},
    {"yapoLabel":"Chañaral","e24Label":"Chañaral","yapoId":23,"e24ID":5589},
    {"yapoLabel":"Copiapó","e24Label":"Copiapó","yapoId":24,"e24ID":5588},
    {"yapoLabel":"Diego de Almagro","e24Label":"Diego de Almagro","yapoId":25,"e24ID":5587},
    {"yapoLabel":"Freirina","e24Label":"Freirina","yapoId":26,"e24ID":5586},
    {"yapoLabel":"Huasco","e24Label":"Huasco","yapoId":27,"e24ID":5585},
    {"yapoLabel":"Tierra Amarilla","e24Label":"Tierra Amarilla","yapoId":28,"e24ID":5584},
    {"yapoLabel":"Vallenar","e24Label":"Vallenar","yapoId":29,"e24ID":5583},
    {"yapoLabel":"Andacollo","e24Label":"Andacollo","yapoId":30,"e24ID":5581},
    {"yapoLabel":"Canela","e24Label":"Canela","yapoId":31,"e24ID":5580},
    {"yapoLabel":"Combarbalá","e24Label":"Combarbalá","yapoId":32,"e24ID":5579},
    {"yapoLabel":"Coquimbo","e24Label":"Coquimbo","yapoId":33,"e24ID":5578},
    {"yapoLabel":"Illapel","e24Label":"Illapel","yapoId":34,"e24ID":5577},
    {"yapoLabel":"La Higuera","e24Label":"La Higuera","yapoId":35,"e24ID":5576},
    {"yapoLabel":"La Serena","e24Label":"La Serena","yapoId":36,"e24ID":5575},
    {"yapoLabel":"Los Vilos","e24Label":"Los Vilos","yapoId":37,"e24ID":5574},
    {"yapoLabel":"Monte Patria","e24Label":"Monte Patria","yapoId":38,"e24ID":5573},
    {"yapoLabel":"Ovalle","e24Label":"Ovalle","yapoId":39,"e24ID":5572},
    {"yapoLabel":"Paiguano","e24Label":"Paiguano","yapoId":40,"e24ID":5571},
    {"yapoLabel":"Punitaqui","e24Label":"Punitaqui","yapoId":41,"e24ID":5570},
    {"yapoLabel":"Río Hurtado","e24Label":"Río Hurtado","yapoId":42,"e24ID":5569},
    {"yapoLabel":"Salamanca","e24Label":"Salamanca","yapoId":43,"e24ID":5568},
    {"yapoLabel":"Vicuña","e24Label":"Vicuña","yapoId":44,"e24ID":5567},
    {"yapoLabel":"Algarrobo","e24Label":"Algarrobo","yapoId":45,"e24ID":5479},
    {"yapoLabel":"Cabildo","e24Label":"Cabildo","yapoId":46,"e24ID":5478},
    {"yapoLabel":"Calera","e24Label":"Calera","yapoId":47,"e24ID":5477},
    {"yapoLabel":"Calle Larga","e24Label":"Calle Larga","yapoId":48,"e24ID":5476},
    {"yapoLabel":"Cartagena","e24Label":"Cartagena","yapoId":49,"e24ID":5475},
    {"yapoLabel":"Casablanca","e24Label":"Casablanca","yapoId":50,"e24ID":5474},
    {"yapoLabel":"Catemu","e24Label":"Catemu","yapoId":51,"e24ID":5473},
    {"yapoLabel":"Concón","e24Label":"Concón","yapoId":52,"e24ID":5472},
    {"yapoLabel":"El Quisco","e24Label":"El Quisco","yapoId":53,"e24ID":5471},
    {"yapoLabel":"El Tabo","e24Label":"El Tabo","yapoId":54,"e24ID":5470},
    {"yapoLabel":"Hijuelas","e24Label":"Hijuelas","yapoId":55,"e24ID":5469},
    {"yapoLabel":"Isla de Pascua","e24Label":"Isla de Pascua","yapoId":56,"e24ID":5468},
    {"yapoLabel":"Juan Fernández","e24Label":"Juan Fernández","yapoId":57,"e24ID":5467},
    {"yapoLabel":"La Cruz","e24Label":"La Cruz","yapoId":58,"e24ID":5466},
    {"yapoLabel":"La Ligua","e24Label":"La Ligua","yapoId":59,"e24ID":5465},
    {"yapoLabel":"Limache","e24Label":"Limache","yapoId":60,"e24ID":5464},
    {"yapoLabel":"Llaillay","e24Label":"Llaillay","yapoId":61,"e24ID":5463},
    {"yapoLabel":"Los Andes","e24Label":"Los Andes","yapoId":62,"e24ID":5462},
    {"yapoLabel":"Nogales","e24Label":"Nogales","yapoId":63,"e24ID":5461},
    {"yapoLabel":"Olmué","e24Label":"Olmué","yapoId":64,"e24ID":5460},
    {"yapoLabel":"Panquehue","e24Label":"Panquehue","yapoId":65,"e24ID":5459},
    {"yapoLabel":"Papudo","e24Label":"Papudo","yapoId":66,"e24ID":5458},
    {"yapoLabel":"Petorca","e24Label":"Petorca","yapoId":67,"e24ID":5457},
    {"yapoLabel":"Puchuncaví","e24Label":"Puchuncaví","yapoId":68,"e24ID":5456},
    {"yapoLabel":"Putaendo","e24Label":"Putaendo","yapoId":69,"e24ID":5455},
    {"yapoLabel":"Quillota","e24Label":"Quillota","yapoId":70,"e24ID":5454},
    {"yapoLabel":"Quilpué","e24Label":"Quilpué","yapoId":71,"e24ID":5453},
    {"yapoLabel":"Quintero","e24Label":"Quintero","yapoId":72,"e24ID":5452},
    {"yapoLabel":"Rinconada","e24Label":"Rinconada","yapoId":73,"e24ID":5451},
    {"yapoLabel":"San Antonio","e24Label":"San Antonio","yapoId":74,"e24ID":5450},
    {"yapoLabel":"San Esteban","e24Label":"San Esteban","yapoId":75,"e24ID":5449},
    {"yapoLabel":"San Felipe","e24Label":"San Felipe","yapoId":76,"e24ID":5448},
    {"yapoLabel":"Santa María","e24Label":"Santa María","yapoId":77,"e24ID":5447},
    {"yapoLabel":"Santo Domingo","e24Label":"Santo Domingo","yapoId":78,"e24ID":5446},
    {"yapoLabel":"Valparaíso","e24Label":"Valparaíso","yapoId":79,"e24ID":5445},
    {"yapoLabel":"Villa Alemana","e24Label":"Villa Alemana","yapoId":80,"e24ID":5444},
    {"yapoLabel":"Viña del Mar","e24Label":"Viña del Mar","yapoId":81,"e24ID":5443},
    {"yapoLabel":"Zapallar","e24Label":"Zapallar","yapoId":82,"e24ID":5442},
    {"yapoLabel":"Chépica","e24Label":"Chépica","yapoId":83,"e24ID":5439},
    {"yapoLabel":"Chimbarongo","e24Label":"Chimbarongo","yapoId":84,"e24ID":5440},
    {"yapoLabel":"Codegua","e24Label":"Codegua","yapoId":85,"e24ID":5438},
    {"yapoLabel":"Coinco","e24Label":"Coinco","yapoId":86,"e24ID":5437},
    {"yapoLabel":"Coltauco","e24Label":"Coltauco","yapoId":87,"e24ID":5436},
    {"yapoLabel":"Doñihue","e24Label":"Doñihue","yapoId":88,"e24ID":5435},
    {"yapoLabel":"Graneros","e24Label":"Graneros","yapoId":89,"e24ID":5434},
    {"yapoLabel":"La Estrella","e24Label":"La Estrella","yapoId":90,"e24ID":5433},
    {"yapoLabel":"Las Cabras","e24Label":"Las Cabras","yapoId":91,"e24ID":5432},
    {"yapoLabel":"Litueche","e24Label":"Litueche","yapoId":92,"e24ID":5431},
    {"yapoLabel":"Lolol","e24Label":"Lolol","yapoId":93,"e24ID":5430},
    {"yapoLabel":"Machalí","e24Label":"Machalí","yapoId":94,"e24ID":5429},
    {"yapoLabel":"Malloa","e24Label":"Malloa","yapoId":95,"e24ID":5428},
    {"yapoLabel":"Marchihue","e24Label":"Marchihue","yapoId":96,"e24ID":5427},
    {"yapoLabel":"Mostazal","e24Label":"Mostazal","yapoId":97,"e24ID":5426},
    {"yapoLabel":"Nancagua","e24Label":"Nancagua","yapoId":98,"e24ID":5425},
    {"yapoLabel":"Navidad","e24Label":"Navidad","yapoId":99,"e24ID":5424},
    {"yapoLabel":"Olivar","e24Label":"Olivar","yapoId":100,"e24ID":5423},
    {"yapoLabel":"Palmilla","e24Label":"Palmilla","yapoId":101,"e24ID":5422},
    {"yapoLabel":"Paredones","e24Label":"Paredones","yapoId":102,"e24ID":5421},
    {"yapoLabel":"Peralillo","e24Label":"Peralillo","yapoId":103,"e24ID":5420},
    {"yapoLabel":"Peumo","e24Label":"Peumo","yapoId":104,"e24ID":5419},
    {"yapoLabel":"Pichidegua","e24Label":"Pichidegua","yapoId":105,"e24ID":5418},
    {"yapoLabel":"Pichilemu","e24Label":"Pichilemu","yapoId":106,"e24ID":5417},
    {"yapoLabel":"Placilla","e24Label":"Placilla","yapoId":107,"e24ID":5416},
    {"yapoLabel":"Pumanque","e24Label":"Pumanque","yapoId":108,"e24ID":5415},
    {"yapoLabel":"Quinta de Tilcoco","e24Label":"Quinta de Tilcoco","yapoId":109,"e24ID":5414},
    {"yapoLabel":"Rancagua","e24Label":"Rancagua","yapoId":110,"e24ID":5413},
    {"yapoLabel":"Rengo","e24Label":"Rengo","yapoId":111,"e24ID":5412},
    {"yapoLabel":"Requínoa","e24Label":"Requínoa","yapoId":112,"e24ID":5411},
    {"yapoLabel":"San Fernando","e24Label":"San Fernando","yapoId":113,"e24ID":5410},
    {"yapoLabel":"San Vicente","e24Label":"San Vicente","yapoId":114,"e24ID":5409},
    {"yapoLabel":"Santa Cruz","e24Label":"Santa Cruz","yapoId":115,"e24ID":5408},
    {"yapoLabel":"Cauquenes","e24Label":"Cauquenes","yapoId":116,"e24ID":5406},
    {"yapoLabel":"Chanco","e24Label":"Chanco","yapoId":117,"e24ID":5405},
    {"yapoLabel":"Colbún","e24Label":"Colbún","yapoId":118,"e24ID":5404},
    {"yapoLabel":"Constitución","e24Label":"Constitución","yapoId":119,"e24ID":5403},
    {"yapoLabel":"Curepto","e24Label":"Curepto","yapoId":120,"e24ID":5402},
    {"yapoLabel":"Curicó","e24Label":"Curicó","yapoId":121,"e24ID":5401},
    {"yapoLabel":"Empedrado","e24Label":"Empedrado","yapoId":122,"e24ID":5400},
    {"yapoLabel":"Hualañé","e24Label":"Hualañé","yapoId":123,"e24ID":5399},
    {"yapoLabel":"Licantén","e24Label":"Licantén","yapoId":124,"e24ID":5398},
    {"yapoLabel":"Linares","e24Label":"Linares","yapoId":125,"e24ID":5397},
    {"yapoLabel":"Longaví","e24Label":"Longaví","yapoId":126,"e24ID":5396},
    {"yapoLabel":"Maule","e24Label":"Maule","yapoId":127,"e24ID":5395},
    {"yapoLabel":"Molina","e24Label":"Molina","yapoId":128,"e24ID":5394},
    {"yapoLabel":"Parral","e24Label":"Parral","yapoId":129,"e24ID":5393},
    {"yapoLabel":"Pelarco","e24Label":"Pelarco","yapoId":130,"e24ID":5392},
    {"yapoLabel":"Pelluhue","e24Label":"Pelluhue","yapoId":131,"e24ID":5391},
    {"yapoLabel":"Pencahue","e24Label":"Pencahue","yapoId":132,"e24ID":5390},
    {"yapoLabel":"Rauco","e24Label":"Rauco","yapoId":133,"e24ID":5389},
    {"yapoLabel":"Retiro","e24Label":"Retiro","yapoId":134,"e24ID":5388},
    {"yapoLabel":"Río Claro","e24Label":"Río Claro","yapoId":135,"e24ID":5386},
    {"yapoLabel":"Romeral","e24Label":"Romeral","yapoId":136,"e24ID":5387},
    {"yapoLabel":"Sagrada Familia","e24Label":"Sagrada Familia","yapoId":137,"e24ID":5385},
    {"yapoLabel":"San Clemente","e24Label":"San Clemente","yapoId":138,"e24ID":5384},
    {"yapoLabel":"San Javier","e24Label":"San Javier","yapoId":139,"e24ID":5383},
    {"yapoLabel":"San Rafael","e24Label":"San Rafael","yapoId":140,"e24ID":5382},
    {"yapoLabel":"Talca","e24Label":"Talca","yapoId":141,"e24ID":5381},
    {"yapoLabel":"Teno","e24Label":"Teno","yapoId":142,"e24ID":5380},
    {"yapoLabel":"Vichuquén","e24Label":"Vichuquén","yapoId":143,"e24ID":5379},
    {"yapoLabel":"Villa Alegre","e24Label":"Villa Alegre","yapoId":144,"e24ID":5378},
    {"yapoLabel":"Yerbas Buenas","e24Label":"Yerbas Buenas","yapoId":145,"e24ID":5377},
    {"yapoLabel":"Bulnes","e24Label":"Bulnes","yapoId":149,"e24ID":5269},
    {"yapoLabel":"Chillán","e24Label":"Chillán","yapoId":153,"e24ID":5268},
    {"yapoLabel":"Chillán Viejo","e24Label":"Chillán Viejo","yapoId":154,"e24ID":5267},
    {"yapoLabel":"Cobquecura","e24Label":"Cobquecura","yapoId":155,"e24ID":5266},
    {"yapoLabel":"Coelemu","e24Label":"Coelemu","yapoId":156,"e24ID":5265},
    {"yapoLabel":"Coihueco","e24Label":"Coihueco","yapoId":157,"e24ID":5264},
    {"yapoLabel":"El Carmen","e24Label":"El Carmen","yapoId":162,"e24ID":5263},
    {"yapoLabel":"Ninhue","e24Label":"Ninhue","yapoId":174,"e24ID":5262},
    {"yapoLabel":"Ñiquén","e24Label":"Ñiquén","yapoId":175,"e24ID":5249},
    {"yapoLabel":"Pemuco","e24Label":"Pemuco","yapoId":176,"e24ID":5261},
    {"yapoLabel":"Pinto","e24Label":"Pinto","yapoId":178,"e24ID":5260},
    {"yapoLabel":"Portezuelo","e24Label":"Portezuelo","yapoId":179,"e24ID":5259},
    {"yapoLabel":"Quillón","e24Label":"Quillón","yapoId":182,"e24ID":5258},
    {"yapoLabel":"Quirihue","e24Label":"Quirihue","yapoId":183,"e24ID":5257},
    {"yapoLabel":"Ránquil","e24Label":"Ránquil","yapoId":184,"e24ID":5256},
    {"yapoLabel":"San Carlos","e24Label":"San Carlos","yapoId":185,"e24ID":5255},
    {"yapoLabel":"San Fabián","e24Label":"San Fabián","yapoId":186,"e24ID":5254},
    {"yapoLabel":"San Ignacio","e24Label":"San Ignacio","yapoId":187,"e24ID":5253},
    {"yapoLabel":"San Nicolás","e24Label":"San Nicolás","yapoId":188,"e24ID":5252},
    {"yapoLabel":"Treguaco","e24Label":"Treguaco","yapoId":196,"e24ID":5251},
    {"yapoLabel":"Yungay","e24Label":"Yungay","yapoId":199,"e24ID":5250},
    {"yapoLabel":"Alto Bío-Bío","e24Label":"Alto Bío-Bío","yapoId":146,"e24ID":5375},
    {"yapoLabel":"Antuco","e24Label":"Antuco","yapoId":147,"e24ID":5374},
    {"yapoLabel":"Arauco","e24Label":"Arauco","yapoId":148,"e24ID":5373},
    {"yapoLabel":"Cabrero","e24Label":"Cabrero","yapoId":150,"e24ID":5372},
    {"yapoLabel":"Cañete","e24Label":"Cañete","yapoId":151,"e24ID":5371},
    {"yapoLabel":"Chiguayante","e24Label":"Chiguayante","yapoId":152,"e24ID":5370},
    {"yapoLabel":"Concepción","e24Label":"Concepción","yapoId":158,"e24ID":5369},
    {"yapoLabel":"Contulmo","e24Label":"Contulmo","yapoId":159,"e24ID":5368},
    {"yapoLabel":"Coronel","e24Label":"Coronel","yapoId":160,"e24ID":5367},
    {"yapoLabel":"Curanilahue","e24Label":"Curanilahue","yapoId":161,"e24ID":5366},
    {"yapoLabel":"Florida","e24Label":"Florida","yapoId":163,"e24ID":5365},
    {"yapoLabel":"Hualpén","e24Label":"Hualpén","yapoId":164,"e24ID":5364},
    {"yapoLabel":"Hualqui","e24Label":"Hualqui","yapoId":165,"e24ID":5363},
    {"yapoLabel":"Laja","e24Label":"Laja","yapoId":166,"e24ID":5362},
    {"yapoLabel":"Lebu","e24Label":"Lebu","yapoId":167,"e24ID":5361},
    {"yapoLabel":"Los Álamos","e24Label":"Los Álamos","yapoId":168,"e24ID":5360},
    {"yapoLabel":"Los Ángeles","e24Label":"Los Ángeles","yapoId":169,"e24ID":5359},
    {"yapoLabel":"Lota","e24Label":"Lota","yapoId":170,"e24ID":5358},
    {"yapoLabel":"Mulchén","e24Label":"Mulchén","yapoId":171,"e24ID":5357},
    {"yapoLabel":"Nacimiento","e24Label":"Nacimiento","yapoId":172,"e24ID":5356},
    {"yapoLabel":"Negrete","e24Label":"Negrete","yapoId":173,"e24ID":5355},
    {"yapoLabel":"Penco","e24Label":"Penco","yapoId":177,"e24ID":5354},
    {"yapoLabel":"Quilaco","e24Label":"Quilaco","yapoId":180,"e24ID":5353},
    {"yapoLabel":"Quilleco","e24Label":"Quilleco","yapoId":181,"e24ID":5352},
    {"yapoLabel":"San Pedro de la Paz","e24Label":"San Pedro de la Paz","yapoId":189,"e24ID":5351},
    {"yapoLabel":"San Rosendo","e24Label":"San Rosendo","yapoId":190,"e24ID":5350},
    {"yapoLabel":"Santa Bárbara","e24Label":"Santa Bárbara","yapoId":191,"e24ID":5349},
    {"yapoLabel":"Santa Juana","e24Label":"Santa Juana","yapoId":192,"e24ID":5348},
    {"yapoLabel":"Talcahuano","e24Label":"Talcahuano","yapoId":193,"e24ID":5347},
    {"yapoLabel":"Tirúa","e24Label":"Tirúa","yapoId":194,"e24ID":5346},
    {"yapoLabel":"Tomé","e24Label":"Tomé","yapoId":195,"e24ID":5345},
    {"yapoLabel":"Tucapel","e24Label":"Tucapel","yapoId":197,"e24ID":5344},
    {"yapoLabel":"Yumbel","e24Label":"Yumbel","yapoId":198,"e24ID":5343},
    {"yapoLabel":"Angol","e24Label":"Angol","yapoId":200,"e24ID":5565},
    {"yapoLabel":"Carahue","e24Label":"Carahue","yapoId":201,"e24ID":5564},
    {"yapoLabel":"Cholchol","e24Label":"Cholchol","yapoId":202,"e24ID":5563},
    {"yapoLabel":"Collipulli","e24Label":"Collipulli","yapoId":203,"e24ID":5562},
    {"yapoLabel":"Cunco","e24Label":"Cunco","yapoId":204,"e24ID":5561},
    {"yapoLabel":"Curacautín","e24Label":"Curacautín","yapoId":205,"e24ID":5560},
    {"yapoLabel":"Curarrehue","e24Label":"Curarrehue","yapoId":206,"e24ID":5559},
    {"yapoLabel":"Ercilla","e24Label":"Ercilla","yapoId":207,"e24ID":5558},
    {"yapoLabel":"Freire","e24Label":"Freire","yapoId":208,"e24ID":5557},
    {"yapoLabel":"Galvarino","e24Label":"Galvarino","yapoId":209,"e24ID":5556},
    {"yapoLabel":"Gorbea","e24Label":"Gorbea","yapoId":210,"e24ID":5555},
    {"yapoLabel":"Lautaro","e24Label":"Lautaro","yapoId":211,"e24ID":5554},
    {"yapoLabel":"Loncoche","e24Label":"Loncoche","yapoId":212,"e24ID":5553},
    {"yapoLabel":"Lonquimay","e24Label":"Lonquimay","yapoId":213,"e24ID":5552},
    {"yapoLabel":"Los Sauces","e24Label":"Los Sauces","yapoId":214,"e24ID":5551},
    {"yapoLabel":"Lumaco","e24Label":"Lumaco","yapoId":215,"e24ID":5550},
    {"yapoLabel":"Melipeuco","e24Label":"Melipeuco","yapoId":216,"e24ID":5549},
    {"yapoLabel":"Nueva Imperial","e24Label":"Nueva Imperial","yapoId":217,"e24ID":5548},
    {"yapoLabel":"Padre las Casas","e24Label":"Padre las Casas","yapoId":218,"e24ID":5547},
    {"yapoLabel":"Perquenco","e24Label":"Perquenco","yapoId":219,"e24ID":5546},
    {"yapoLabel":"Pitrufquén","e24Label":"Pitrufquén","yapoId":220,"e24ID":5545},
    {"yapoLabel":"Pucón","e24Label":"Pucón","yapoId":221,"e24ID":5544},
    {"yapoLabel":"Purén","e24Label":"Purén","yapoId":222,"e24ID":5543},
    {"yapoLabel":"Renaico","e24Label":"Renaico","yapoId":223,"e24ID":5542},
    {"yapoLabel":"Saavedra","e24Label":"Saavedra","yapoId":224,"e24ID":5541},
    {"yapoLabel":"Temuco","e24Label":"Temuco","yapoId":225,"e24ID":5540},
    {"yapoLabel":"Teodoro Schmidt","e24Label":"Teodoro Schmidt","yapoId":226,"e24ID":5539},
    {"yapoLabel":"Toltén","e24Label":"Toltén","yapoId":227,"e24ID":5538},
    {"yapoLabel":"Traiguén","e24Label":"Traiguén","yapoId":228,"e24ID":5537},
    {"yapoLabel":"Victoria","e24Label":"Victoria","yapoId":229,"e24ID":5536},
    {"yapoLabel":"Vilcún","e24Label":"Vilcún","yapoId":230,"e24ID":5535},
    {"yapoLabel":"Villarrica","e24Label":"Villarrica","yapoId":231,"e24ID":5534},
    {"yapoLabel":"Corral","e24Label":"Corral","yapoId":232,"e24ID":5287},
    {"yapoLabel":"Futrono","e24Label":"Futrono","yapoId":233,"e24ID":5286},
    {"yapoLabel":"La Unión","e24Label":"La Unión","yapoId":234,"e24ID":5285},
    {"yapoLabel":"Lago Ranco","e24Label":"Lago Ranco","yapoId":235,"e24ID":5284},
    {"yapoLabel":"Lanco","e24Label":"Lanco","yapoId":236,"e24ID":5283},
    {"yapoLabel":"Los Lagos","e24Label":"Los Lagos","yapoId":237,"e24ID":5282},
    {"yapoLabel":"Máfil","e24Label":"Máfil","yapoId":238,"e24ID":5280},
    {"yapoLabel":"Mariquina","e24Label":"Mariquina","yapoId":239,"e24ID":5281},
    {"yapoLabel":"Paillaco","e24Label":"Paillaco","yapoId":240,"e24ID":5279},
    {"yapoLabel":"Panguipulli","e24Label":"Panguipulli","yapoId":241,"e24ID":5278},
    {"yapoLabel":"Río Bueno","e24Label":"Río Bueno","yapoId":242,"e24ID":5277},
    {"yapoLabel":"Valdivia","e24Label":"Valdivia","yapoId":243,"e24ID":5276},
    {"yapoLabel":"Ancud","e24Label":"Ancud","yapoId":244,"e24ID":5341},
    {"yapoLabel":"Calbuco","e24Label":"Calbuco","yapoId":245,"e24ID":5340},
    {"yapoLabel":"Castro","e24Label":"Castro","yapoId":246,"e24ID":5339},
    {"yapoLabel":"Chaitén","e24Label":"Chaitén","yapoId":247,"e24ID":5338},
    {"yapoLabel":"Chonchi","e24Label":"Chonchi","yapoId":248,"e24ID":5337},
    {"yapoLabel":"Cochamó","e24Label":"Cochamó","yapoId":249,"e24ID":5336},
    {"yapoLabel":"Curaco de Vélez","e24Label":"Curaco de Vélez","yapoId":250,"e24ID":5335},
    {"yapoLabel":"Dalcahue","e24Label":"Dalcahue","yapoId":251,"e24ID":5334},
    {"yapoLabel":"Fresia","e24Label":"Fresia","yapoId":252,"e24ID":5333},
    {"yapoLabel":"Frutillar","e24Label":"Frutillar","yapoId":253,"e24ID":5332},
    {"yapoLabel":"Futaleufú","e24Label":"Futaleufú","yapoId":254,"e24ID":5331},
    {"yapoLabel":"Hualaihué","e24Label":"Hualaihué","yapoId":255,"e24ID":5330},
    {"yapoLabel":"Llanquihue","e24Label":"Llanquihue","yapoId":256,"e24ID":5329},
    {"yapoLabel":"Los Muermos","e24Label":"Los Muermos","yapoId":257,"e24ID":5328},
    {"yapoLabel":"Maullín","e24Label":"Maullín","yapoId":258,"e24ID":5327},
    {"yapoLabel":"Osorno","e24Label":"Osorno","yapoId":259,"e24ID":5326},
    {"yapoLabel":"Palena","e24Label":"Palena","yapoId":260,"e24ID":5325},
    {"yapoLabel":"Puerto Montt","e24Label":"Puerto Montt","yapoId":261,"e24ID":5324},
    {"yapoLabel":"Puerto Octay","e24Label":"Puerto Octay","yapoId":262,"e24ID":5323},
    {"yapoLabel":"Puerto Varas","e24Label":"Puerto Varas","yapoId":263,"e24ID":5322},
    {"yapoLabel":"Puqueldón","e24Label":"Puqueldón","yapoId":264,"e24ID":5321},
    {"yapoLabel":"Purranque","e24Label":"Purranque","yapoId":265,"e24ID":5320},
    {"yapoLabel":"Puyehue","e24Label":"Puyehue","yapoId":266,"e24ID":5319},
    {"yapoLabel":"Queilén","e24Label":"Queilén","yapoId":267,"e24ID":5318},
    {"yapoLabel":"Quellón","e24Label":"Quellón","yapoId":268,"e24ID":5317},
    {"yapoLabel":"Quemchi","e24Label":"Quemchi","yapoId":269,"e24ID":5316},
    {"yapoLabel":"Quinchao","e24Label":"Quinchao","yapoId":270,"e24ID":5315},
    {"yapoLabel":"Río Negro","e24Label":"Río Negro","yapoId":271,"e24ID":5314},
    {"yapoLabel":"San Juan de La Costa","e24Label":"San Juan de La Costa","yapoId":272,"e24ID":5313},
    {"yapoLabel":"San Pablo","e24Label":"San Pablo","yapoId":273,"e24ID":5312},
    {"yapoLabel":"Aysen","e24Label":"Aysen","yapoId":274,"e24ID":5310},
    {"yapoLabel":"Chile Chico","e24Label":"Chile Chico","yapoId":275,"e24ID":5309},
    {"yapoLabel":"Cisnes","e24Label":"Cisnes","yapoId":276,"e24ID":5308},
    {"yapoLabel":"Cochrane","e24Label":"Cochrane","yapoId":277,"e24ID":5307},
    {"yapoLabel":"Coyhaique","e24Label":"Coyhaique","yapoId":278,"e24ID":5306},
    {"yapoLabel":"Guaitecas","e24Label":"Guaitecas","yapoId":279,"e24ID":5305},
    {"yapoLabel":"Lago Verde","e24Label":"Lago Verde","yapoId":280,"e24ID":5304},
    {"yapoLabel":"O'Higgins","e24Label":"O'Higgins","yapoId":281,"e24ID":5303},
    {"yapoLabel":"Río Ibáñez","e24Label":"Río Ibáñez","yapoId":282,"e24ID":5302},
    {"yapoLabel":"Tortel","e24Label":"Tortel","yapoId":283,"e24ID":5301},
    {"yapoLabel":"Antártica","e24Label":"Antártica","yapoId":284,"e24ID":5299},
    {"yapoLabel":"Cabo de Hornos","e24Label":"Cabo de Hornos","yapoId":285,"e24ID":5298},
    {"yapoLabel":"Laguna Blanca","e24Label":"Laguna Blanca","yapoId":286,"e24ID":5297},
    {"yapoLabel":"Natales","e24Label":"Natales","yapoId":287,"e24ID":5296},
    {"yapoLabel":"Porvenir","e24Label":"Porvenir","yapoId":288,"e24ID":5295},
    {"yapoLabel":"Primavera","e24Label":"Primavera","yapoId":289,"e24ID":5294},
    {"yapoLabel":"Punta Arenas","e24Label":"Punta Arenas","yapoId":290,"e24ID":5293},
    {"yapoLabel":"Río Verde","e24Label":"Río Verde","yapoId":291,"e24ID":5292},
    {"yapoLabel":"San Gregorio","e24Label":"San Gregorio","yapoId":292,"e24ID":5291},
    {"yapoLabel":"Timaukel","e24Label":"Timaukel","yapoId":293,"e24ID":5290},
    {"yapoLabel":"Torres del Paine","e24Label":"Torres del Paine","yapoId":294,"e24ID":5289},
]

function findCategoryValue(categories, regex, tipo) {
    for (const category of categories.value) {
        if (regex && category.regex && new RegExp(regex).test(category.regex)) {
            for (const value of category.values) {
                if (value.tipo === tipo) {
                    return value.value;
                }
            }
        }
    }
    return null;
}


let categories = {
    "target": "category",
    "value": [
        {
            "category": 1220,
            "regex": "^Venta$",
            values : [
                {
                    tipo : "Departamento",
                    value : 179
                }
            ]

        },
        {
            "category": 1220,
            "regex": "^Vendo$",
        },
        {
            "category": 1240,
            "regex": "^Arriendo$",
        },
        {
            "category": 1220,
            "regex": "^VENTA$",
        },
        {
            "category": 1240,
            "regex": "^ARRIENDO$",
        },
        {
            "category": 1260,
            "regex": "^Arriendo de temporada$"
        },
        {
            "category": 1260,
            "regex": "^Arriendo de Temporada$"
        },
        {
            "category": 1260,
            "regex": "^ARRIENDO DE TEMPORADA$",
        }
    ]
}

// Toma solo el primer registro de los datos
const firstRecord = data[3];

//sourceid: 84418: add/update: field errors: currency: is a required field and is empty,
// price: is a required field and is empty, rooms: is a required field and is empty,
// bath: is a required field and is empty, square: is a required field and is empty,
//parking: is a required field and is empty, advertiser: is a required field and is empty


console.log(firstRecord)
// Crea el objeto XML solo para el primer registro
const xmlObject = {
    settings: {
      type: 'property' ,
      language: 'es' 
    },
    items: {
      item: {
        required: {
          ad: {
            sourceid: firstRecord.CODIGO ,
            countryid: country ,
            categoryid: findCategoryValue(categories,firstRecord.OBJETIVO,firstRecord.TIPO)  ,
            regionid: regionMap.find(x => x.yapoLabel == firstRecord.COMUNA).e24ID ,
            type: 'property' ,
            title: "VENTA DE DEPARTAMENTO", 
            currency : "CLF",
            price : firstRecord.VALOR,
            rooms : firstRecord.DORMITORIOS,
            bath : firstRecord['BAÑOS'],
            square: firstRecord['MT2 CONST'],
            parking : 0,
            advertiser : 'Propietario'

        },
            contact: {
                email:  "johao.rosas@yapo.cl" ,
                phone: "999999999" ,
                contact:  "Johao" ,
                city: "Santiago" 
              }},
            optional : {
                ad : {
                desc : firstRecord.OBSERVACIONES,
                picture :  firstRecord.IMAGEN1 ,
                picture :  firstRecord.IMAGEN2 ,
                picture :  firstRecord.IMAGEN3 ,
                picture :  firstRecord.IMAGEN4 ,
            }
            } 
            
            // Agrega aquí los demás campos ad requeridos
          

        }
    }
}
       /* optional: {
          ad: {
            title1: firstRecord.title1 },
            descr: firstRecord.descr },
            // Agrega aquí los demás campos ad opcionales
          },
          contact: {
            company: firstRecord.company },
            phone2: firstRecord.phone2 },
            // Agrega aquí los demás campos contact opcionales
          }
        },*/
        // Agrega aquí los demás campos del item según sea necesario


// Convierte el objeto XML a texto
const xml = js2xmlparser.parse('import', xmlObject, {
  declaration: { encoding: 'UTF-8' }
});

// Escribe el XML en un archivo
fs.writeFileSync('output.xml', xml);