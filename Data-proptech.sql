INSERT INTO proptech.agentes (customerName,nombre,email,contrasena,imagen) VALUES
	 ('','Franco','franmuzio@gmail.com','$2a$10$SjSWY6HiOQJaB3kc3CCkAemwGwLTEGJQpbQ68FFf4VL498oBFd60W','1623188874004_img.png'),
	 ('','Lukas','lukaszurdo@gmail.com','$2a$10$ntK2wLBQpUM15TH2JVrcE.OFZHl.FkqHej5ErnN.dhSaISdZVh/9.','1623189006056_img.jpg'),
	 ('','Gonzalo','gonzalopardo@gmail.com','$2a$10$fv3XnMHEKdCnhXWqev792uwlGMghHLrodKqadPZuVoIyW6ZmCnRSu','1623189410641_img.jpg');
	 
INSERT INTO proptech.users (nombre,email,contrasena,imagen) VALUES
	 ('Lucas','lucasquilmes@gmail.com','$2a$10$IesW.ow.rF13pQBk0yd/Hu5U/ZF6p2IuLe3y5dzER99YVZuTpn6i6','1623189071203_img.jpg');
	 
INSERT INTO proptech.reservas (propiedadId,precioDeReserva,status,userId) VALUES
	 (16,60000,'rechazado',2);
	 
INSERT INTO proptech.propiedades (name,direccion,agenteId,precio,descripcion,antiguedad,superficieCubierta,superficieDescubierta,banios,cocheras,dormitorios,ambientes,barrio,destacado,reservado,precioDeReserva,image) VALUES
	 ('Garcia','Garcia',3,50000,'Amplio monoambiente con balcon dando a la avenida ',5,40,5,50,0,1,1,'Saavedra',0,0,NULL,'products/1623186977810.jpg'),
	 ('Manuel','Manuel',4,60000,'Departamento monoambiente',3,50,0,1,0,1,2,'Chacarita',0,0,NULL,'products/1623187291877.jpg'),
	 ('Manuel porcel','Manuel porcel 868',5,60000,'Monoambiente mediano',3,60,0,1,0,1,2,'Versalles',1,0,NULL,'products/1623188513764.jpg'),
	 ('Garcia del rio ','Garcia del rio 2895',3,50000,'Amplio monoambiente con balcon dando a la avenida ',5,40,5,1,0,1,1,'Saavedra',0,0,NULL,'products/1623186977810.jpg'),
	 ('Manuel porcel','Manuel porcel 868',4,60000,'Departamento monoambiente',3,50,0,1,0,1,2,'Versalles',0,0,NULL,'products/1623187291877.jpg'),
	 ('Manuel porcel','Manuel porcel 868',5,60000,'Monoambiente mediano',3,60,0,1,0,1,2,'Versalles',0,0,NULL,'products/1623188513764.jpg'),
	 ('Garcia del rio ','Garcia del rio 2895',3,50000,'Amplio monoambiente con balcon dando a la avenida ',5,40,5,1,0,1,1,'Saavedra',0,0,50000,'products/1623186977810.jpg'),
	 ('Manuel porcel','Manuel porcel 868',4,60000,'Departamento monoambiente',3,50,0,1,0,1,2,'Versalles',0,0,60000,'products/1623187291877.jpg'),
	 ('Manuel porcel','Manuel porcel 868',5,60000,'Monoambiente mediano',3,60,0,1,0,1,2,'Versalles',0,0,NULL,'products/1623188513764.jpg'),
	 ('Garcia del rio ','Garcia del rio 2895',3,50000,'Amplio monoambiente con balcon dando a la avenida ',5,40,5,1,0,1,1,'Saavedra',0,0,NULL,'products/1623186977810.jpg');
INSERT INTO proptech.propiedades (name,direccion,agenteId,precio,descripcion,antiguedad,superficieCubierta,superficieDescubierta,banios,cocheras,dormitorios,ambientes,barrio,destacado,reservado,precioDeReserva,image) VALUES
	 ('Manuel porcel','Manuel porcel 868',4,60000,'Departamento monoambiente',3,50,0,1,0,1,2,'Versalles',0,0,NULL,'products/1623187291877.jpg'),
	 ('Manuel porcel','Manuel porcel 868',5,60000,'Monoambiente mediano',3,60,0,1,0,1,2,'Versalles',0,0,NULL,'products/1623188513764.jpg'),
	 ('Garcia del rio ','Garcia del rio 2895',3,50000,'Amplio monoambiente con balcon dando a la avenida ',5,40,5,1,0,1,1,'Saavedra',0,0,NULL,'products/1623186977810.jpg'),
	 ('Manuel porcel','Manuel porcel 868',4,60000,'Departamento monoambiente',3,50,0,1,0,1,2,'Versalles',0,0,NULL,'products/1623187291877.jpg'),
	 ('Manuel porcel','Manuel porcel 868',5,60000,'Monoambiente mediano',3,60,0,1,0,1,2,'Versalles',0,0,NULL,'products/1623188513764.jpg');