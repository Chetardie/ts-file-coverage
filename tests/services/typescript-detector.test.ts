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
    it('should detect JSX with TypeScript imports', () => {
      const content = 'import Component from "./Component.tsx"';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(true);
    });

    it('should detect JSX with interface declarations', () => {
      const content = 'interface Props { name: string }';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(true);
    });

    it('should detect JSX with type aliases', () => {
      const content = 'type ButtonProps = { label: string }';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(true);
    });

    it('should detect JSX with React.FC type', () => {
      const content = 'const Component: React.FC<Props> = () => {}';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(true);
    });

    it('should not detect plain JSX as TypeScript', () => {
      const content = 'export default function Component() { return <div/>; }';
      expect(detector.isTypeScriptFile('component.jsx', content)).toBe(false);
    });
  });

  describe('JavaScript Files', () => {
    it('should detect JS with interface as TypeScript', () => {
      const content = 'interface User { name: string; age: number; }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(true);
    });

    it('should detect JS with type alias as TypeScript', () => {
      const content = 'type Status = "active" | "inactive"';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(true);
    });

    it('should detect JS with enum as TypeScript', () => {
      const content = 'enum Color { Red, Green, Blue }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(true);
    });

    it('should detect JS with access modifiers as TypeScript', () => {
      const content = 'class User { private name: string; }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(true);
    });

    it('should detect JS with parameter type annotations as TypeScript', () => {
      const content =
        'function greet(name: string) { return `Hello ${name}`; }';
      expect(detector.isTypeScriptFile('file.js', content)).toBe(true);
    });

    it('should not detect plain JavaScript as TypeScript', () => {
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
