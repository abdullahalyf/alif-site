export const introStorageKey = "alif-intro-seen";
export const INTRO_PENDING_ATTR = "data-intro-pending";

/**
 * Runs before first paint on every full page load. The intro plays once per visit,
 * only when the visit starts on Home; the cover stops the page flashing before it.
 */
export const introBootstrap = `(function(){try{
if(sessionStorage.getItem("alif-intro-seen"))return;
sessionStorage.setItem("alif-intro-seen","1");
if(location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var d=document.documentElement;d.setAttribute("data-intro-pending","");
setTimeout(function(){d.removeAttribute("data-intro-pending")},4000);
}catch(e){}})();`;
