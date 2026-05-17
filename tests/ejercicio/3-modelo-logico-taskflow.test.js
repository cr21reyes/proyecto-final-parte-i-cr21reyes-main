const fs = require('fs');
const path = require('path');

describe('Ejercicio 3: Modelo Lógico (Estilo StarUML) — TaskFlow', () => {
  const rootPath = path.join(__dirname, '../../');
  const diagramaPath = path.join(rootPath, 'diagramas', 'der', 'taskflow-logico.puml');

  let content;

  beforeAll(() => {
    if (fs.existsSync(diagramaPath)) {
      content = fs.readFileSync(diagramaPath, 'utf8');
    }
  });

  // ─── Estructura de archivos ──────────────────────────────────────────────
  describe('Estructura de archivos', () => {
    test('El archivo diagramas/der/taskflow-logico.puml debe existir', () => {
      expect(fs.existsSync(diagramaPath)).toBe(true);
      expect(fs.statSync(diagramaPath).isFile()).toBe(true);
    });
  });

  // ─── Estructura básica ───────────────────────────────────────────────────
  describe('Estructura básica del diagrama', () => {
    test('El diagrama debe tener el delimitador @startuml', () => {
      expect(content).toMatch(/@startuml/);
    });

    test('El diagrama debe tener el delimitador @enduml', () => {
      expect(content).toMatch(/@enduml/);
    });

    test('El título debe contener "TaskFlow" y "Lógico"', () => {
      expect(content).toMatch(/title.*TaskFlow.*L[oó]gico/i);
    });

    test('Debe tener skinparam classAttributeIconSize 0', () => {
      expect(content).toMatch(/skinparam\s+classAttributeIconSize\s+0/);
    });

    test('Debe tener skinparam linetype ortho', () => {
      expect(content).toMatch(/skinparam\s+linetype\s+ortho/i);
    });
  });

  // ─── Definición de entidades ─────────────────────────────────────────────
  describe('Definición de entidades', () => {
    test('Debe definir la entidad Usuarios', () => {
      expect(content).toMatch(/entity\s+Usuarios\s*\{/);
    });

    test('Debe definir la entidad Listas', () => {
      expect(content).toMatch(/entity\s+Listas\s*\{/);
    });

    test('Debe definir la entidad Tareas', () => {
      expect(content).toMatch(/entity\s+Tareas\s*\{/);
    });

    test('Debe definir la entidad Etiquetas', () => {
      expect(content).toMatch(/entity\s+Etiquetas\s*\{/);
    });
  });

  // ─── Claves primarias con <<PK>> ─────────────────────────────────────────
  describe('Claves primarias con <<PK>>', () => {
    test('Las 4 entidades deben tener "id : int <<PK>>"', () => {
      const matches = content.match(/\+?\s*id\s*:\s*int\s*<<PK>>/g);
      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThanOrEqual(4);
    });
  });

  // ─── Tipos de datos en Usuarios ─────────────────────────────────────────
  describe('Tipos de datos en Usuarios', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Usuarios\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Usuarios.nombre debe ser de tipo string', () => {
      expect(block).toMatch(/\bnombre\s*:\s*string\b/);
    });

    test('Usuarios.email debe ser de tipo string', () => {
      expect(block).toMatch(/\bemail\s*:\s*string\b/);
    });

    test('Usuarios.fecha_registro debe ser de tipo date', () => {
      expect(block).toMatch(/\bfecha_registro\s*:\s*date\b/);
    });
  });

  // ─── Tipos de datos en Listas ────────────────────────────────────────────
  describe('Tipos de datos en Listas (incluye atributo migrado)', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Listas\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Listas.nombre debe ser de tipo string', () => {
      expect(block).toMatch(/\bnombre\s*:\s*string\b/);
    });

    test('Listas.color debe ser de tipo string', () => {
      expect(block).toMatch(/\bcolor\s*:\s*string\b/);
    });

    test('Listas.fecha_creacion debe ser de tipo date (migrado desde CREA_LISTA)', () => {
      expect(block).toMatch(/\bfecha_creacion\s*:\s*date\b/);
    });
  });

  // ─── Tipos de datos en Tareas ────────────────────────────────────────────
  describe('Tipos de datos en Tareas (incluye atributos migrados)', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Tareas\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Tareas.titulo debe ser de tipo string', () => {
      expect(block).toMatch(/\btitulo\s*:\s*string\b/);
    });

    test('Tareas.descripcion debe ser de tipo string', () => {
      expect(block).toMatch(/\bdescripcion\s*:\s*string\b/);
    });

    test('Tareas.completada debe ser de tipo boolean', () => {
      expect(block).toMatch(/\bcompletada\s*:\s*boolean\b/);
    });

    test('Tareas.fecha_vencimiento debe ser de tipo date', () => {
      expect(block).toMatch(/\bfecha_vencimiento\s*:\s*date\b/);
    });

    test('Tareas.posicion debe ser de tipo int (migrado desde CONTIENE)', () => {
      expect(block).toMatch(/\bposicion\s*:\s*int\b/);
    });
  });

  // ─── Tipos de datos en Etiquetas ─────────────────────────────────────────
  describe('Tipos de datos en Etiquetas', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Etiquetas\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Etiquetas.nombre debe ser de tipo string', () => {
      expect(block).toMatch(/\bnombre\s*:\s*string\b/);
    });

    test('Etiquetas.color debe ser de tipo string', () => {
      expect(block).toMatch(/\bcolor\s*:\s*string\b/);
    });
  });

  // ─── Relaciones con notación crow's foot ─────────────────────────────────
  describe("Relaciones con notación crow's foot", () => {
    test('Relación 1:N entre Usuarios y Listas (crea)', () => {
      expect(content).toMatch(/Usuarios\s*\|\|--o\{\s*Listas/);
    });

    test('Relación 1:N entre Listas y Tareas (contiene)', () => {
      expect(content).toMatch(/Listas\s*\|\|--o\{\s*Tareas/);
    });

    test('Relación N:M entre Tareas y Etiquetas (etiquetada)', () => {
      expect(content).toMatch(/Tareas\s*\}o--o\{\s*Etiquetas/);
    });
  });
});
