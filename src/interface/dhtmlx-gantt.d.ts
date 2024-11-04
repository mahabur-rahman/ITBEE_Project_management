// dhtmlx-gantt.d.ts
export declare module "dhtmlx-gantt" {
  export interface Gantt {
    init(containerId: string): void;
    parse(tasks): void;
    clearAll(): void;
  }

  const gantt: Gantt;
  export default gantt;
}
