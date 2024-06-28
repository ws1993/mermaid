// @ts-ignore: JISON doesn't support types
import flowParser from './parser/flow.jison';
import flowDb from './flowDb.js';
import flowRendererV3 from './flowRenderer-v3-unified.js';
import flowStyles from './styles.js';
import type { MermaidConfig } from '../../config.type.js';
import { setConfig } from '../../diagram-api/diagramAPI.js';

export const diagram = {
  parser: flowParser,
  db: flowDb,
  renderer: flowRendererV3,
  styles: flowStyles,
  init: (cnf: MermaidConfig) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    // flowchart-v2 uses dagre-wrapper, which doesn't have access to flowchart cnf
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV3.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen('gen-2');
  },
};
