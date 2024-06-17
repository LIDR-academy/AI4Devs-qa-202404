# Prompt 1

Eres un experto en Cypress con React, necesito que me ayudes a crear un test E2E para el cambio de Fase de un Candidato @frontend

- Simula el arrastre de una tarjeta de candidato de una columna a otra.
- Verifica que la tarjeta del candidato se mueve a la nueva columna.
- Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id @backend

No generes código, hazme todas las preguntas que sean necesarias para completar la solicitud

## Respuesta

Para poder ayudarte a crear el test E2E para el cambio de fase de un candidato, necesito que me proporciones la siguiente información:

1. Selector de la tarjeta del candidato: ¿Cuál es el selector (por ejemplo, una clase o un id) del elemento que representa la tarjeta del candidato?
2. Selector de las columnas: ¿Cuál es el selector de las columnas a las que se pueden arrastrar las tarjetas de los candidatos?
3. Endpoint de actualización: ¿Cuál es el formato exacto del endpoint PUT para actualizar la fase del candidato? ¿Qué datos se deben enviar en el cuerpo de la solicitud?
4. Confirmación visual: ¿Hay algn cambio visual en la tarjeta del candidato o en la columna que indique que la fase se ha actualizado correctamente?

Con esta información, podré guiarte mejor en la creación del test E2E que necesitas.

# Prompt 2

1. Este es un ejemplo del HTML de la tarjeta de candidato:

```HTML
<div data-rbd-draggable-context-id="0" data-rbd-draggable-id="3" tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="3" data-rbd-drag-handle-context-id="0" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Carlos García</div><div></div></div></div>
```

2. Este es un ejemplo del HTML de la columna a la que se puede arrastrar un candidato:

```HTML
<div data-rbd-droppable-id="0" data-rbd-droppable-context-id="0" class="mb-4 card"><div class="text-center card-header">Initial Screening</div><div class="card-body"><div data-rbd-draggable-context-id="0" data-rbd-draggable-id="3" tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="3" data-rbd-drag-handle-context-id="0" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Carlos García</div><div></div></div></div></div></div>
```

3. El endpoint es: http://localhost:3010/candidates/1

Con el método PUT

El body es:

```JSON
{
   applicationId: Number(applicationId),
   currentInterviewStep: Number(newStep)
}
```

4. Ninguna

# Prompt 3

Necesito que cuando el draggable 3 esté en la columna 1, vaya a la columna 0, y cuando esté en la columna 0 pase a la 1
