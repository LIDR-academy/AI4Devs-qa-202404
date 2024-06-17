# Generacion de pruebas con Cypress

## Contexto

### eres un brilante ingeniero de pruebas, revisa este proyecto y genera un breve resumen del mismo

### genera la lista de funcionalidades disponibles en  @frontend 

### ok, vamos enfocarnos solamente en la funcionalidad 3. Ver Posiciones.

¿de acuerdo? 

### Se necesita crear las pruebas E2E para la interfaz "position" usando cypress.

sugiereme la lista de pruebas E2E que se deberían hacer.

Solo genera la lista, no generes las pruebas aún.


## Pruebas de la pagina de posiciones

### ok, vamos a enfocarnos solamente en la funcionalidad  1. Carga de la Página de Posiciones.

En esta prueba E2E se requiere verificar lo siguiente:

1. El título de la posición se muestra correctamente.
2. Se muestran las columnas correspondientes a cada fase del proceso de contratación.
3. Las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

Antes de comenzar, hazme las preguntas que necesites. No diseñes las pruebas aún.

** Preguntas Previas **
1. ¿Hay algún dato específico que deba estar presente en la base de datos para realizar estas pruebas?
2. ¿Existen restricciones de acceso que debamos considerar (por ejemplo, autenticación)?
3. ¿Hay algún estado inicial específico que deba configurarse antes de ejecutar las pruebas?

Con esta información, podremos proceder a diseñar las pruebas E2E de manera efectiva.

### Respuestas
1. Si, al ejecutar el endPoint /positions/id se obtiene:
- Nombre de la posición.
- Fases del flujo de selección.
- Lista de candidatos que se encuentran en cada fase del flujo.
- Datos de cada candidato con su puntaje promedio.

2. No.

3. No.

### para cy.get('[data-testid="fase-2"]') se necesita validar que contenga dos candidatos: 
1. John Doe
2. Jane Smith

Aplica los ajustes porque actualmente solo se valida que contanga un candidato

### ahora ajusta cy.get('[data-testid="fase-3"]')
para que la prueba sea válida si se encuentra vacío, sin candidatos

### se necesita probar la prueba E2E que acabas de diseñar.
¿podrías indicarme el proceso que debo ejecutar?

### al ejecutar el comando:

npx cypress open

cypress no encuentra el archivo:

position.spec.cy.js


Ayudame a revisar la configuracion de Cypress  


## Prueba: Verificación de la fase de un candidato

### Vamos a agregar otra prueba E2E  usando cypress:

Cambio de Fase de un Candidato, se requiere:

1. Simular el arrastre de la tarjeta de candidato "John Doe" de la columna "Technical Interview" a la columna "Manager Interview". la simulación es Arrastrar y soltar, dado que cypress no cuenta con una función nativa drag And drop, enotnces, se requiere crear el comando que simule seleccionar, arrastar y soltar la tarjeta del candidato .
2. Verificar que la tarjeta del candidato se mueve  a la nueva columna "Manager Interview".
3. Verificar que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id. La url del backend es http://localhost:3010/candidates/1

Antes de comenzar, hazme todas las preguntas que necesites. No diseñes la prueba aún.


 @Codebase 

** Preguntas previas **
1. ¿El backend está configurado para aceptar y procesar correctamente las solicitudes PUT en /candidates/:id?
2. ¿Hay algún middleware o autenticación que debamos considerar para las solicitudes PUT?
3. ¿El frontend utiliza algún identificador específico para las tarjetas de los candidatos que podamos usar en las pruebas?

Con esta información, podremos proceder a diseñar la prueba E2E de manera efectiva.

### 1 Si.
2. No.
3. si, se puede usar el atributo "data-rbd-draggable-id", el cual para el candidato "John Doe" es el valor 1

### el comando dragAndDrop no está realizando la simulación, el objetivo es:
1. Seleccionar la tarjeta identificada como data-rbd-draggable-id="1".
2. Arrastar desde la columna data-rbd-droppable-id="1" hacia la columna data-rbd-droppable-id="2".

### en la prueba 'Cambio de Fase de un Candidato', en la petición PUT hace falta enviar por parámetro la estructura json:

{
    "applicationId": "1",
    "currentInterviewStep": "3"
}

aplica los ajustes necesarios


### en el comando dragAndDrop, agrega el código que permita mover la tarjeta de data-rbd-draggable-id="1" a la columna data-rbd-droppable-id="2".

Al finalizar el comando la tarjeta debe estar reubicada en la columna data-rbd-droppable-id="2"

@Codebase 



