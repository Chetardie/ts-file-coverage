import { describe, it, expect } from 'vitest';
import { TypeScriptDetector } from '../../src/services';

describe('TypeScriptDetector', () => {
  const detector = new TypeScriptDetector();

  describe('TypeScript Extensions', () => {
    it('should detect .ts files as TypeScript', () => {
      expect(detector.isTypeScriptFile('test.ts', '')).toBe(true);
    });

    it('should detect .tsx files as TypeScript', () => {
      expect(detector.isTypeScriptFile('component.tsx', '')).toBe(true);
    });
  });

  describe('Vue Files', () => {
    it('should detect Vue files with lang="ts" as TypeScript', () => {
      const content = '<script lang="ts">export default {}</script>';
      expect(detector.isTypeScriptFile('component.vue', content)).toBe(true);
    });

    it("should detect Vue files with lang='ts' as TypeScript", () => {
      const content = "<script lang='ts'>export default {}</script>";
      expect(detector.isTypeScriptFile('component.vue', content)).toBe(true);
    });

    it('should detect Vue files without lang as JavaScript', () => {
      const content = '<script>export default {}</script>';
      expect(detector.isTypeScriptFile('component.vue', content)).toBe(false);
    });

    it('should detect Vue setup syntax with TypeScript', () => {
      const content = '<script setup lang="ts">const msg = "hello"</script>';
      expect(detector.isTypeScriptFile('component.vue', content)).toBe(true);
    });
  });

  describe('JSX Files', () => {
    it('should treat .jsx files as JavaScript regardless of content', () => {
      const content = 'import Component from "./Component.tsx"';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(false);
    });

    it('should treat .jsx files with interface declarations as JavaScript', () => {
      const content = 'interface Props { name: string }';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(false);
    });

    it('should treat .jsx files with type aliases as JavaScript', () => {
      const content = 'type ButtonProps = { label: string }';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(false);
    });

    it('should treat .jsx files with React.FC type as JavaScript', () => {
      const content = 'const Component: React.FC<Props> = () => {}';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(false);
    });

    it('should treat plain JSX as JavaScript', () => {
      const content = 'export default function Component() { return <div/>; }';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(false);
    });
  });

  describe('JavaScript Files', () => {
    it('should treat .js files as JavaScript regardless of content', () => {
      const content = 'interface User { name: string; age: number; }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(false);
    });

    it('should treat .js files with type alias as JavaScript', () => {
      const content = 'type Status = "active" | "inactive"';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(false);
    });

    it('should treat .js files with enum as JavaScript', () => {
      const content = 'enum Color { Red, Green, Blue }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(false);
    });

    it('should treat .js files with access modifiers as JavaScript', () => {
      const content = 'class User { private name: string; }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(false);
    });

    it('should treat .js files with parameter type annotations as JavaScript', () => {
      const content =
        'function greet(name: string) { return `Hello ${name}`; }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(false);
    });

    it('should treat plain JavaScript as JavaScript', () => {
      const content = 'function hello() { console.log("hello"); }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      expect(detector.isTypeScriptFile('test.js', '')).toBe(false);
    });

    it('should handle unknown extensions', () => {
      expect(detector.isTypeScriptFile('test.php', 'interface User {}')).toBe(
        false
      );
    });
  });
});
