declare module 'mammoth' {
  interface MammothOptions {
    styleMap?: string[];
  }
  export function convertToHtml(options: { arrayBuffer: ArrayBuffer; styleMap?: string[] }): Promise<{ value: string }>;
}