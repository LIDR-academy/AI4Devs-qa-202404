#Prompts

1.- Quiero que actues como un equipo de desarrollo compuesto por un desarrollador front experto react y un QA experto. Explicame qué son las pruebas End-to-End (E2E) y cómo podríamos integrarla en este proyecto @frontend 


2.- Quiero añadir una prueba E2E para la interfaz "position"

Tengo que verificar los siguientes escenarios:

Carga de la Página de Position:
 - Verifica que el título de la posición se muestra correctamente.
 - Verifica que se muestran las columnas correspondientes a  - cada fase del proceso de contratación.
 - Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

Indicame si hay alguna forma de mockear los datos para comprobar que los datos se están mostrando bien en la interfaz. Ten en cuenta esta doc de la api @api-spec.yaml 
Dame el paso a paso para el desarrollo de estas pruebas. Hazme las preguntas que consideres necesarias. No escribas código aun. 

3.- teniendo en cuenta los escenarios que tenemos que verificar:

Verifica que el título de la posición se muestra correctamente.
Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

parece que la interfaz para la que tenemos que añadir las pruebas es la interfaz del detalle de una posición concreta, donde se muestran las diferentes fases y las tarjetas de los candidatos

4.- ayudame a ejecutar esta prueba en cypress

5.- quiero mockear la llamada a la api en @positionDetails.spec.js  para poder comprobar que los datos que se están mostrando son los correctos

6.- no tengo claro cómo deberíamos comprobar que los datos mostrados en la interfaz son correctos, tengo que mockear los datos o podemos comprobar que se están mostrando los datos devueltos por la api?

7.- hay alguna otra forma de implementar este test sin mockear los datos?

8.- cual de las dos formas es la más correcta para implementar estas pruebas E2E  asegurandonos una simulación realista 

9.- el test 'should display the correct title' está fallando porque espera "Desarrollador Frontend" pero está devolviendo "Software Engineer" que es lo que devuelve la api, parece que no está teniendo en cuenta @positionDetails.json 

10.- parece que no está funcionando bien las pruebas con los datos mockeados. Vamos a probar a comparar los datos recibidos por API con lo que mostramos en la interfaz sin mockear los datos

11.- para evitar tantas llamadas a la API, vamos a añadir esa llamada a beforeEach y guardar los datos en una variable que usaremos en el resto de tests

12.- parece que no está encontrando ningun elemento con el selector .stage-column, pero veo que tenemos 3 columnas, por qué no los encuentra?

*Nota: despues de múltiples intentos y de pedirle que añada a StageColumn una clase para que Cypress pueda detectar las columnas, no consigo que lo haga y lo tengo que hacer de forma manual. Despúes de eso consigo que pase el test "'should display columns for each hiring phase'" *

13.- en el test 'should display candidate cards in the correct column' debemos de tener en cuenta en qué "currentInterviewStep" está el candidato para saber en qué columna debe estar su tarjeta

14.- Ahora vamos a añadir pruebas E2E para verificar el cambio de fase de un candidato. Debe verificar los siguientes escenarios:

- Simula el arrastre de una tarjeta de candidato de una columna a otra.
- Verifica que la tarjeta del candidato se mueve a la nueva columna.
- Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

15.- en 'should move candidate card to new column and update phase' debemos comprobar el arrastre de una tarjeta de candidato de una columna a otra. Vamos a usar el primer candidato que devuelve la API, detectaremos en qué columna está y lo moveremos a otra

16.- Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id. Para ello tendremos que comprobar que el canditao movido tiene ahora la fase correcta


17.- Parece que en el test 'should move candidate card to new column and update phase' no está actualizando correctamente la fase del candidato, no se mueve la tarjeta correctamente