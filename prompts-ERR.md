## PROMPT
Toma el rol y los conocimientos de un experto Ingeniero de Calidad, con amplios conocimientos en automatización de tests. Conoces Cypress?


## PROMPT
La aplicación que está en este workspace contiene un frontend hecho con React en @frontend y un backend hecho con NodeJS y Express en @backend 
Como integrarías unos tests automatizados "end-to-end" en este proyecto?


## PROMPT
Como podríamos utilizarlo para ejecutar test automatizados "end-to-end"? Listame las etapas que necesitarías para integrar en este codebase unos tests end-to-end usando Cypress


## PROMPT
De acuerdo, he instalado Cypress en la parte de frontend y algunos ficheros han sido generados.
Partiendo de estos, genera un nuevo test "end-to-end" en @position.spec.js con los siguientes requisitos:
* Carga de la Página de Position:
** Verifica que el título de la posición se muestra correctamente.
** Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
** Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.


## PROMPT
Genera un nuevo escenario de test en @position.spec.js para la siguiente funcionalidad:

* Cambio de Fase de un Candidato:
** Simula el arrastre de una tarjeta de candidato de una columna a otra.
** Verifica que la tarjeta del candidato se mueve a la nueva columna.
** Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.