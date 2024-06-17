# Prompt 1

Eres un experto en Cypress con React, necesito que me ayudes a crear un test E2E para la carga de la Página de Position:

- Verifica que el título de la posición se muestra correctamente.
- Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
- Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

No generes código, hazme todas las preguntas que sean necesarias para completar la solicitud

## Respuesta

Para poder ayudarte a crear el test E2E para la Página de Position, necesito que me proporciones la siguiente información:

1. URL de la Página de Position: ¿Cuál es la URL que debo visitar para acceder a la Página de Position?
2. Título de la Posición: ¿Cuál es el selector (por ejemplo, una clase o un id) del elemento que contiene el título de la posición?
3. Columnas de Fases: ¿Cuáles son los nombres de las columnas correspondientes a cada fase del proceso de contratación y sus selectores?
4. Tarjetas de Candidatos: ¿Cómo se identifican las tarjetas de los candidatos y cómo se determina su fase actual? ¿Hay algún atributo o clase que indique la fase?

Con esta información, podré generar el test E2E que necesitas.

# Prompt 2

1. http://localhost:3000/positions/1
2. Esto es lo que se renderiza: <h2 class="text-center mb-4">Senior Full-Stack Engineer</h2>
3. Los nombres se obtienen del endpoint: http://localhost:3010/positions/1/interviewFlow

Ejemplo del response del endpoint:

```JSON
{
  "interviewFlow": {
    "positionName": "Senior Full-Stack Engineer",
    "interviewFlow": {
      "id": 1,
      "description": "Standard development interview process",
      "interviewSteps": [
        {
          "id": 1,
          "interviewFlowId": 1,
          "interviewTypeId": 1,
          "name": "Initial Screening",
          "orderIndex": 1
        },
        {
          "id": 2,
          "interviewFlowId": 1,
          "interviewTypeId": 2,
          "name": "Technical Interview",
          "orderIndex": 2
        },
        {
          "id": 3,
          "interviewFlowId": 1,
          "interviewTypeId": 3,
          "name": "Manager Interview",
          "orderIndex": 2
        }
      ]
    }
  }
}
```

Y al renderizarse una columna se ve así:

```HTML
<div class="col-md-3"><div data-rbd-droppable-id="0" data-rbd-droppable-context-id="0" class="mb-4 card"><div class="text-center card-header">Initial Screening</div><div class="card-body"><div data-rbd-draggable-context-id="0" data-rbd-draggable-id="3" tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="3" data-rbd-drag-handle-context-id="0" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Carlos García</div><div></div></div></div></div></div></div>
```

4. Esto es lo que se renderiza:

```HTML
<div data-rbd-draggable-context-id="0" data-rbd-draggable-id="3" tabindex="0" role="button" aria-describedby="rbd-hidden-text-0-hidden-text-0" data-rbd-drag-handle-draggable-id="3" data-rbd-drag-handle-context-id="0" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Carlos García</div><div></div></div></div>
```

La fase la determina la columna, puedes basarte en la respuesta 3

Tienes alguna pregunta adicional? no generes código

# Prompt 3

Podrias hacer que la verificación del título sea dinámico, las columnas de las fases sea dinámico y la verificación de las tarjetas también?

# Prompt 4

Podrías empezar el request solo hasta que se renderice toda la web? debería usarse un timer? la página está en el puerto 3000

# Prompt 5

Este es el endpoint de candidatos para llenar el último test: http://localhost:3010/positions/1/candidates

Esta es la respuesta del endpoint:

```JSON
[
  {
    "fullName": "John Doe",
    "currentInterviewStep": "Technical Interview",
    "candidateId": 1,
    "applicationId": 1,
    "averageScore": 5
  },
  {
    "fullName": "Carlos García",
    "currentInterviewStep": "Initial Screening",
    "candidateId": 3,
    "applicationId": 4,
    "averageScore": 0
  },
  {
    "fullName": "Jane Smith",
    "currentInterviewStep": "Technical Interview",
    "candidateId": 2,
    "applicationId": 3,
    "averageScore": 4
  }
]
```
