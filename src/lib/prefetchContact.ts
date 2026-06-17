let prefetched = false;

/** Pornește descărcarea librăriei 3D (Spline) folosită de robotul din /contact,
 * înainte ca userul să ajungă efectiv pe pagină (la hover/touch pe linkurile spre ea). */
export const prefetchContact = () => {
  if (prefetched) return;
  prefetched = true;
  import('../components/RobotVisual');
  import('@splinetool/react-spline');
};
