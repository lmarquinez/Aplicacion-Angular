### CRM USERS

1 - Crear un interface para User. ✅

      id?: number;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      image: string;

2 - Crear un servicio para Users. ✅ 

      - Añadir HttpClientModule en app.module.ts
      - Constructor HttpClient y metodo getAll()

3 - Crear los componentes necesarios. ✅ 

      1 - header
      2 - form
      3 - footer
      4 - error404 
      5 - user-card
      6 - user-list
      7 - user-view

4 - Crear las rutas. ✅ 

      1 - /home               - UserListComponent
      2 - /user/:iduser       - UserViewComponent
      3 - /new-user           - FormComponent
      4 - /update/:iduser     - FormComponent
      5 - /**                 - Error404Component

5 - Crear una maquetación responsive con bootstrap de header y footer, colocar los componentes trasversales. Y hacer funcionar la navegacion del menu. ✅ 

6 - En el componente UserListComponent hacer una peticion al servicio y traerse los usuarios. Hacer una paginación. ✅ 

7- Pintar los usuarios, con el componente UserCardComponent.  

8 - Pintar el usuario en la vista de UserViewComponent, recoger el parametro activo de la ruta es decir el id y hacer un consulta al servicios con ese id para obtener el usuario.

9 - Crear formulario para crear nuevos usuarios.

10 - Borrar usuarios

11 - Actualizar usuarios.