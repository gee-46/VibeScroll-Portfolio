// Optional standalone version of the JSX type patch already included inline
// in components/LanyardBadge.tsx. Only needed if you removed that inline
// `declare global` block and want the types centralized here instead.
// Include this file's directory in tsconfig.json's `include` array.

import 'meshline';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

export {};
