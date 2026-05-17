const fs = require('fs');
const path = require('path');

describe('Ejercicio 1: Diagrama ER (Chen) - TaskFlow', () => {
  const rootPath = path.join(__dirname, '../../');
  const diagramasPath = path.join(rootPath, 'diagramas', 'der');
  const diagramaPath = path.join(diagramasPath, 'taskflow-conceptual.puml');

  let content;

  beforeAll(() => {
    if (fs.existsSync(diagramaPath)) {
      content = fs.readFileSync(diagramaPath, 'utf8');
    }
  });

  // ─── Estructura de archivos ──────────────────────────────────────────────
  describe('Estructura de archivos', () => {
    test('La carpeta diagramas/der debe existir', () => {
      expect(fs.existsSync(diagramasPath)).toBe(true);
      expect(fs.statSync(diagramasPath).isDirectory()).toBe(true);
    });

    test('El archivo diagramas/der/taskflow-conceptual.puml debe existir', () => {
      expect(fs.existsSync(diagramaPath)).toBe(true);
      expect(fs.statSync(diagramaPath).isFile()).toBe(true);
    });

    test('El archivo debe tener extensión .puml', () => {
      expect(diagramaPath).toMatch(/\.puml$/);
    });
  });

  // ─── Estructura básica del diagrama ─────────────────────────────────────
  describe('Estructura básica del diagrama', () => {
    test('El diagrama debe tener el delimitador @startchen', () => {
      expect(content).toMatch(/@startchen/);
    });

    test('El diagrama debe tener el delimitador @endchen', () => {
      expect(content).toMatch(/@endchen/);
    });

    test('El diagrama debe tener un título que contenga "TaskFlow"', () => {
      expect(content).toMatch(/title.*TaskFlow/i);
    });

    test('El diagrama debe tener un footer con "Nivel: Básico"', () => {
      expect(content).toMatch(/footer.*Nivel.*B[aá]sico/i);
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

  // ─── Claves primarias ────────────────────────────────────────────────────
  describe('Claves primarias', () => {
    test('Las 4 entidades deben tener "id <<key>>" como clave primaria', () => {
      const matches = content.match(/id\s+<<key>>/g);
      expect(matches).not.toBeNull();
      expect(matches.length).toBeGreaterThanOrEqual(4);
    });
  });

  // ─── Atributos de Usuarios ───────────────────────────────────────────────
  describe('Atributos de la entidad Usuarios', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Usuarios\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Usuarios debe tener el atributo nombre', () => {
      expect(block).toMatch(/\bnombre\b/);
    });

    test('Usuarios debe tener el atributo email', () => {
      expect(block).toMatch(/\bemail\b/);
    });

    test('Usuarios debe tener el atributo fecha_registro', () => {
      expect(block).toMatch(/\bfecha_registro\b/);
    });
  });

  // ─── Atributos de Listas ─────────────────────────────────────────────────
  describe('Atributos de la entidad Listas', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Listas\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Listas debe tener el atributo nombre', () => {
      expect(block).toMatch(/\bnombre\b/);
    });

    test('Listas debe tener el atributo color', () => {
      expect(block).toMatch(/\bcolor\b/);
    });
  });

  // ─── Atributos de Tareas ─────────────────────────────────────────────────
  describe('Atributos de la entidad Tareas', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Tareas\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Tareas debe tener el atributo titulo', () => {
      expect(block).toMatch(/\btitulo\b/);
    });

    test('Tareas debe tener el atributo descripcion', () => {
      expect(block).toMatch(/\bdescripcion\b/);
    });

    test('Tareas debe tener el atributo completada', () => {
      expect(block).toMatch(/\bcompletada\b/);
    });

    test('Tareas debe tener el atributo fecha_vencimiento', () => {
      expect(block).toMatch(/\bfecha_vencimiento\b/);
    });
  });

  // ─── Atributos de Etiquetas ──────────────────────────────────────────────
  describe('Atributos de la entidad Etiquetas', () => {
    let block = '';

    beforeAll(() => {
      if (content) {
        const match = content.match(/entity\s+Etiquetas\s*\{([\s\S]*?)\}/);
        block = match ? match[1] : '';
      }
    });

    test('Etiquetas debe tener el atributo nombre', () => {
      expect(block).toMatch(/\bnombre\b/);
    });

    test('Etiquetas debe tener el atributo color', () => {
      expect(block).toMatch(/\bcolor\b/);
    });
  });
});
