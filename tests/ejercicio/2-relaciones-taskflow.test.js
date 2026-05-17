const fs = require('fs');
const path = require('path');

describe('Ejercicio 2: Relaciones y Cardinalidad — TaskFlow', () => {
  const rootPath = path.join(__dirname, '../../');
  const diagramaPath = path.join(rootPath, 'diagramas', 'der', 'taskflow-conceptual.puml');

  let content;

  beforeAll(() => {
    if (fs.existsSync(diagramaPath)) {
      content = fs.readFileSync(diagramaPath, 'utf8');
    }
  });

  // ─── Definición de relaciones ────────────────────────────────────────────
  describe('Definición de relaciones', () => {
    test('Debe definir la relación CREA_LISTA', () => {
      expect(content).toMatch(/relationship\s+CREA_LISTA\s*\{/);
    });

    test('Debe definir la relación CONTIENE', () => {
      expect(content).toMatch(/relationship\s+CONTIENE\s*\{/);
    });

    test('Debe definir la relación ETIQUETADA', () => {
      expect(content).toMatch(/relationship\s+ETIQUETADA\s*\{/);
    });
  });

  // ─── Atributos de las relaciones ─────────────────────────────────────────
  describe('Atributos de las relaciones', () => {
    test('CREA_LISTA debe tener el atributo fecha_creacion', () => {
      const match = content.match(/relationship\s+CREA_LISTA\s*\{([\s\S]*?)\}/);
      const block = match ? match[1] : '';
      expect(block).toMatch(/\bfecha_creacion\b/);
    });

    test('CONTIENE debe tener el atributo posicion', () => {
      const match = content.match(/relationship\s+CONTIENE\s*\{([\s\S]*?)\}/);
      const block = match ? match[1] : '';
      expect(block).toMatch(/\bposicion\b/);
    });

    test('ETIQUETADA debe tener el atributo fecha_asignacion', () => {
      const match = content.match(/relationship\s+ETIQUETADA\s*\{([\s\S]*?)\}/);
      const block = match ? match[1] : '';
      expect(block).toMatch(/\bfecha_asignacion\b/);
    });
  });

  // ─── Conexiones con cardinalidad ─────────────────────────────────────────
  describe('Cardinalidad de CREA_LISTA (Usuario crea Listas — 1:N)', () => {
    test('CREA_LISTA debe conectar con Usuarios con cardinalidad (1,1)', () => {
      expect(content).toMatch(
        /CREA_LISTA\s*-\(1,1\)-\s*Usuarios|Usuarios\s*-\(1,1\)-\s*CREA_LISTA/
      );
    });

    test('CREA_LISTA debe conectar con Listas con cardinalidad (0,N)', () => {
      expect(content).toMatch(
        /CREA_LISTA\s*-\(0,N\)-\s*Listas|Listas\s*-\(0,N\)-\s*CREA_LISTA/
      );
    });
  });

  describe('Cardinalidad de CONTIENE (Lista contiene Tareas — 1:N)', () => {
    test('CONTIENE debe conectar con Listas con cardinalidad (1,1)', () => {
      expect(content).toMatch(
        /CONTIENE\s*-\(1,1\)-\s*Listas|Listas\s*-\(1,1\)-\s*CONTIENE/
      );
    });

    test('CONTIENE debe conectar con Tareas con cardinalidad (0,N)', () => {
      expect(content).toMatch(
        /CONTIENE\s*-\(0,N\)-\s*Tareas|Tareas\s*-\(0,N\)-\s*CONTIENE/
      );
    });
  });

  describe('Cardinalidad de ETIQUETADA (Tareas y Etiquetas — N:M)', () => {
    test('ETIQUETADA debe conectar con Tareas con cardinalidad (0,N)', () => {
      expect(content).toMatch(
        /ETIQUETADA\s*-\(0,N\)-\s*Tareas|Tareas\s*-\(0,N\)-\s*ETIQUETADA/
      );
    });

    test('ETIQUETADA debe conectar con Etiquetas con cardinalidad (0,N)', () => {
      expect(content).toMatch(
        /ETIQUETADA\s*-\(0,N\)-\s*Etiquetas|Etiquetas\s*-\(0,N\)-\s*ETIQUETADA/
      );
    });
  });
});
