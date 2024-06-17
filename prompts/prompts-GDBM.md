### IDE: Cursor

### Prompts:

1. Quiero que actues como un QA experto. Sabes que son las pruebas E2E y como se implementan con cypress?
2. Perfecto, ahora necesito que crees las pruebas E2E para la Interfaz "positions" en @frontend @PositionDetails.js, debe cumplir con los siguientes requisitos:
    - Verifica que el título de la posición se muestra correctamente.
    - Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
    - Verifica que las tarjetas de los candidatos se muestran en la columna correcta segn su fase actual.
  No escribas codigo aun. Preguntame si tienes alguna duda.
3. Quiero que las pruebas sean dinaminas dependiendo de los parametros que reciba el endpoint. Quiero que se comporte tal como funciona los diferentes componentes de la interfaz.
4. Realiza la prueba que cumpla con el siguiente  requisito "Verifica que las tarjetas de los candidatos se muestran en la columna correcta segun su fase actual." 
   - @frontend 
   - @position.spec.js 
5. No esta funcionando la prueba, revisa el comportamiento de los componentes y valida si esta cumpliendo con todos los requisitos y  si esta llamando los endpoint correspondientes
6. Hay una clase llamada card-header que tiene el nombre de la fase, no se puede obtener de ahi y compararlo con la fase actual del candidato?
7. Ahora necesito que crees una prueba con cypress que cumpla con las siguientes condiciones:
   - Simula el arrastre de una tarjeta de candidato de una columna a otra.
   - Verifica que la tarjeta del candidato se mueve a la nueva columna.
   - Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.
8. Si es necesario instalar una nueva libreria?, no se puede de forma manual
9.  Tener en cuenta que el endpoint `PUT /candidate/:id` envia por body `applicationId` y `currentInterviewStep`.
10. No se puede realizar de forma dinamina? 
11. Como puedo verificar visualmente el cambio antes de la solicitud PUT en la prueba "permite arrastrar una tarjeta de candidato de una columna a otra y verifica la actualización"
12. Al parecer no funciona el drag and drop, alguna solucion?
13. La libreria @4tw/cypress-drag-drop no simula tampoco el drag and drop
    **NOTA**: La simulacion del drag and drop no se realizaba correctamente, estuve haciendo mas preguntas, pero el chat siempre respondia con las mismas cosas o me daba la opcion de instalar una libreria, pero igual al instalarla no se realizaba correctamente. Despues de un tiempo opte por buscar y encontre la siguiente solucion en [stackoverflow](https://stackoverflow.com/questions/70024270/cypress-drag-and-drop-not-working-on-a-react-based-website).

### Test
![test](/frontend/src/assets/test.png)